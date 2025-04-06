import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import SortingVisualizer from './components/SortingVisualizer';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import AlgorithmCard from './components/AlgorithmCard';

function App() {
  const [activeTab, setActiveTab] = useState<'sorting' | 'pathfinding'>('sorting');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Layout className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Algorithm Visualizer</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('sorting')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'sorting'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Sorting
              </button>
              <button
                onClick={() => setActiveTab('pathfinding')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'pathfinding'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Pathfinding
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'sorting' ? (
            <AlgorithmCard
              title="Sorting Algorithms"
              description="Visualize and compare different sorting algorithms"
            >
              <SortingVisualizer />
            </AlgorithmCard>
          ) : (
            <AlgorithmCard
              title="Pathfinding Algorithms"
              description="Explore various pathfinding algorithms on a grid"
            >
              <PathfindingVisualizer />
            </AlgorithmCard>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;