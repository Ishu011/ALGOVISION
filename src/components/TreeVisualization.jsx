import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, RotateCcw, Play } from 'lucide-react';

const TreeVisualization = ({ onBack }) => {
  const [tree, setTree] = useState(getDefaultTree());
  const [newValue, setNewValue] = useState('');
  const [traversalType, setTraversalType] = useState('inorder');
  const [traversalResult, setTraversalResult] = useState([]);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [isTraversing, setIsTraversing] = useState(false);
  const [error, setError] = useState('');

  const animationSpeed = 800; // milliseconds per step

  function getDefaultTree() {
    return {
      value: 50,
      left: {
        value: 30,
        left: { value: 20, left: null, right: null },
        right: { value: 40, left: null, right: null }
      },
      right: {
        value: 70,
        left: { value: 60, left: null, right: null },
        right: { value: 80, left: null, right: null }
      }
    };
  }

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  const insertNode = (root, value) => {
    if (!root) return { value, left: null, right: null };
    if (value === root.value) return root; // No duplicates
    if (value < root.value) root.left = insertNode(root.left, value);
    else root.right = insertNode(root.right, value);
    return root;
  };

  const deleteNode = (root, value) => {
    if (!root) return null;
    if (value < root.value) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.value) {
      root.right = deleteNode(root.right, value);
    } else {
      if (!root.left) return root.right;
      if (!root.right) return root.left;
      let minNode = root.right;
      while (minNode.left) minNode = minNode.left;
      root.value = minNode.value;
      root.right = deleteNode(root.right, minNode.value);
    }
    return root;
  };

  const handleInsert = () => {
    if (!newValue.trim()) {
      setError('Please enter a value.');
      return;
    }
    const value = parseInt(newValue);
    if (isNaN(value)) {
      setError('Invalid number.');
      return;
    }
    setError('');
    setTree((prevTree) => insertNode(deepClone(prevTree), value));
    setNewValue('');
  };

  const handleDelete = () => {
    if (!newValue.trim()) {
      setError('Please enter a value.');
      return;
    }
    const value = parseInt(newValue);
    if (isNaN(value)) {
      setError('Invalid number.');
      return;
    }
    setError('');
    setTree((prevTree) => deleteNode(deepClone(prevTree), value));
    setNewValue('');
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const inorderTraversal = async (node, result = []) => {
    if (!node || !isTraversing) return result;
    await inorderTraversal(node.left, result);
    if (isTraversing) {
      highlight(node.value, result);
      await sleep(animationSpeed);
    }
    await inorderTraversal(node.right, result);
    return result;
  };

  const preorderTraversal = async (node, result = []) => {
    if (!node || !isTraversing) return result;
    highlight(node.value, result);
    await sleep(animationSpeed);
    await preorderTraversal(node.left, result);
    await preorderTraversal(node.right, result);
    return result;
  };

  const postorderTraversal = async (node, result = []) => {
    if (!node || !isTraversing) return result;
    await postorderTraversal(node.left, result);
    await postorderTraversal(node.right, result);
    highlight(node.value, result);
    await sleep(animationSpeed);
    return result;
  };

  const highlight = (value, result) => {
    setHighlightedNodes([value]);
    result.push(value);
    setTraversalResult([...result]);
  };

  const startTraversal = async () => {
    setIsTraversing(true);
    setTraversalResult([]);
    setHighlightedNodes([]);
    switch (traversalType) {
      case 'inorder':
        await inorderTraversal(tree);
        break;
      case 'preorder':
        await preorderTraversal(tree);
        break;
      case 'postorder':
        await postorderTraversal(tree);
        break;
      default:
        break;
    }
    setIsTraversing(false);
    setHighlightedNodes([]);
  };

  const resetTree = () => {
    setTree(getDefaultTree());
    setTraversalResult([]);
    setHighlightedNodes([]);
    setIsTraversing(false);
    setError('');
    setNewValue('');
  };

  const TreeNode = ({ node, x, y, level }) => {
    if (!node) return null;
    const spacing = 150 / (level + 1);
    const leftX = x - spacing;
    const rightX = x + spacing;
    const childY = y + 80;

    return (
      <g>
        {node.left && (
          <line
            x1={x}
            y1={y}
            x2={leftX}
            y2={childY}
            stroke="#6b7280"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line
            x1={x}
            y1={y}
            x2={rightX}
            y2={childY}
            stroke="#6b7280"
            strokeWidth="2"
          />
        )}

        <circle
          cx={x}
          cy={y}
          r="25"
          fill={highlightedNodes.includes(node.value) ? "#10b981" : "#3B82F6"}
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="600"
        >
          {node.value}
        </text>

        <TreeNode node={node.left} x={leftX} y={childY} level={level + 1} />
        <TreeNode node={node.right} x={rightX} y={childY} level={level + 1} />
      </g>
    );
  };

  return (
    <div className="visualization-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">Tree Visualization</h1>
      </div>

      <div className="content-layout">
        <div className="visualization-container">
          <div className="controls">
            <div className="input-group">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                disabled={isTraversing}
              />
              <button
                className="control-button success"
                onClick={handleInsert}
                disabled={isTraversing}
              >
                <Plus size={16} />
                Insert
              </button>
              <button
                className="control-button danger"
                onClick={handleDelete}
                disabled={isTraversing}
              >
                <Minus size={16} />
                Delete
              </button>
            </div>

            {error && <p style={{ color: 'red', fontWeight: '500' }}>{error}</p>}

            <select
              value={traversalType}
              onChange={(e) => setTraversalType(e.target.value)}
              disabled={isTraversing}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                background: 'white'
              }}
            >
              <option value="inorder">Inorder</option>
              <option value="preorder">Preorder</option>
              <option value="postorder">Postorder</option>
            </select>

            <button
              className="control-button"
              onClick={startTraversal}
              disabled={isTraversing}
            >
              <Play size={16} />
              Traverse
            </button>

            <button
              className="control-button"
              onClick={resetTree}
              disabled={isTraversing}
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div
            style={{
              background: '#f9fafb',
              borderRadius: '12px',
              padding: '2rem',
              minHeight: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
          >
            <svg width="700" height="400" viewBox="0 0 700 400">
              <TreeNode node={tree} x={350} y={50} level={0} />
            </svg>
          </div>

          {traversalResult.length > 0 && (
            <div
              style={{
                background: '#ecfdf5',
                border: '2px solid #10b981',
                borderRadius: '8px',
                padding: '1rem',
                marginTop: '1rem'
              }}
            >
              <h4 style={{ marginBottom: '0.5rem', color: '#059669' }}>
                {traversalType.charAt(0).toUpperCase() +
                  traversalType.slice(1)}{' '}
                Traversal Result:
              </h4>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#047857'
                }}
              >
                {traversalResult.join(' → ')}
              </div>
            </div>
          )}
        </div>

        <div className="info-panel">
          <div className="info-section">
            <h3>About Trees</h3>
            <p>
              A tree is a hierarchical data structure consisting of nodes
              connected by edges. Each tree has a root node and every node has
              zero or more child nodes.
            </p>
          </div>

          <div className="info-section">
            <h3>Properties</h3>
            <ul className="info-list">
              <li>Hierarchical structure</li>
              <li>Root node at the top</li>
              <li>Parent-child relationships</li>
              <li>No cycles (acyclic)</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Binary Search Tree Operations</h3>
            <table className="complexity-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Average</th>
                  <th>Worst</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Search</td>
                  <td className="complexity-good">O(log n)</td>
                  <td className="complexity-bad">O(n)</td>
                </tr>
                <tr>
                  <td>Insert</td>
                  <td className="complexity-good">O(log n)</td>
                  <td className="complexity-bad">O(n)</td>
                </tr>
                <tr>
                  <td>Delete</td>
                  <td className="complexity-good">O(log n)</td>
                  <td className="complexity-bad">O(n)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-section">
            <h3>Tree Traversals</h3>
            <ul className="info-list">
              <li>
                <strong>Inorder:</strong> Left → Root → Right
              </li>
              <li>
                <strong>Preorder:</strong> Root → Left → Right
              </li>
              <li>
                <strong>Postorder:</strong> Left → Right → Root
              </li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Advantages</h3>
            <ul className="info-list">
              <li>Efficient searching and sorting</li>
              <li>Dynamic size</li>
              <li>Hierarchical data representation</li>
              <li>Fast insertion and deletion</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Applications</h3>
            <ul className="info-list">
              <li>File systems</li>
              <li>Database indexing</li>
              <li>Expression parsing</li>
              <li>Decision trees</li>
              <li>Huffman coding</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualization;
