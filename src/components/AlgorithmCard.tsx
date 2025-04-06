import React from 'react';

interface AlgorithmCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default AlgorithmCard;