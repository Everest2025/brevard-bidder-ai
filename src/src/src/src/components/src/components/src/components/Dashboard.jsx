import React from 'react';

export default function Dashboard({ filters, liveStats }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">🗺️</span>
          BrevardBidderAI Dashboard
        </h2>
        <p className="text-gray-600 mt-1">Interactive Brevard County Property Intelligence</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800">{liveStats.properties}</div>
              <div className="text-gray-600 text-sm">Properties</div>
            </div>
            <div className="text-3xl">🏠</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{liveStats.avgROI}</div>
              <div className="text-gray-600 text-sm">Avg ROI</div>
            </div>
            <div className="text-3xl">📈</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{liveStats.totalValue}</div>
              <div className="text-gray-600 text-sm">Total Value</div>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">98</div>
              <div className="text-gray-600 text-sm">Foreclosures</div>
            </div>
            <div className="text-3xl">🏛️</div>
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Interactive Brevard County Map</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              🛰️ Satellite
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              🗺️ Streets
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              🔥 Heatmap
            </button>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              📍 Clusters
            </button>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 h-96 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-200">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-xl font-semibold text-gray-700 mb-2">Interactive Brevard County Map</div>
            <div className="text-gray-600 mb-4">108 Properties • Real-time Data • AI Analytics</div>
            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <span>🔴 Foreclosure: 98</span>
              <span>🟣 Tax Deed: 8</span>
              <span>🟡 Auction: 2</span>
              <span>🟢 Available: 0</span>
            </div>
          </div>
        </div>

        {/* Map Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-red-600">98</div>
            <div className="text-xs text-red-700">Foreclosures</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-purple-600">8</div>
            <div className="text-xs text-purple-700">Tax Deeds</div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">2</div>
            <div className="text-xs text-yellow-700">Auctions</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">0</div>
            <div className="text-xs text-green-700">Available</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="text-blue-600 mr-3">🏠</div>
              <div>
                <div className="font-medium text-gray-800">New foreclosure added</div>
                <div className="text-sm text-gray-600">1307 Babcock St, Melbourne</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="text-green-600 mr-3">📈</div>
              <div>
                <div className="font-medium text-gray-800">Price drop alert</div>
                <div className="text-sm text-gray-600">3 properties in Melbourne</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <div className="text-purple-600 mr-3">🎯</div>
              <div>
                <div className="font-medium text-gray-800">New investment opportunity</div>
                <div className="text-sm text-gray-600">High ROI potential detected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Market Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Average Days on Market</span>
              <span className="font-bold text-blue-600">45 days</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Price per Sq Ft</span>
              <span className="font-bold text-green-600">$156</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Market Trend</span>
              <span className="font-bold text-purple-600">📈 Rising</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
