import { useState } from "react";
import { getAllJobApplications } from "../api/jobApplication";

const FileTest = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const apps = await getAllJobApplications();
      setApplications(apps);
      console.log('🔍 Loaded applications:', apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">File Test Page</h1>
      <button 
        onClick={loadApplications}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Loading...' : 'Load Applications'}
      </button>
      
      <div className="space-y-4">
        {applications.map((app, index) => (
          <div key={app.id || index} className="border p-4 rounded">
            <h3 className="font-bold">{app.fullName}</h3>
            <p>Email: {app.email}</p>
            <p>CV File: {app.cvFile ? 'Present' : 'Missing'}</p>
            <p>CV File Name: {app.cvFileName || 'None'}</p>
            <p>Payment Screenshot: {app.paymentScreenshot ? 'Present' : 'Missing'}</p>
            <p>Payment Screenshot Name: {app.paymentScreenshotName || 'None'}</p>
            
            {app.cvFile && (
              <div className="mt-2">
                <p className="text-green-600">✅ CV File Available</p>
                <a 
                  href={URL.createObjectURL(app.cvFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open CV
                </a>
              </div>
            )}
            
            {app.paymentScreenshot && (
              <div className="mt-2">
                <p className="text-green-600">✅ Payment Screenshot Available</p>
                <a 
                  href={URL.createObjectURL(app.paymentScreenshot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Open Screenshot
                </a>
                <img 
                  src={URL.createObjectURL(app.paymentScreenshot)}
                  alt="Payment Screenshot"
                  className="w-32 h-20 object-cover mt-2"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileTest;
