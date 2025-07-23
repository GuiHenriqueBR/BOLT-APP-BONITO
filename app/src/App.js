import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;