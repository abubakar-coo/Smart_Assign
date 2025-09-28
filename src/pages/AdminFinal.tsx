import React, { useState, useEffect } from 'react';

const AdminFinal = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load emails from localStorage
  const loadEmails = () => {
    try {
      const stored = localStorage.getItem('emailSubscriptions');
      if (stored) {
        const parsed = JSON.parse(stored);
        setEmails(parsed);
      }
    } catch (error) {
      console.error('Error loading emails:', error);
    }
  };

  // Add test data
  const addTestData = () => {
    const testEmails = [
      { email: 'test1@example.com', id: '1', subscribedAt: new Date(), status: 'active', source: 'website' },
      { email: 'test2@example.com', id: '2', subscribedAt: new Date(), status: 'active', source: 'website' },
      { email: 'test3@example.com', id: '3', subscribedAt: new Date(), status: 'active', source: 'website' }
    ];
    
    const existing = localStorage.getItem('emailSubscriptions');
    const current = existing ? JSON.parse(existing) : [];
    const updated = [...current, ...testEmails];
    localStorage.setItem('emailSubscriptions', JSON.stringify(updated));
    setEmails(updated);
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      'Email,Status,Source,Subscribed At',
      ...emails.map(email => `${email.email},${email.status},${email.source},${email.subscribedAt}`)
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-subscriptions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Load emails on component mount
  useEffect(() => {
    loadEmails();
  }, []);

  // Filter emails based on search term
  const filteredEmails = emails.filter(email => 
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#1f2937', 
          marginBottom: '10px',
          fontWeight: 'bold'
        }}>
          🚀 Admin Panel
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280',
          marginBottom: '20px'
        }}>
          Email Subscriptions Management
        </p>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '30px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            backgroundColor: '#f0f9ff',
            padding: '15px 25px',
            borderRadius: '8px',
            border: '1px solid #0ea5e9'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0c4a6e' }}>
              {emails.length}
            </div>
            <div style={{ color: '#0c4a6e' }}>Total Emails</div>
          </div>
          <div style={{
            backgroundColor: '#f0fdf4',
            padding: '15px 25px',
            borderRadius: '8px',
            border: '1px solid #22c55e'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534' }}>
              {emails.filter(e => e.status === 'active').length}
            </div>
            <div style={{ color: '#166534' }}>Active</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '10px 15px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={addTestData}
          style={{
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Add Test Data
        </button>
        <button
          onClick={exportToCSV}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Export CSV
        </button>
      </div>

      {/* Email List */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#1f2937', 
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          Email Subscriptions ({filteredEmails.length})
        </h2>
        
        {filteredEmails.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📧</div>
            <div style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
              {searchTerm ? 'No emails found matching your search' : 'No subscriptions yet'}
            </div>
            {!searchTerm && (
              <button
                onClick={addTestData}
                style={{
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginTop: '15px'
                }}
              >
                Add Test Data
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Email</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Source</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Subscribed At</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((email, index) => (
                  <tr key={email.id || index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px', color: '#1f2937' }}>{email.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        backgroundColor: email.status === 'active' ? '#dcfce7' : '#fef2f2',
                        color: email.status === 'active' ? '#166534' : '#dc2626',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {email.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280', textTransform: 'capitalize' }}>
                      {email.source}
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>
                      {new Date(email.subscribedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFinal;

