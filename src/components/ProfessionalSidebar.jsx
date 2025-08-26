import React from 'react';

export default function ProfessionalSidebar({ activeTab, setActiveTab, liveStats }) {
  const menuItems = [
    { id: 'dashboard', label: '🏡 Dashboard', count: null },
    { id: 'map-view', label: '🗺️ Map View AI', count: null },
    { id: 'auction-calendar', label: '📅 Auction Calendar', count: 'NEW' },
    { id: 'foreclosure-properties', label: '🏠 Foreclosure Properties', count: 98 },
    { id: 'tax-deed', label: '🏛️ Tax Deed Properties', count: 8 },
    { id: 'property-comparison', label: '⚖️ Property Comparison', count: 'NEW' },
    { id: 'advanced-analytics', label: '🚀 Advanced Analytics', count: 'NEW' },
    { id: 'census-data', label: '📊 Census Data', count: 'NEW' }
  ];

  return (
    <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">BrevardBidderAI</h1>
            <p className="text-sm text-gray-600">Property Intelligence</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-medium">{item.label}</span>
              {item.count && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === item.id
                    ? 'bg-white text-purple-600'
                    : item.count === 'NEW'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Live Stats */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Live Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Properties</span>
              <span className="font-bold text-purple-600">{liveStats?.properties || 108}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg ROI</span>
              <span className="font-bold text-green-600">{liveStats?.avgROI || '17.0%'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Value</span>
              <span className="font-bold text-blue-600">{liveStats?.totalValue || '$35.1M'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">🤖</span>
            <span className="font-semibold">AI Assistant</span>
          </div>
          <p className="text-sm opacity-90">
            Try voice commands: "Show me Melbourne properties" or "Find high ROI deals"
          </p>
        </div>
      </div>
    </div>
  );
}
