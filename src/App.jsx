import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ArrayVisualization from './components/ArrayVisualization';
import LinkedListVisualization from './components/LinkedListVisualization';
import StackVisualization from './components/StackVisualization';
import QueueVisualization from './components/QueueVisualization';
import SortingVisualization from './components/SortingVisualization';
import SearchingVisualization from './components/SearchingVisualization';
import TreeVisualization from './components/TreeVisualization';
import GraphVisualization from './components/GraphVisualization';
import DPVisualization from './components/DPVisualization';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      case 'array':
        return <ArrayVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'linkedlist':
        return <LinkedListVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'stack':
        return <StackVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'queue':
        return <QueueVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'sorting':
        return <SortingVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'searching':
        return <SearchingVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'trees':
        return <TreeVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'graphs':
        return <GraphVisualization onBack={() => setCurrentView('dashboard')} />;
      case 'dp':
        return <DPVisualization onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
    </div>
  );
}

export default App;