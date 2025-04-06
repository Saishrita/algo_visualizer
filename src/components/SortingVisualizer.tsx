import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

interface SortingState {
  array: number[];
  comparisons: number;
  swaps: number;
  isRunning: boolean;
  currentAlgorithm: string;
}

const SortingVisualizer: React.FC = () => {
  const [state, setState] = useState<SortingState>({
    array: [],
    comparisons: 0,
    swaps: 0,
    isRunning: false,
    currentAlgorithm: 'bubble',
  });

  const generateArray = () => {
    const newArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1);
    setState(prev => ({ ...prev, array: newArray, comparisons: 0, swaps: 0 }));
  };

  useEffect(() => {
    generateArray();
  }, []);

  const algorithms = [
    { name: 'Bubble Sort', value: 'bubble', complexity: 'O(n²)' },
    { name: 'Selection Sort', value: 'selection', complexity: 'O(n²)' },
    { name: 'Insertion Sort', value: 'insertion', complexity: 'O(n²)' },
    { name: 'Merge Sort', value: 'merge', complexity: 'O(n log n)' },
    { name: 'Quick Sort', value: 'quick', complexity: 'O(n log n)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        {algorithms.map((algo) => (
          <button
            key={algo.value}
            onClick={() => setState(prev => ({ ...prev, currentAlgorithm: algo.value }))}
            className={`px-4 py-2 rounded-md ${
              state.currentAlgorithm === algo.value
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {algo.name}
            <span className="ml-2 text-sm opacity-75">{algo.complexity}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={generateArray}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <button
            onClick={() => setState(prev => ({ ...prev, isRunning: !prev.isRunning }))}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {state.isRunning ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start
              </>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          <div>
            <span className="text-sm text-gray-600">Comparisons:</span>
            <span className="ml-2 font-semibold">{state.comparisons}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Swaps:</span>
            <span className="ml-2 font-semibold">{state.swaps}</span>
          </div>
        </div>
      </div>

      <div className="h-64 bg-gray-50 rounded-lg p-4 flex items-end">
        {state.array.map((value, index) => (
          <div
            key={index}
            className="flex-1 bg-indigo-500 mx-0.5 rounded-t-sm transition-all duration-200"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;