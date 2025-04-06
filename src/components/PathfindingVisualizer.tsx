import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';

interface PathfindingState {
  grid: number[][];
  visitedNodes: number;
  pathLength: number;
  isRunning: boolean;
  currentAlgorithm: string;
}

const PathfindingVisualizer: React.FC = () => {
  const [state, setState] = useState<PathfindingState>({
    grid: Array(20).fill(Array(20).fill(0)),
    visitedNodes: 0,
    pathLength: 0,
    isRunning: false,
    currentAlgorithm: 'bfs',
  });

  const generateMaze = () => {
    // Simple random maze generation
    const newGrid = Array(20).fill(0).map(() =>
      Array(20).fill(0).map(() => Math.random() > 0.7 ? 1 : 0)
    );
    setState(prev => ({ ...prev, grid: newGrid, visitedNodes: 0, pathLength: 0 }));
  };

  useEffect(() => {
    generateMaze();
  }, []);

  const algorithms = [
    { name: 'BFS', value: 'bfs', description: 'Breadth-First Search' },
    { name: 'DFS', value: 'dfs', description: 'Depth-First Search' },
    { name: 'Dijkstra', value: 'dijkstra', description: 'Shortest path' },
    { name: 'A*', value: 'astar', description: 'A* Search' },
    { name: 'Greedy BFS', value: 'greedy', description: 'Greedy Best-First Search' },
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
            <span className="ml-2 text-sm opacity-75">{algo.description}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={generateMaze}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <RotateCcw className="h-4 w-4" />
            New Maze
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
            <span className="text-sm text-gray-600">Visited Nodes:</span>
            <span className="ml-2 font-semibold">{state.visitedNodes}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Path Length:</span>
            <span className="ml-2 font-semibold">{state.pathLength}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-20 gap-0.5 bg-gray-200 p-0.5 rounded-lg">
        {state.grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`aspect-square ${
                cell === 1 ? 'bg-gray-800' : 'bg-white'
              } rounded-sm transition-colors duration-200`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;