import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Shuffle, RotateCcw } from 'lucide-react';

const GraphVisualization = ({ onBack }) => {
  const [nodes, setNodes] = useState([
    { id: 'A', x: 150, y: 100 },
    { id: 'B', x: 300, y: 100 },
    { id: 'C', x: 450, y: 100 },
    { id: 'D', x: 225, y: 200 },
    { id: 'E', x: 375, y: 200 }
  ]);

  const [edges, setEdges] = useState([
    { from: 'A', to: 'B' },
    { from: 'B', to: 'C' },
    { from: 'A', to: 'D' },
    { from: 'B', to: 'D' },
    { from: 'B', to: 'E' },
    { from: 'C', to: 'E' },
    { from: 'D', to: 'E' }
  ]);

  const [algorithm, setAlgorithm] = useState('bfs');
  const [startNode, setStartNode] = useState('A');
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState('');
  const [traversalOrder, setTraversalOrder] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [queue, setQueue] = useState([]);
  const [stack, setStack] = useState([]);
  const [speed, setSpeed] = useState(1000); // in ms
  const [highlightedEdges, setHighlightedEdges] = useState([]);

  const traversalRef = useRef(false);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getAdjacencyList = () => {
    const adjList = {};
    nodes.forEach(node => (adjList[node.id] = []));
    edges.forEach(edge => {
      adjList[edge.from].push(edge.to);
      adjList[edge.to].push(edge.from);
    });
    return adjList;
  };

  const bfsTraversal = async () => {
    const adjList = getAdjacencyList();
    const visited = new Set();
    const queueArr = [startNode];
    const order = [];

    setQueue([startNode]);

    while (queueArr.length > 0 && traversalRef.current) {
      const current = queueArr.shift();
      setQueue([...queueArr]);

      if (!visited.has(current)) {
        visited.add(current);
        order.push(current);
        setCurrentNode(current);
        setVisitedNodes([...visited]);
        setTraversalOrder([...order]);
        await sleep(speed);

        for (const neighbor of adjList[current]) {
          if (!visited.has(neighbor) && !queueArr.includes(neighbor)) {
            queueArr.push(neighbor);
            setQueue([...queueArr]);
            highlightEdge(current, neighbor);
          }
        }
      }
    }

    setCurrentNode('');
    setQueue([]);
  };

  const dfsTraversal = async () => {
    const adjList = getAdjacencyList();
    const visited = new Set();
    const stackArr = [startNode];
    const order = [];

    setStack([startNode]);

    while (stackArr.length > 0 && traversalRef.current) {
      const current = stackArr.pop();
      setStack([...stackArr]);

      if (!visited.has(current)) {
        visited.add(current);
        order.push(current);
        setCurrentNode(current);
        setVisitedNodes([...visited]);
        setTraversalOrder([...order]);
        await sleep(speed);

        for (const neighbor of [...adjList[current]].reverse()) {
          if (!visited.has(neighbor)) {
            stackArr.push(neighbor);
            setStack([...stackArr]);
            highlightEdge(current, neighbor);
          }
        }
      }
    }

    setCurrentNode('');
    setStack([]);
  };

  const highlightEdge = (from, to) => {
    setHighlightedEdges(prev => [...prev, `${from}-${to}`, `${to}-${from}`]);
  };

  const startTraversal = async () => {
    resetGraph();
    traversalRef.current = true;
    setIsTraversing(true);
    if (algorithm === 'bfs') {
      await bfsTraversal();
    } else {
      await dfsTraversal();
    }
    traversalRef.current = false;
    setIsTraversing(false);
  };

  const resetGraph = () => {
    traversalRef.current = false;
    setVisitedNodes([]);
    setCurrentNode('');
    setTraversalOrder([]);
    setQueue([]);
    setStack([]);
    setHighlightedEdges([]);
    setIsTraversing(false);
  };

  const generateRandomGraph = () => {
    const nodeIds = ['A', 'B', 'C', 'D', 'E', 'F'];
    const newNodes = nodeIds.map((id, index) => ({
      id,
      x: 100 + (index % 3) * 200 + Math.random() * 50,
      y: 100 + Math.floor(index / 3) * 150 + Math.random() * 50
    }));

    const newEdges = [];
    for (let i = 0; i < nodeIds.length; i++) {
      for (let j = i + 1; j < nodeIds.length; j++) {
        if (Math.random() > 0.6) {
          newEdges.push({ from: nodeIds[i], to: nodeIds[j] });
        }
      }
    }

    setNodes(newNodes);
    setEdges(newEdges);
    resetGraph();
  };

  const getNodeColor = (nodeId) => {
    if (currentNode === nodeId) return '#f59e0b';
    if (visitedNodes.includes(nodeId)) return '#10b981';
    return '#3B82F6';
  };

  const getEdgeColor = (from, to) => {
    return highlightedEdges.includes(`${from}-${to}`) ? '#f59e0b' : '#6b7280';
  };

  useEffect(() => {
    return () => {
      traversalRef.current = false;
    };
  }, []);

  return (
    <div className="visualization-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h1 className="page-title">Graph Visualization</h1>
      </div>

      <div className="content-layout">
        <div className="visualization-container">
          <div className="controls">
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} disabled={isTraversing}>
              <option value="bfs">Breadth-First Search (BFS)</option>
              <option value="dfs">Depth-First Search (DFS)</option>
            </select>

            <select value={startNode} onChange={(e) => setStartNode(e.target.value)} disabled={isTraversing}>
              {nodes.map(node => (
                <option key={node.id} value={node.id}>Start from {node.id}</option>
              ))}
            </select>

            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              disabled={isTraversing}
            />
            <span>{speed / 1000}s</span>

            <button onClick={startTraversal} disabled={isTraversing}>
              <Play size={16} /> Start {algorithm.toUpperCase()}
            </button>

            <button onClick={generateRandomGraph} disabled={isTraversing}>
              <Shuffle size={16} /> Random Graph
            </button>

            <button onClick={resetGraph} disabled={!isTraversing}>
              <RotateCcw size={16} /> Stop / Reset
            </button>
          </div>

          <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '2rem', width: '100%', overflow: 'auto' }}>
            <svg width="100%" height="400" viewBox="0 0 700 400">
              {edges.map((edge, index) => {
                const fromNode = nodes.find(n => n.id === edge.from);
                const toNode = nodes.find(n => n.id === edge.to);
                if (!fromNode || !toNode) return null;
                return (
                  <line
                    key={index}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={getEdgeColor(edge.from, edge.to)}
                    strokeWidth="3"
                  />
                );
              })}
              {nodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill={getNodeColor(node.id)}
                    stroke="#2563eb"
                    strokeWidth="3"
                  />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fill="white" fontSize="16" fontWeight="600">
                    {node.id}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {algorithm === 'bfs' && queue.length > 0 && (
              <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '8px' }}>
                <strong>Queue:</strong> [{queue.join(', ')}]
              </div>
            )}
            {algorithm === 'dfs' && stack.length > 0 && (
              <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px' }}>
                <strong>Stack:</strong> [{stack.join(', ')}]
              </div>
            )}
            {traversalOrder.length > 0 && (
              <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '8px' }}>
                <strong>Traversal:</strong> {traversalOrder.join(' → ')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;
