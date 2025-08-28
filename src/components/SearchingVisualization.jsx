import React, { useState } from 'react';
import { ArrowLeft, Search, RotateCcw, Shuffle } from 'lucide-react';

const SearchingVisualization = ({ onBack }) => {
  const [array, setArray] = useState([2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]);
  const [searchValue, setSearchValue] = useState('');
  const [algorithm, setAlgorithm] = useState('linear');
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [searchRange, setSearchRange] = useState({ left: -1, right: -1, mid: -1 });
  const [steps, setSteps] = useState([]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, 800));

  const linearSearch = async (target) => {
    const newSteps = [`Starting linear search for ${target}`];
    setSteps(newSteps);
    
    for (let i = 0; i < array.length; i++) {
      if (!isSearching) return -1;
      
      setCurrentIndex(i);
      newSteps.push(`Checking index ${i}: ${array[i]}`);
      setSteps([...newSteps]);
      await sleep(800);
      
      if (array[i] === target) {
        setFoundIndex(i);
        newSteps.push(`Found ${target} at index ${i}!`);
        setSteps([...newSteps]);
        return i;
      }
    }
    
    newSteps.push(`${target} not found in the array`);
    setSteps([...newSteps]);
    return -1;
  };

  const binarySearch = async (target) => {
    let left = 0;
    let right = array.length - 1;
    const newSteps = [`Starting binary search for ${target} (Array must be sorted)`];
    setSteps(newSteps);
    
    while (left <= right) {
      if (!isSearching) return -1;
      
      const mid = Math.floor((left + right) / 2);
      setSearchRange({ left, right, mid });
      
      newSteps.push(`Searching range [${left}, ${right}], checking middle index ${mid}: ${array[mid]}`);
      setSteps([...newSteps]);
      await sleep(1000);
      
      if (array[mid] === target) {
        setFoundIndex(mid);
        newSteps.push(`Found ${target} at index ${mid}!`);
        setSteps([...newSteps]);
        return mid;
      } else if (array[mid] < target) {
        left = mid + 1;
        newSteps.push(`${array[mid]} < ${target}, searching right half`);
      } else {
        right = mid - 1;
        newSteps.push(`${array[mid]} > ${target}, searching left half`);
      }
      setSteps([...newSteps]);
    }
    
    newSteps.push(`${target} not found in the array`);
    setSteps([...newSteps]);
    return -1;
  };

  const startSearch = async () => {
    if (!searchValue) return;
    
    const target = parseInt(searchValue);
    setIsSearching(true);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setSearchRange({ left: -1, right: -1, mid: -1 });
    setSteps([]);
    
    if (algorithm === 'linear') {
      await linearSearch(target);
    } else {
      await binarySearch(target);
    }
    
    setIsSearching(false);
    setCurrentIndex(-1);
    setSearchRange({ left: -1, right: -1, mid: -1 });
  };

  const resetSearch = () => {
    setIsSearching(false);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setSearchRange({ left: -1, right: -1, mid: -1 });
    setSteps([]);
    setSearchValue('');
  };

  const generateSortedArray = () => {
    const newArray = Array.from({ length: 11 }, (_, i) => (i + 1) * Math.floor(Math.random() * 10) + 2).sort((a, b) => a - b);
    setArray(newArray);
    resetSearch();
  };

  const getElementClass = (index) => {
    let className = 'array-element';
    
    if (foundIndex === index) {
      className += ' sorted'; // Green for found
    } else if (algorithm === 'linear' && currentIndex === index) {
      className += ' comparing'; // Orange for current
    } else if (algorithm === 'binary') {
      if (searchRange.mid === index) {
        className += ' comparing'; // Orange for middle
      } else if (index >= searchRange.left && index <= searchRange.right && searchRange.left !== -1) {
        className += ' highlight'; // Blue for search range
      }
    }
    
    return className;
  };

  return (
    <div className="visualization-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">Searching Algorithms</h1>
      </div>

      <div className="content-layout">
        <div className="visualization-container">
          <div className="controls">
            <select 
              value={algorithm} 
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isSearching}
              style={{ 
                padding: '0.75rem', 
                borderRadius: '8px', 
                border: '2px solid #e5e7eb',
                background: 'white'
              }}
            >
              <option value="linear">Linear Search</option>
              <option value="binary">Binary Search</option>
            </select>

            <div className="input-group">
              <input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={isSearching}
              />
              <button 
                className="control-button success" 
                onClick={startSearch} 
                disabled={isSearching || !searchValue}
              >
                <Search size={16} />
                Search
              </button>
            </div>

            <button 
              className="control-button" 
              onClick={generateSortedArray} 
              disabled={isSearching}
            >
              <Shuffle size={16} />
              New Array
            </button>

            <button className="control-button" onClick={resetSearch}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          <div className="array-container">
            {array.map((element, index) => (
              <div
                key={index}
                className={getElementClass(index)}
              >
                <div>{element}</div>
                <small>[{index}]</small>
              </div>
            ))}
          </div>

          {steps.length > 0 && (
            <div style={{
              background: '#f9fafb',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              padding: '1rem',
              marginTop: '1rem',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>Search Steps:</h4>
              {steps.map((step, index) => (
                <div key={index} style={{
                  padding: '0.25rem 0',
                  fontSize: '0.9rem',
                  color: '#4b5563',
                  borderLeft: index === steps.length - 1 ? '3px solid #10b981' : '3px solid transparent',
                  paddingLeft: '0.5rem'
                }}>
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="info-panel">
          <div className="info-section">
            <h3>Current Algorithm: {algorithm === 'linear' ? 'Linear' : 'Binary'} Search</h3>
            {algorithm === 'linear' ? (
              <div>
                <p>
                  Linear search checks each element in the array sequentially until 
                  the target element is found or the end of the array is reached.
                </p>
                <ul className="info-list">
                  <li><strong>Time Complexity:</strong> O(n)</li>
                  <li><strong>Space Complexity:</strong> O(1)</li>
                  <li><strong>Best Case:</strong> O(1) - element at first position</li>
                  <li><strong>Worst Case:</strong> O(n) - element at last position or not found</li>
                </ul>
              </div>
            ) : (
              <div>
                <p>
                  Binary search works on sorted arrays by repeatedly dividing the search 
                  interval in half and comparing the target with the middle element.
                </p>
                <ul className="info-list">
                  <li><strong>Time Complexity:</strong> O(log n)</li>
                  <li><strong>Space Complexity:</strong> O(1)</li>
                  <li><strong>Best Case:</strong> O(1) - element at middle</li>
                  <li><strong>Worst Case:</strong> O(log n) - maximum divisions</li>
                </ul>
              </div>
            )}
          </div>

          <div className="info-section">
            <h3>Color Legend</h3>
            <ul className="info-list">
              <li style={{ color: '#3B82F6' }}>Search range (Binary)</li>
              <li style={{ color: '#f59e0b' }}>Currently checking</li>
              <li style={{ color: '#10b981' }}>Found element</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Algorithm Comparison</h3>
            <table className="complexity-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Time Complexity</th>
                  <th>Prerequisite</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Linear Search</td>
                  <td className="complexity-bad">O(n)</td>
                  <td>None</td>
                  <td>Unsorted data</td>
                </tr>
                <tr>
                  <td>Binary Search</td>
                  <td className="complexity-good">O(log n)</td>
                  <td>Sorted array</td>
                  <td>Large sorted data</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="info-section">
            <h3>Advantages & Disadvantages</h3>
            <div style={{ marginBottom: '1rem' }}>
              <h4 style={{ color: '#374151' }}>Linear Search</h4>
              <p style={{ color: '#10b981', fontSize: '0.9rem' }}>
                ✓ Works on unsorted data ✓ Simple implementation ✓ No preprocessing required
              </p>
              <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                ✗ Slow for large datasets ✗ Not efficient for repeated searches
              </p>
            </div>
            <div>
              <h4 style={{ color: '#374151' }}>Binary Search</h4>
              <p style={{ color: '#10b981', fontSize: '0.9rem' }}>
                ✓ Very fast for large datasets ✓ Efficient for repeated searches
              </p>
              <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>
                ✗ Requires sorted data ✗ More complex implementation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingVisualization;
