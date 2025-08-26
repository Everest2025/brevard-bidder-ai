import React, { useState } from 'react';

export default function AIControlCenter() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    // Voice command functionality would be implemented here
    if (!isListening) {
      console.log('Starting voice recognition...');
      setTimeout(() => setIsListening(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Left side - AI Control Center */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">AI Control Center</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Live Data</span>
          </div>
        </div>

        {/* Center - AI Assistant */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-medium text-gray-700">AI Assistant</span>
            <input
              type="text"
              placeholder="Ask about properties..."
              className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-48"
            />
            <button 
              onClick={handleVoiceCommand}
              className={`p-1 rounded ${isListening ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'} hover:bg-opacity-80 transition-colors`}
            >
              {isListening ? '🔴' : '🎤'}
            </button>
          </div>
        </div>

        {/* Right side - Quick AI Actions */}
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm">
            <span>🎯</span>
            <span>AI Recommendations</span>
          </button>
          <button className="flex items-center space-x-1 bg-purple-100 text-purple-800 px-3 py-2 rounded-lg hover:bg-purple-200 transition-colors text-sm">
            <span>🧠</span>
            <span>ML Valuation</span>
          </button>
          <button className="flex items-center space-x-1 bg-green-100 text-green-800 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm">
            <span>📊</span>
            <span>Market Analytics</span>
          </button>
        </div>
      </div>

      {/* Live AI Insights */}
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span className="text-gray-600">Market Signal:</span>
            <span className="font-semibold text-blue-600">Buy (78% confidence)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-gray-600">New Opportunities:</span>
            <span className="font-semibold text-green-600">3 properties (85% confidence)</span>
          </div>
        </div>
        
        {isListening && (
          <div className="flex items-center space-x-2 text-red-600">
            <div className="animate-pulse">🔴</div>
            <span className="text-sm">Listening for voice commands...</span>
          </div>
        )}
      </div>
    </div>
  );
}
