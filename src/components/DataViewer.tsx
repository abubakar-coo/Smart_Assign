import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllSubscriptions } from '../api/emailSubscription';
import { Mail, RefreshCw, Download } from 'lucide-react';

const DataViewer = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadEmails = async () => {
    setIsLoading(true);
    try {
      const data = await getAllSubscriptions();
      setEmails(data);
    } catch (error) {
      console.error('Error loading emails:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmails();
  }, []);

  const exportData = () => {
    const csvContent = [
      'Email,Subscribed Date,Status,Source',
      ...emails.map(email => 
        `${email.email},${email.subscribedAt.toLocaleDateString()},${email.status},${email.source}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `emails-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Mail className="w-5 h-5 mr-2" />
          Email Data ({emails.length})
        </h3>
        <div className="flex space-x-2">
          <Button 
            onClick={loadEmails} 
            disabled={isLoading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportData} size="sm" className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      ) : emails.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No emails found
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {emails.map((email, index) => (
            <div key={email.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">{email.email}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(email.subscribedAt).toLocaleDateString()} • {email.status}
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default DataViewer;
