import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ProfessionalSidebar from './components/ProfessionalSidebar';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({ status: 'all', type: 'all' });
  const [liveStats, setLiveStats] = useState({
    properties: 108,
    avgROI: '17.0%',
    totalValue: '$35.1M'
  });

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard filters={filters} liveStats={liveStats} />;
      case 'map-view':
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">Interactive Map</h2>
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <div className="text-xl font-semibold text-gray-700">Interactive Brevard County Map</div>
                <div className="text-gray-600 mt-2">Coming Soon - Full Mapbox Integration</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">{activeTab}</h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex bg-gray-100">
        <ProfessionalSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          liveStats={liveStats}
        />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-6 pb-6 pt-6">
            {renderMainContent()}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
