import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import ProfessionalSidebar from './components/ProfessionalSidebar';
import Dashboard from './components/Dashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [liveStats, setLiveStats] = useState({
    properties: 108,
    avgROI: '17.0%',
    totalValue: '$35.1M'
  });

  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard liveStats={liveStats} />;
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
