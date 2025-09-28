import React from 'react';

const AdminDebug = () => {
  console.log('🔍 AdminDebug component rendering...');
  
  try {
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
          🚀 Admin Panel Debug
        </h1>
        
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: '#374151', marginBottom: '15px' }}>
            ✅ Admin Panel is Working!
          </h2>
          
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            If you can see this message, the admin panel is loading correctly.
          </p>
          
          <div style={{
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#0c4a6e', marginBottom: '10px' }}>
              📊 Debug Information
            </h3>
            <ul style={{ color: '#0c4a6e', margin: 0, paddingLeft: '20px' }}>
              <li>Component: AdminDebug</li>
              <li>Status: Rendering Successfully</li>
              <li>Time: {new Date().toLocaleTimeString()}</li>
              <li>Error: None</li>
            </ul>
          </div>
          
          <button 
            onClick={() => {
              console.log('Button clicked!');
              alert('Button clicked! Admin panel is working.');
            }}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Test Button
          </button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in AdminDebug component:', error);
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#fef2f2', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#dc2626', textAlign: 'center' }}>
          ❌ Error in AdminDebug Component
        </h1>
        <p style={{ color: '#dc2626', textAlign: 'center' }}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
};

export default AdminDebug;
