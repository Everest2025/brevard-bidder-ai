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
    { id: 'census-data', label: '📊 Census Data', count: 'NEW' },
    { id: 'property-report', label: '📋 Property Report', count: null },
    { id: 'search', label: '🔍 Search', count: null },
    { id: 'auctions', label: '🏛️ Auctions', count: null },
    { id: 'analytics', label: '📈 Analytics', count: null },
    { id: 'watchlist', label: '⭐ Watchlist', count: null }
  ];

  return (
    <div className="w-80 bg-white shadow-lg h-screen overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center mb-4">
          <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-bold text-lg text-center shadow-lg">
            BrevardBidderAI
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          Smart Property Investment Platform
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span className="flex items-center">
              {item.label}
            </span>
            {item.count && (
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.count === 'NEW'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Live Stats */}
      <div className="p-4 mx-4 mb-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          📊 Live Stats
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Properties:</span>
            <span className="font-semibold">{liveStats?.properties || 108}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Avg ROI:</span>
            <span className="font-semibold text-green-600">{liveStats?.avgROI || '17.0%'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Value:</span>
            <span className="font-semibold text-blue-600">{liveStats?.totalValue || '$35.1M'}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 mx-4 mb-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
          ⚡ Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all">
            📈 Generate Market Report
          </button>
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all">
            🔍 Property Comparison
          </button>
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all">
            💰 ROI Calculator
          </button>
          <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-white hover:shadow-sm rounded transition-all">
            📊 Market Trends
          </button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="p-4 mx-4 mb-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
        <div className="text-center">
          <div className="text-2xl mb-2">🤖</div>
          <div className="text-sm font-semibold text-purple-800 mb-1">AI Assistant</div>
          <div className="text-xs text-purple-600">
            Try voice commands: "Show foreclosures" or "Filter by price"
          </div>
        </div>
      </div>
    </div>
  );
}
