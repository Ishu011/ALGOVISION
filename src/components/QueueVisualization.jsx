import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Eye, RotateCcw } from 'lucide-react';

const QueueVisualization = ({ onBack }) => {
  const [queue, setQueue] = useState([10, 20, 30]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');

  // Enqueue Operation
  const enqueue = () => {
    if (newValue) {
      const value = parseInt(newValue);
      if (!isNaN(value)) {
        const newQueue = [...queue, value];
        setQueue(newQueue);
        setNewValue('');
        setHighlightIndex(newQueue.length - 1);
        setMessage(`Enqueued ${value} to rear`);
        setTimeout(() => {
          setHighlightIndex(-1);
          setMessage('');
        }, 1500);
      }
    }
  };

  // Dequeue Operation
  const dequeue = () => {
    if (queue.length > 0) {
      const dequeuedValue = queue[0];
      setHighlightIndex(0);
      setMessage(`Dequeued ${dequeuedValue} from front`);
      setTimeout(() => {
        const newQueue = queue.slice(1);
        setQueue(newQueue);
        setHighlightIndex(-1);
        setMessage('');
      }, 800);
    } else {
      setMessage('Queue is empty!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // View Front Element
  const front = () => {
    if (queue.length > 0) {
      const frontValue = queue[0];
      setHighlightIndex(0);
      setMessage(`Front element: ${frontValue}`);
      setTimeout(() => {
        setHighlightIndex(-1);
        setMessage('');
      }, 2000);
    } else {
      setMessage('Queue is empty!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // Reset Queue
  const resetQueue = () => {
    setQueue([10, 20, 30]);
    setHighlightIndex(-1);
    setMessage('');
  };

  return (
    <div className="visualization-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1 className="page-title">Queue Visualization</h1>
      </div>

      <div className="content-layout">
        {/* Visualization Section */}
        <div className="visualization-container">
          {/* Controls */}
          <div className="controls">
            <div className="input-group">
              <input
                type="number"
                placeholder="Value"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
              <button className="control-button success" onClick={enqueue}>
                <Plus size={16} />
                Enqueue
              </button>
            </div>

            <button className="control-button danger" onClick={dequeue}>
              <Minus size={16} />
              Dequeue
            </button>

            <button className="control-button" onClick={front}>
              <Eye size={16} />
              Front
            </button>

            <button className="control-button" onClick={resetQueue}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div
              style={{
                background: '#ecfdf5',
                color: '#059669',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontWeight: '600'
              }}
            >
              {message}
            </div>
          )}

          {/* Queue Display */}
          <div className="queue-container">
            {queue.length > 0 ? (
              queue.map((element, index) => (
                <div
                  key={index}
                  className={`queue-element ${
                    highlightIndex === index ? 'highlight' : ''
                  }`}
                >
                  {element}
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '2rem',
                  color: '#6b7280',
                  border: '2px dashed #d1d5db',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                Queue is empty
              </div>
            )}
          </div>

          {/* Pointers (Front and Rear) */}
          {queue.length > 0 && (
            <div
              className="queue-pointers"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '1rem',
                padding: '0 1rem'
              }}
            >
              <div className="pointer" style={{ fontWeight: '600' }}>
                FRONT
              </div>
              <div className="pointer" style={{ fontWeight: '600' }}>
                REAR
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="info-section">
            <h3>About Queues</h3>
            <p>
              A queue is a linear data structure that follows the First In First
              Out (FIFO) principle. Elements are added at the rear and removed
              from the front.
            </p>
          </div>

          <div className="info-section">
            <h3>Properties</h3>
            <ul className="info-list">
              <li>FIFO (First In First Out)</li>
              <li>Two pointers: front and rear</li>
              <li>Dynamic size</li>
              <li>Operations at both ends</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Operations</h3>
            <ul className="info-list">
              <li>
                <strong>Enqueue:</strong> Add element to rear - O(1)
              </li>
              <li>
                <strong>Dequeue:</strong> Remove front element - O(1)
              </li>
              <li>
                <strong>Front:</strong> View front element - O(1)
              </li>
              <li>
                <strong>isEmpty:</strong> Check if empty - O(1)
              </li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Advantages</h3>
            <ul className="info-list">
              <li>Fair scheduling (FIFO)</li>
              <li>Efficient for sequential processing</li>
              <li>Simple implementation</li>
              <li>Natural for real-world scenarios</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Disadvantages</h3>
            <ul className="info-list">
              <li>No random access</li>
              <li>Fixed size (static implementation)</li>
              <li>Memory inefficiency in arrays</li>
              <li>FIFO restriction</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Applications</h3>
            <ul className="info-list">
              <li>Process scheduling in OS</li>
              <li>Breadth-First Search</li>
              <li>Buffer for data streams</li>
              <li>Print queue management</li>
              <li>Customer service systems</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueVisualization;
