import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, RotateCcw } from 'lucide-react';

const DPVisualization = ({ onBack }) => {
  const [algorithm, setAlgorithm] = useState('fibonacci');
  const [inputValue, setInputValue] = useState(8);
  const [isRunning, setIsRunning] = useState(false);
  const [dpTable, setDpTable] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [memoTable, setMemoTable] = useState({});
  const [speed, setSpeed] = useState(800); // Speed control in ms

  // Knapsack state
  const [items, setItems] = useState([
    { weight: 2, value: 3, name: 'Item 1' },
    { weight: 3, value: 4, name: 'Item 2' },
    { weight: 4, value: 5, name: 'Item 3' },
    { weight: 5, value: 6, name: 'Item 4' }
  ]);
  const [capacity, setCapacity] = useState(8);

  // LCS state
  const [string1, setString1] = useState('ABCDGH');
  const [string2, setString2] = useState('AEDFHR');

  const isActive = useRef(false); // Cancellation control

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    return () => { isActive.current = false; }; // Cleanup on unmount
  }, []);

  const fibonacciDP = async () => {
    const n = inputValue;
    const dp = new Array(n + 1).fill(0);
    const newSteps = [];

    if (n <= 1) {
      setResult(n);
      return;
    }

    dp[0] = 0;
    dp[1] = 1;
    newSteps.push(`Base cases: F(0)=0, F(1)=1`);

    setDpTable([...dp]);
    setSteps([...newSteps]);
    await sleep(speed);

    for (let i = 2; i <= n; i++) {
      if (!isActive.current) return;

      dp[i] = dp[i - 1] + dp[i - 2];
      newSteps.push(`F(${i}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`);

      setCurrentStep(i);
      setDpTable([...dp]);
      setSteps([...newSteps]);
      await sleep(speed);
    }

    setResult(dp[n]);
    setCurrentStep(-1);
  };

  const knapsackDP = async () => {
    const n = items.length;
    const W = capacity;
    const dp = Array.from({ length: n + 1 }, () => Array(W + 1).fill(0));
    const newSteps = [];

    newSteps.push(`Initializing DP table for ${n} items and capacity ${W}`);
    setDpTable([...dp]);
    setSteps([...newSteps]);
    await sleep(speed);

    for (let i = 1; i <= n; i++) {
      for (let w = 1; w <= W; w++) {
        if (!isActive.current) return;

        const currentItem = items[i - 1];

        if (currentItem.weight <= w) {
          const include = currentItem.value + dp[i - 1][w - currentItem.weight];
          const exclude = dp[i - 1][w];
          dp[i][w] = Math.max(include, exclude);

          newSteps.push(
            `Item ${i} (w=${currentItem.weight}, v=${currentItem.value}): max(${include}, ${exclude}) = ${dp[i][w]}`
          );
        } else {
          dp[i][w] = dp[i - 1][w];
          newSteps.push(`Item ${i} too heavy for capacity ${w}, skip`);
        }

        setCurrentStep(i * (W + 1) + w);
        setDpTable([...dp]);
        setSteps([...newSteps]);
        await sleep(speed);
      }
    }

    setResult(dp[n][W]);
    setCurrentStep(-1);
  };

  const lcsDP = async () => {
    const m = string1.length;
    const n = string2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const newSteps = [];

    newSteps.push(`Finding LCS of "${string1}" and "${string2}"`);
    setDpTable([...dp]);
    setSteps([...newSteps]);
    await sleep(speed);

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (!isActive.current) return;

        if (string1[i - 1] === string2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
          newSteps.push(`Match: ${string1[i - 1]} = ${string2[j - 1]}, LCS[${i}][${j}] = ${dp[i][j]}`);
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          newSteps.push(`No match: LCS[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`);
        }

        setCurrentStep(i * (n + 1) + j);
        setDpTable([...dp]);
        setSteps([...newSteps]);
        await sleep(speed);
      }
    }

    setResult(dp[m][n]);
    setCurrentStep(-1);
  };

  const startAlgorithm = async () => {
    isActive.current = true;
    setIsRunning(true);
    setCurrentStep(-1);
    setResult(null);
    setSteps([]);
    setDpTable([]);

    switch (algorithm) {
      case 'fibonacci':
        await fibonacciDP();
        break;
      case 'knapsack':
        await knapsackDP();
        break;
      case 'lcs':
        await lcsDP();
        break;
      default:
        break;
    }

    setIsRunning(false);
  };

  const resetVisualization = () => {
    isActive.current = false;
    setIsRunning(false);
    setCurrentStep(-1);
    setResult(null);
    setSteps([]);
    setDpTable([]);
    setMemoTable({});
  };

  const renderDPTable = () => {
    if (dpTable.length === 0) return null;

    if (algorithm === 'fibonacci') {
      return (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {dpTable.map((value, index) => (
            <div
              key={index}
              style={{
                background: currentStep === index ? '#f59e0b' : '#3B82F6',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                minWidth: '60px',
                textAlign: 'center',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              <div>F({index})</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          borderCollapse: 'collapse',
          margin: '0 auto',
          background: 'white',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <tbody>
            {dpTable.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      border: '1px solid #e5e7eb',
                      padding: '0.5rem',
                      textAlign: 'center',
                      minWidth: '40px',
                      background: currentStep === i * row.length + j ? '#f59e0b' :
                        cell > 0 ? '#dbeafe' : 'white',
                      color: currentStep === i * row.length + j ? 'white' : '#374151',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="visualization-page">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <h1 className="page-title">Dynamic Programming</h1>
      </div>

      <div className="content-layout">
        <div className="visualization-container">
          <div className="controls">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isRunning}
            >
              <option value="fibonacci">Fibonacci Sequence</option>
              <option value="knapsack">0/1 Knapsack</option>
              <option value="lcs">Longest Common Subsequence</option>
            </select>

            {algorithm === 'fibonacci' && (
              <div>
                <label>n:</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
                  disabled={isRunning}
                  min="0"
                  max="20"
                />
              </div>
            )}

            {algorithm === 'knapsack' && (
              <div>
                <label>Capacity:</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                  disabled={isRunning}
                  min="1"
                  max="15"
                />
              </div>
            )}

            <div>
              <label>Speed:</label>
              <input
                type="range"
                min="100"
                max="2000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
                disabled={isRunning}
              />
            </div>

            <button onClick={startAlgorithm} disabled={isRunning}>
              <Play size={16} /> Start
            </button>
            <button onClick={resetVisualization}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {algorithm === 'lcs' && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label>String 1:</label>
                <input
                  type="text"
                  value={string1}
                  onChange={(e) => setString1(e.target.value.toUpperCase())}
                  disabled={isRunning}
                />
              </div>
              <div>
                <label>String 2:</label>
                <input
                  type="text"
                  value={string2}
                  onChange={(e) => setString2(e.target.value.toUpperCase())}
                  disabled={isRunning}
                />
              </div>
            </div>
          )}

          <div style={{
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '2rem',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {renderDPTable()}
            {result !== null && (
              <div style={{ marginTop: '1rem', fontWeight: 'bold', color: '#047857' }}>
                {algorithm === 'fibonacci' && `F(${inputValue}) = ${result}`}
                {algorithm === 'knapsack' && `Maximum value: ${result}`}
                {algorithm === 'lcs' && `LCS length: ${result}`}
              </div>
            )}
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
              <h4>Algorithm Steps:</h4>
              {steps.map((step, index) => (
                <div key={index} style={{
                  padding: '0.25rem 0',
                  borderLeft: index === steps.length - 1 ? '3px solid #10b981' : '3px solid transparent',
                  paddingLeft: '0.5rem'
                }}>
                  {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DPVisualization;
