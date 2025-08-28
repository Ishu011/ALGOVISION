import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, RotateCcw } from 'lucide-react';

const ArrayVisualization = ({ onBack }) => {
  const [array, setArray] = useState([5, 2, 8, 1, 9, 3]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [searchValue, setSearchValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');

  // ✅ Insert element at a given index
  const insertElement = () => {
    const index = parseInt(insertIndex);
    const value = parseInt(newValue);

    if (isNaN(value) || isNaN(index)) {
      alert('Please enter valid numbers for value and index.');
      return;
    }

    if (index < 0 || index > array.length) {
      alert(`Index should be between 0 and ${array.length}.`);
      return;
    }

    const newArray = [...array];
    newArray.splice(index, 0, value);
    setArray(newArray);

    // Highlight inserted element
    setHighlightIndex(index);
    setTimeout(() => setHighlightIndex(-1), 1500);

    // Reset inputs
    setNewValue('');
    setInsertIndex('');
  };

  // ✅ Delete element when clicked
  const deleteElement = (index) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
    setHighlightIndex(-1);
  };

  // ✅ Search for an element and highlight it
  const searchElement = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      alert('Please enter a valid number to search.');
      return;
    }

    const index = array.findIndex(el => el === value);
    if (index !== -1) {
      setHighlightIndex(index);
      setTimeout(() => setHighlightIndex(-1), 2000);
    } else {
      alert('Element not found!');
    }
    setSearchValue('');
  };

  // ✅ Reset array to initial state
  const resetArray = () => {
    setArray([5, 2, 8, 1, 9, 3]);
    setHighlightIndex(-1);
  };

  return (
    <div className="visualization-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">Array Visualization</h1>
      </div>

      {/* Main Layout */}
      <div className="content-layout">
        {/* Visualization Section */}
        <div className="visualization-container">
          {/* Controls */}
          <div className="controls">
            {/* Insert Controls */}
            <div className="input-group">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <input
                type="number"
                placeholder="Index"
                value={insertIndex}
                onChange={(e) => setInsertIndex(e.target.value)}
              />
              <button className="control-button success" onClick={insertElement}>
                <Plus size={16} />
                Insert
              </button>
            </div>

            {/* Search Controls */}
            <div className="input-group">
              <input
                type="number"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="control-button" onClick={searchElement}>
                <Search size={16} />
                Find
              </button>
            </div>

            {/* Reset Button */}
            <button className="control-button danger" onClick={resetArray}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Array Display */}
          <div className="array-container">
            {array.map((element, index) => (
              <div
                key={index}
                className={`array-element ${highlightIndex === index ? 'highlight' : ''}`}
                onClick={() => deleteElement(index)}
                style={{ cursor: 'pointer' }}
                title="Click to delete"
              >
                <div>{element}</div>
                <small>[{index}]</small>
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="info-section">
            <h3>About Arrays</h3>
            <p>
              An array is a collection of elements stored at contiguous memory locations. 
              It's one of the most fundamental data structures in computer science.
            </p>
          </div>

          <div className="info-section">
            <h3>Properties</h3>
            <ul className="info-list">
              <li>Fixed size (static arrays)</li>
              <li>Elements stored contiguously</li>
              <li>Random access using index</li>
              <li>Same data type elements</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Operations</h3>
            <ul className="info-list">
              <li>Access: O(1)</li>
              <li>Search: O(n)</li>
              <li>Insertion: O(n)</li>
              <li>Deletion: O(n)</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Advantages</h3>
            <ul className="info-list">
              <li>Fast access to elements by index</li>
              <li>Memory efficient</li>
              <li>Cache friendly</li>
              <li>Simple implementation</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Disadvantages</h3>
            <ul className="info-list">
              <li>Fixed size (static arrays)</li>
              <li>Expensive insertion/deletion</li>
              <li>Memory waste if not full</li>
              <li>No built-in bounds checking</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Applications</h3>
            <ul className="info-list">
              <li>Implementing other data structures</li>
              <li>Mathematical computations</li>
              <li>Storing data for processing</li>
              <li>Look-up tables</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrayVisualization;
