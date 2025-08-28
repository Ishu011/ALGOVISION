import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, RotateCcw, ArrowRight } from 'lucide-react';

const LinkedListVisualization = ({ onBack }) => {
  const [list, setList] = useState([
    { data: 10, id: 1 },
    { data: 20, id: 2 },
    { data: 30, id: 3 }
  ]);

  const [highlightId, setHighlightId] = useState(null);
  const [newValue, setNewValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // Insert at Head
  const insertAtHead = () => {
    if (newValue.trim() !== '') {
      const newNode = { data: parseInt(newValue), id: Date.now() };
      setList([newNode, ...list]);
      setNewValue('');
      highlightTemporary(newNode.id);
    }
  };

  // Insert at Tail
  const insertAtTail = () => {
    if (newValue.trim() !== '') {
      const newNode = { data: parseInt(newValue), id: Date.now() };
      setList([...list, newNode]);
      setNewValue('');
      highlightTemporary(newNode.id);
    }
  };

  // Highlight helper
  const highlightTemporary = (id) => {
    setHighlightId(id);
    setTimeout(() => setHighlightId(null), 1000);
  };

  // Delete Node
  const deleteNode = (id) => {
    setList(list.filter(node => node.id !== id));
    setHighlightId(null);
  };

  // Search Element
  const searchElement = () => {
    if (searchValue.trim() !== '') {
      const value = parseInt(searchValue);
      const foundNode = list.find(node => node.data === value);
      if (foundNode) {
        highlightTemporary(foundNode.id);
      } else {
        alert('Element not found!');
      }
    }
  };

  // Reset List
  const resetList = () => {
    setList([
      { data: 10, id: 1 },
      { data: 20, id: 2 },
      { data: 30, id: 3 }
    ]);
    setHighlightId(null);
  };

  return (
    <div className="visualization-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">Linked List Visualization</h1>
      </div>

      <div className="content-layout">
        {/* Main Visualization Section */}
        <div className="visualization-container">
          <div className="controls">
            {/* Insert Controls */}
            <div className="input-group">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <button className="control-button success" onClick={insertAtHead}>
                <Plus size={16} /> Insert Head
              </button>
              <button className="control-button success" onClick={insertAtTail}>
                <Plus size={16} /> Insert Tail
              </button>
            </div>

            {/* Search Control */}
            <div className="input-group">
              <input
                type="number"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="control-button" onClick={searchElement}>
                <Search size={16} /> Find
              </button>
            </div>

            {/* Reset */}
            <button className="control-button danger" onClick={resetList}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {/* Linked List Visualization */}
          <div className="linked-list-container">
            {list.length > 0 ? (
              list.map((node, index) => (
                <React.Fragment key={node.id}>
                  <div
                    className={`list-node ${highlightId === node.id ? 'highlight' : ''}`}
                    onClick={() => deleteNode(node.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to delete"
                  >
                    <div className="node-data">{node.data}</div>
                    <div className="node-pointer"></div>
                  </div>
                  {index < list.length - 1 && (
                    <ArrowRight className="arrow" size={24} />
                  )}
                </React.Fragment>
              ))
            ) : (
              <div style={{ padding: '2rem', color: '#6b7280' }}>List is empty</div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="info-section">
            <h3>About Linked Lists</h3>
            <p>
              A linked list is a linear data structure where elements are stored in nodes. 
              Each node contains data and a reference (link) to the next node in the sequence.
            </p>
          </div>

          <div className="info-section">
            <h3>Properties</h3>
            <ul className="info-list">
              <li>Dynamic size</li>
              <li>Non-contiguous memory</li>
              <li>Sequential access</li>
              <li>Node-based structure</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Time Complexity</h3>
            <table className="complexity-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Access</td>
                  <td className="complexity-bad">O(n)</td>
                </tr>
                <tr>
                  <td>Search</td>
                  <td className="complexity-bad">O(n)</td>
                </tr>
                <tr>
                  <td>Insert (head)</td>
                  <td className="complexity-good">O(1)</td>
                </tr>
                <tr>
                  <td>Delete (head)</td>
                  <td className="complexity-good">O(1)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-section">
            <h3>Advantages</h3>
            <ul className="info-list">
              <li>Dynamic size allocation</li>
              <li>Efficient insertion/deletion</li>
              <li>No memory waste</li>
              <li>Flexible structure</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Disadvantages</h3>
            <ul className="info-list">
              <li>No random access</li>
              <li>Extra memory for pointers</li>
              <li>Not cache friendly</li>
              <li>Sequential access only</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Applications</h3>
            <ul className="info-list">
              <li>Dynamic memory allocation</li>
              <li>Implementation of stacks/queues</li>
              <li>Undo functionality in software</li>
              <li>Hash table chaining</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualization;
