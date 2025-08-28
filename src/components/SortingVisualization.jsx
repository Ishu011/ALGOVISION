import React, { useState } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Shuffle } from 'lucide-react';

const SortingVisualization = ({ onBack }) => {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [speed, setSpeed] = useState(500);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    resetVisualizationStates();
  };

  const resetVisualizationStates = () => {
    setComparingIndices([]);
    setSortedIndices([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isAnimating) return;

        setComparingIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }

        await sleep(speed);
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }
    setSortedIndices(prev => [...prev, 0]);
    setComparingIndices([]);
  };

  const selectionSort = async () => {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        if (!isAnimating) return;

        setComparingIndices([minIdx, j]);
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
      }

      setSortedIndices(prev => [...prev, i]);
      await sleep(speed);
    }
    setSortedIndices(prev => [...prev, n - 1]);
    setComparingIndices([]);
  };

  const insertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    setSortedIndices([0]);

    for (let i = 1; i < n; i++) {
      if (!isAnimating) return;

      const key = arr[i];
      let j = i - 1;

      setComparingIndices([i]);
      await sleep(speed);

      while (j >= 0 && arr[j] > key) {
        if (!isAnimating) return;

        setComparingIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
        await sleep(speed);
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i]);
      await sleep(speed);
    }
    setComparingIndices([]);
  };

  const startSorting = async () => {
    setIsAnimating(true);
    resetVisualizationStates();

    switch (algorithm) {
      case 'bubble':
        await bubbleSort();
        break;
      case 'selection':
        await selectionSort();
        break;
      case 'insertion':
        await insertionSort();
        break;
      default:
        break;
    }

    setIsAnimating(false);
  };

  const stopSorting = () => {
    setIsAnimating(false);
  };

  return (
    <div className="visualization-page p-4">
      <div className="page-header flex items-center mb-4">
        <button className="back-button flex items-center text-blue-500" onClick={onBack}>
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>
        <h1 className="page-title text-2xl font-bold ml-4">Sorting Algorithms</h1>
      </div>

      <div className="content-layout flex gap-6">
        <div className="visualization-container w-2/3">
          <div className="controls flex flex-wrap gap-4 mb-4">
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
            </select>

            <div className="input-group flex items-center gap-2">
              <label className="font-semibold">Speed:</label>
              <input
                type="range"
                min="100"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(parseInt(e.target.value))}
              />
              <span>{speed}ms</span>
            </div>

            {!isAnimating ? (
              <button className="control-button bg-green-500 text-white px-3 py-1 rounded" onClick={startSorting}>
                <Play size={16} className="inline mr-1" />
                Start
              </button>
            ) : (
              <button className="control-button bg-red-500 text-white px-3 py-1 rounded" onClick={stopSorting}>
                <Pause size={16} className="inline mr-1" />
                Stop
              </button>
            )}

            <button className="control-button bg-yellow-500 text-white px-3 py-1 rounded" onClick={generateRandomArray} disabled={isAnimating}>
              <Shuffle size={16} className="inline mr-1" />
              Shuffle
            </button>

            <button className="control-button bg-gray-500 text-white px-3 py-1 rounded" onClick={resetVisualizationStates} disabled={isAnimating}>
              <RotateCcw size={16} className="inline mr-1" />
              Reset
            </button>
          </div>

          <div className="array-container flex items-end gap-2 bg-gray-100 p-4 rounded-md">
            {array.map((element, index) => {
              let className = 'bg-blue-500';
              if (comparingIndices.includes(index)) {
                className = 'bg-yellow-500';
              } else if (sortedIndices.includes(index)) {
                className = 'bg-green-500';
              }

              return (
                <div
                  key={index}
                  className={`${className} w-10 rounded-md transition-all duration-300`}
                  style={{
                    height: `${element * 2}px`,
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}
                >
                  <span className="text-white font-bold">{element}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="info-panel w-1/3">
          <div className="info-section mb-4">
            <h3 className="text-lg font-bold mb-2">
              Current Algorithm: {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort
            </h3>
            {algorithm === 'bubble' && (
              <p>Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if necessary.</p>
            )}
            {algorithm === 'selection' && (
              <p>Selection sort finds the minimum element and places it at the beginning, then repeats the process.</p>
            )}
            {algorithm === 'insertion' && (
              <p>Insertion sort builds the sorted array one element at a time by inserting each into its correct position.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;
