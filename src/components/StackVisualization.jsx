import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Eye, RotateCcw } from 'lucide-react';

const StackVisualization = ({ onBack }) => {
  const [stack, setStack] = useState([10, 20, 30]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [newValue, setNewValue] = useState('');
  const [message, setMessage] = useState('');

  // Push operation
  const push = () => {
    if (newValue) {
      const value = parseInt(newValue);
      const newStack = [...stack, value];
      setStack(newStack);
      setNewValue('');
      setHighlightIndex(newStack.length - 1);
      setMessage(`Pushed ${value} onto stack`);
      setTimeout(() => {
        setHighlightIndex(-1);
        setMessage('');
      }, 1500);
    }
  };

  // Pop operation
  const pop = () => {
    if (stack.length > 0) {
      const poppedValue = stack[stack.length - 1];
      setHighlightIndex(stack.length - 1);
      setMessage(`Popped ${poppedValue} from stack`);
      
      setTimeout(() => {
        const newStack = stack.slice(0, -1);
        setStack(newStack);
        setHighlightIndex(-1);
        setMessage('');
      }, 800);
    } else {
      setMessage('Stack is empty!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // Peek operation
  const peek = () => {
    if (stack.length > 0) {
      const topValue = stack[stack.length - 1];
      setHighlightIndex(stack.length - 1);
      setMessage(`Top element: ${topValue}`);
      setTimeout(() => {
        setHighlightIndex(-1);
        setMessage('');
      }, 2000);
    } else {
      setMessage('Stack is empty!');
      setTimeout(() => setMessage(''), 1500);
    }
  };

  // Reset the stack
  const resetStack = () => {
    setStack([10, 20, 30]);
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
        <h1 className="page-title">Stack Visualization</h1>
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
              <button className="control-button success" onClick={push}>
                <Plus size={16} />
                Push
              </button>
            </div>

            <button className="control-button danger" onClick={pop}>
              <Minus size={16} />
              Pop
            </button>

            <button className="control-button" onClick={peek}>
              <Eye size={16} />
              Peek
            </button>

            <button className="control-button" onClick={resetStack}>
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Message Box */}
          {message && (
            <div style={{ 
              background: '#ecfdf5', 
              color: '#059669', 
              padding: '1rem', 
              borderRadius: '8px', 
              marginBottom: '1rem',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              {message}
            </div>
          )}

          {/* Stack Display */}
          <div className="stack-container">
            {stack.map((element, index) => (
              <div
                key={index}
                className={`stack-element ${highlightIndex === index ? 'highlight' : ''}`}
              >
                {element}
                {index === stack.length - 1 && (
                  <small style={{ marginLeft: '0.5rem', color: '#6b7280' }}>← TOP</small>
                )}
              </div>
            ))}
            {stack.length === 0 && (
              <div style={{ 
                padding: '2rem', 
                color: '#6b7280',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                Stack is empty
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <div className="info-section">
            <h3>About Stacks</h3>
            <p>
              A stack is a linear data structure that follows the Last In First Out (LIFO) principle. 
              Elements are added and removed from the same end, called the top.
            </p>
          </div>

          <div className="info-section">
            <h3>Properties</h3>
            <ul className="info-list">
              <li>LIFO (Last In First Out)</li>
              <li>Operations at one end only</li>
              <li>Dynamic size</li>
              <li>Top pointer tracking</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Operations</h3>
            <ul className="info-list">
              <li><strong>Push:</strong> Add element to top - O(1)</li>
              <li><strong>Pop:</strong> Remove top element - O(1)</li>
              <li><strong>Peek/Top:</strong> View top element - O(1)</li>
              <li><strong>isEmpty:</strong> Check if empty - O(1)</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Advantages</h3>
            <ul className="info-list">
              <li>Simple and efficient operations</li>
              <li>Automatic memory management</li>
              <li>Function call management</li>
              <li>Undo operations support</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Disadvantages</h3>
            <ul className="info-list">
              <li>Limited access to elements</li>
              <li>No random access</li>
              <li>Stack overflow risk</li>
              <li>LIFO restriction</li>
            </ul>
          </div>

          <div className="info-section">
            <h3>Applications</h3>
            <ul className="info-list">
              <li>Function call management</li>
              <li>Expression evaluation</li>
              <li>Undo operations in editors</li>
              <li>Browser back button</li>
              <li>Recursion implementation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StackVisualization;
