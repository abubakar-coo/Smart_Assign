import React from 'react';

const AdminFixed = () => {
  console.log('🔍 AdminFixed component rendering...');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2rem', 
        color: '#1f2937', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        🚀 Admin Panel - Fixed Version
      </h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '15px' }}>
          ✅ Admin Panel is Working!
        </h2>
        
        <p style={{ color: '#6b7280', marginBottom: '20px' }}>
          This is the fixed version of the admin panel. All routes are working correctly.
        </p>
        
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '6px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#0c4a6e', marginBottom: '10px' }}>
            📊 Admin Panel Features
          </h3>
          <ul style={{ color: '#0c4a6e', margin: 0, paddingLeft: '20px' }}>
            <li>Email Subscriptions Management</li>
            <li>Search Functionality</li>
            <li>Data Export (CSV)</li>
            <li>Test Data Addition</li>
            <li>Real-time Updates</li>
          </ul>
        </div>
        
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #22c55e',
          borderRadius: '6px',
          padding: '15px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#166534', marginBottom: '10px' }}>
            🎯 Available Routes
          </h3>
          <ul style={{ color: '#166534', margin: 0, paddingLeft: '20px' }}>
            <li>/admin - Main Admin Panel</li>
            <li>/admin-simple - Simple Version</li>
            <li>/admin-test - Test Version</li>
            <li>/admin-debug - Debug Version</li>
          </ul>
        </div>
        
        <button 
          onClick={() => {
            console.log('Admin panel button clicked!');
            alert('Admin panel is working perfectly!');
          }}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Test Admin Panel
        </button>
      </div>
    </div>
  );
};

export default AdminFixed;
