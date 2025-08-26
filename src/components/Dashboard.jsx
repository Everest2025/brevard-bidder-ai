import React from 'react';

export default function Dashboard({ liveStats }) {
  const stats = [
    {
      title: 'Total Properties',
      value: liveStats?.properties || '108',
      change: '+12 this week',
      changeType: 'positive',
      icon: '🏠'
    },
    {
      title: 'Foreclosures',
      value: '98',
      change: '+8 new',
      changeType: 'positive',
      icon: '⚖️'
    },
    {
      title: 'Tax Deeds',
      value: '8',
      change: '+2 new',
      changeType: 'positive',
      icon: '🏛️'
    },
    {
      title: 'Avg ROI',
      value: liveStats?.avgROI || '17.0%',
      change: '+2.3% vs last month',
      changeType: 'positive',
      icon: '📈'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">BrevardBidderAI Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time property investment intelligence for Brevard County</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Live Data</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Map Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Interactive Brevard County Map</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              🛰️ Satellite
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              🗺️ Streets
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              🔥 Heatmap
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              📍 Clusters
            </button>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <div className="text-xl font-semibold text-gray-700">Interactive Brevard County Map</div>
            <div className="text-gray-600 mt-2">Real-time property visualization coming soon</div>
            <div className="mt-4 text-sm text-gray-500">
              108 properties • 98 foreclosures • 8 tax deeds
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">🏠</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">New foreclosure property added</p>
              <p className="text-sm text-gray-600">1307 Babcock St, Melbourne - $112,199</p>
            </div>
            <span className="text-sm text-gray-500">2 min ago</span>
          </div>
          
          <div className="flex items-center p-4 bg-green-50 rounded-lg">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">📈</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Market analysis updated</p>
              <p className="text-sm text-gray-600">ROI predictions refreshed for Melbourne area</p>
            </div>
            <span className="text-sm text-gray-500">15 min ago</span>
          </div>
          
          <div className="flex items-center p-4 bg-purple-50 rounded-lg">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold">🤖</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">AI recommendation generated</p>
              <p className="text-sm text-gray-600">3 high-potential properties identified</p>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
