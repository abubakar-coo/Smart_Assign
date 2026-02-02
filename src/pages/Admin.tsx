import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllSubscriptions } from "../api/emailSubscription";
import { getAllJobApplications } from "../api/jobApplication";
import { Mail, Users, XCircle, RefreshCw, CheckCircle, Briefcase, Eye, Send, Clock, DollarSign, User, FileText, MessageSquare, Lock } from "lucide-react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [subscriptions, setSubscriptions] = useState([]);
  const [jobApplications, setJobApplications] = useState([]);
  const [contactInquiries, setContactInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("subscriptions");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const savedLogin = localStorage.getItem('adminLogin');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
      loadSubscriptions();
      loadJobApplications();
      loadContactInquiries();
    }
  }, []);

  // Listen for career application submissions
  useEffect(() => {
    const handleCareerApplicationSubmitted = () => {
      console.log("🔄 Career application submitted event received, refreshing data...");
      loadJobApplications();
    };

    window.addEventListener('careerApplicationSubmitted', handleCareerApplicationSubmitted);
    
    return () => {
      window.removeEventListener('careerApplicationSubmitted', handleCareerApplicationSubmitted);
    };
  }, []);

  // Load subscriptions
  const loadSubscriptions = async () => {
    try {
      const data = await getAllSubscriptions();
      setSubscriptions(data);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
    }
  };

  // Load job applications
  const loadJobApplications = async () => {
    try {
      console.log("🔄 Starting to load job applications...");
      const data = await getAllJobApplications();
      console.log("🔍 Raw data from getAllJobApplications:", data);
      console.log("🔍 Data type:", typeof data);
      console.log("🔍 Is array:", Array.isArray(data));
      console.log("🔍 Data length:", data ? data.length : 'undefined');
      
      if (data && Array.isArray(data)) {
        console.log("✅ Valid data received, setting state...");
        setJobApplications(data);
        console.log("✅ Job applications state updated");
        console.log("🔍 Final state check - jobApplications length:", data.length);
      } else {
        console.log("⚠️ Invalid data received, setting empty array");
        setJobApplications([]);
      }
    } catch (error) {
      console.error('❌ Error loading job applications:', error);
      setJobApplications([]);
    }
  };

  // Load contact inquiries
  const loadContactInquiries = () => {
    try {
      const data = JSON.parse(localStorage.getItem('contactInquiries') || '[]');
      console.log("🔍 Loading contact inquiries:", data);
      setContactInquiries(data);
    } catch (error) {
      console.error('Error loading contact inquiries:', error);
    }
  };

  // Debug logs
  console.log("🔍 All job applications:", jobApplications);
  console.log("🔍 Contact inquiries state:", contactInquiries);
  console.log("🔍 Total applications count:", jobApplications.length);
  console.log("🔍 Contact inquiries count:", contactInquiries.length);
  console.log("🔍 Job applications type:", typeof jobApplications);
  console.log("🔍 Job applications is array:", Array.isArray(jobApplications));
  console.log("🔍 Job applications from careers-page:", jobApplications.filter(app => app.source === 'careers-page'));
  console.log("🔍 Job applications from contact-form:", jobApplications.filter(app => app.source === 'contact-form'));
  
  // CV File debug logs
  jobApplications.forEach((app, index) => {
    console.log(`🔍 Application ${index}:`, {
      id: app.id,
      fullName: app.fullName,
      cvFile: app.cvFile,
      cvFileName: app.cvFileName,
      hasCvFile: !!app.cvFile,
      cvFileType: typeof app.cvFile,
      cvFileInstance: app.cvFile instanceof File
    });
  });

  // Handle login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'smartassign2024') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLogin', 'true');
      loadSubscriptions();
      loadJobApplications();
      loadContactInquiries();
    } else {
      alert('Invalid credentials');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLogin');
    setLoginData({ username: "", password: "" });
  };

  // Handle application status change
  const confirmApplication = (application, status) => {
    // Update application status logic here
    console.log(`Application ${application.id} ${status}`);
    setShowApplicationModal(false);
    setSelectedApplication(null);
    loadJobApplications(); // Reload data
  };

  // View application details
  const viewApplication = (application) => {
    setSelectedApplication(application);
    setShowApplicationModal(true);
  };

  const viewContactInquiry = (inquiry) => {
    setSelectedApplication(inquiry);
    setShowApplicationModal(true);
  };

  // Listen for contact form submissions and career applications
  useEffect(() => {
    const handleContactFormSubmitted = () => {
      console.log("🔍 Contact form submitted, refreshing admin data...");
      // Force reload with a small delay to ensure data is saved
      setTimeout(() => {
        loadJobApplications();
        loadContactInquiries();
        console.log("🔄 Data reloaded after contact form submission");
      }, 500);
    };

    const handleCareerApplicationSubmitted = () => {
      console.log("🔍 Career application submitted, refreshing admin data...");
      // Force reload with a small delay to ensure data is saved
      setTimeout(() => {
        loadJobApplications();
        loadContactInquiries();
        console.log("🔄 Data reloaded after career application submission");
      }, 500);
    };

    window.addEventListener('contactFormSubmitted', handleContactFormSubmitted);
    window.addEventListener('careerApplicationSubmitted', handleCareerApplicationSubmitted);

    return () => {
      window.removeEventListener('contactFormSubmitted', handleContactFormSubmitted);
      window.removeEventListener('careerApplicationSubmitted', handleCareerApplicationSubmitted);
    };
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
              <p className="text-muted-foreground mt-2">Enter your credentials to access the admin panel</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="mt-1"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="mt-1"
                  placeholder="Enter password"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                Login
              </Button>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage subscriptions and job applications</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={() => {
                console.log("🔄 Manual refresh triggered");
                loadSubscriptions();
                loadJobApplications();
                loadContactInquiries();
              }} 
              className="bg-green-500 hover:bg-green-600 text-white flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh All
            </Button>
            <Button 
              onClick={() => {
                console.log("🔄 Force reload localStorage data");
                const localData = localStorage.getItem('jobApplications');
                console.log("📊 Raw localStorage data:", localData);
                if (localData) {
                  const parsedData = JSON.parse(localData);
                  console.log("📋 Parsed localStorage data:", parsedData);
                  setJobApplications(parsedData);
                }
              }} 
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Force Reload
            </Button>
            <Button 
              onClick={() => {
                console.log("🗑️ Clearing all application data...");
                localStorage.removeItem('jobApplications');
                localStorage.removeItem('contactInquiries');
                setJobApplications([]);
                setContactInquiries([]);
                console.log("✅ All data cleared successfully");
                console.log("🔍 Job applications after clear:", jobApplications);
                console.log("🔍 Contact inquiries after clear:", contactInquiries);
                alert("All application data has been cleared!");
              }} 
              className="bg-red-500 hover:bg-red-600 text-white flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-muted/50 p-1 rounded-lg">
          <Button
            variant={activeTab === "subscriptions" ? "default" : "ghost"}
            onClick={() => setActiveTab("subscriptions")}
            className="flex items-center"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email Subscriptions ({subscriptions.length})
          </Button>
          <Button
            variant={activeTab === "applications" ? "default" : "ghost"}
            onClick={() => setActiveTab("applications")}
            className="flex items-center"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Job Applications ({jobApplications.length})
          </Button>
          <Button
            variant={activeTab === "contact" ? "default" : "ghost"}
            onClick={() => setActiveTab("contact")}
            className="flex items-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Inquiries ({contactInquiries.length})
          </Button>
        </div>

        {/* Content */}
        {activeTab === "subscriptions" && (
          <Card className="shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Email Subscriptions
              </h3>
              {subscriptions.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No subscriptions yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Subscribed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptions.map((sub, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-foreground">{sub.email}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(sub.subscribedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        )}

        {activeTab === "applications" && (
          <Card className="shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Job Applications ({jobApplications.length})
              </h3>
              
              
              {jobApplications.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No applications yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Position</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Country</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Experience</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Skills</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">CV File</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Payment</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Payment SS</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobApplications.map((app, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-foreground">{app.fullName}</td>
                          <td className="py-3 px-4 text-foreground">{app.position}</td>
                          <td className="py-3 px-4 text-foreground">{app.email}</td>
                          <td className="py-3 px-4 text-foreground">{app.country}</td>
                          <td className="py-3 px-4 text-foreground">{app.experience ? `${app.experience} years` : '-'}</td>
                          <td className="py-3 px-4 text-foreground max-w-xs truncate" title={app.skills || ''}>
                            {app.skills || '-'}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {app.cvFile ? (
                              <span className="text-green-600 text-sm">✓ {app.cvFile.name || app.cvFileName}</span>
                            ) : app.cvFileName ? (
                              <span className="text-blue-600 text-sm">📄 {app.cvFileName}</span>
                            ) : (
                              <span className="text-gray-400 text-sm">No CV</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {app.paymentMethod ? (
                              <span className="text-blue-600 text-sm">
                                {app.paymentMethod === 'wallet' ? '🔗 Wallet' : 
                                 app.paymentMethod === 'meezanbank' ? '🏦 Meezan Bank' :
                                 app.paymentMethod === 'easypaisa' ? '📱 EasyPaisa' :
                                 app.paymentMethod === 'jazzcash' ? '📱 JazzCash' :
                                 app.paymentMethod}
                              </span>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {app.paymentScreenshot ? (
                              <span className="text-green-600 text-sm">✓ {app.paymentScreenshot.name || app.paymentScreenshotName}</span>
                            ) : app.paymentScreenshotName ? (
                              <span className="text-blue-600 text-sm">📸 {app.paymentScreenshotName}</span>
                            ) : (
                              <span className="text-gray-400 text-sm">No SS</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status || 'pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewApplication(app)}
                              className="flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        )}

        {activeTab === "contact" && (
          <Card className="shadow-card">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold text-foreground">
                  Contact Form Inquiries ({contactInquiries.length})
                </h3>
                <Button onClick={() => {
                  localStorage.removeItem('contactInquiries');
                  loadContactInquiries();
                }} className="bg-red-500 hover:bg-red-600">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Data
                </Button>
              </div>

              {contactInquiries.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-2">No Contact Inquiries Yet</h4>
                  <p className="text-muted-foreground mb-6">
                    Contact form submissions will appear here when users submit inquiries.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Phone</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Subject</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Message</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Submitted At</th>
                        <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contactInquiries.map((inquiry, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                          <td className="py-3 px-4 text-foreground font-medium">{inquiry.fullName}</td>
                          <td className="py-3 px-4 text-foreground">{inquiry.email}</td>
                          <td className="py-3 px-4 text-foreground">{inquiry.phone}</td>
                          <td className="py-3 px-4 text-foreground">{inquiry.subject}</td>
                          <td className="py-3 px-4 text-foreground max-w-xs truncate">{inquiry.message}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(inquiry.submittedAt).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewContactInquiry(inquiry)}
                              className="flex items-center hover:bg-primary hover:text-primary-foreground"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Application Details Modal */}
        {showApplicationModal && selectedApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedApplication.source === 'contact-form' ? 'Contact Inquiry Details' : 'Application Details'}
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      {selectedApplication.source === 'contact-form' ? 'Contact Form Submission' : 'Job Application'} • 
                      {selectedApplication.source === 'contact-form' ? ' Submitted' : ' Applied'} {new Date(selectedApplication.appliedAt || selectedApplication.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowApplicationModal(false)}
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                        <p className="text-foreground">{selectedApplication.fullName}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                        <p className="text-foreground">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                        <p className="text-foreground">{selectedApplication.phone}</p>
                      </div>
                      {selectedApplication.source !== 'contact-form' && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Country</Label>
                          <p className="text-foreground">{selectedApplication.country}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {selectedApplication.source === 'contact-form' ? 'Inquiry Details' : 'Application Details'}
                    </h3>
                    <div className="space-y-3">
                      {selectedApplication.source === 'contact-form' ? (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Subject</Label>
                            <p className="text-foreground">{selectedApplication.subject}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Message</Label>
                            <p className="text-foreground whitespace-pre-wrap">{selectedApplication.message}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Position</Label>
                            <p className="text-foreground">{selectedApplication.position}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                            <p className="text-foreground">{selectedApplication.experience}</p>
                          </div>
                        </>
                      )}
                      {selectedApplication.source !== 'contact-form' && (
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Skills</Label>
                          <p className="text-foreground">{selectedApplication.skills}</p>
                        </div>
                      )}
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">Source</Label>
                        <p className="text-foreground">{selectedApplication.source}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedApplication.source !== 'contact-form' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Cover Letter</h3>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                {selectedApplication.source !== 'contact-form' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Payment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Payment Method</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedApplication.paymentMethod === 'wallet' ? 'Payoneer' : 
                           selectedApplication.paymentMethod === 'meezanbank' ? '🏦 Meezan Bank' :
                           selectedApplication.paymentMethod === 'easypaisa' ? '📱 EasyPaisa' :
                           selectedApplication.paymentMethod === 'jazzcash' ? '📱 JazzCash' :
                           selectedApplication.paymentMethod || 'Not specified'}
                        </p>
                      </div>
                      
                      {selectedApplication.paymentMethod === 'wallet' && (
                        <>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Wallet Address</h4>
                            <p className="text-sm text-muted-foreground break-all">
                              {selectedApplication.walletAddress || 'Not provided'}
                            </p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Network</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedApplication.network || 'Not specified'}
                            </p>
                          </div>
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Coin</h4>
                            <p className="text-sm text-muted-foreground">
                              {selectedApplication.coin || 'Not specified'}
                            </p>
                          </div>
                        </>
                      )}
                      
                      {selectedApplication.transactionId && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">Transaction ID</h4>
                          <p className="text-sm text-muted-foreground break-all">
                            {selectedApplication.transactionId}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* File Attachments */}
                {selectedApplication.source !== 'contact-form' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">File Attachments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* CV File */}
                      {selectedApplication.cvFile ? (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            CV Document
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {selectedApplication.cvFile.name || selectedApplication.cvFileName || 'CV File'}
                          </p>
                          <p className="text-xs text-blue-500 mb-3">
                            File Size: {selectedApplication.cvFile.size ? `${(selectedApplication.cvFile.size / 1024).toFixed(1)} KB` : 'Unknown'}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Check if it's a File object or URL
                                if (selectedApplication.cvFile instanceof File) {
                                  const url = URL.createObjectURL(selectedApplication.cvFile);
                                  window.open(url, '_blank');
                                } else if (selectedApplication.cvFile?.url) {
                                  window.open(selectedApplication.cvFile.url, '_blank');
                                }
                              }}
                              className="flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View File
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Check if it's a File object or URL
                                if (selectedApplication.cvFile instanceof File) {
                                  const url = URL.createObjectURL(selectedApplication.cvFile);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = selectedApplication.cvFile.name || selectedApplication.cvFileName || 'cv.pdf';
                                  a.click();
                                } else if (selectedApplication.cvFile?.url) {
                                  const a = document.createElement('a');
                                  a.href = selectedApplication.cvFile.url;
                                  a.download = selectedApplication.cvFileName || 'cv.pdf';
                                  a.click();
                                }
                              }}
                              className="flex items-center"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ) : selectedApplication.cvFileName ? (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            CV Document
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {selectedApplication.cvFileName}
                          </p>
                          <p className="text-xs text-orange-500">File stored in database (not available for download)</p>
                        </div>
                      ) : (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            CV Document
                          </h4>
                          <p className="text-sm text-muted-foreground">No CV file uploaded</p>
                        </div>
                      )}

                      {/* Payment Screenshot */}
                      {selectedApplication.paymentScreenshot && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2 flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment Screenshot
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {selectedApplication.paymentScreenshotName || 'Payment Screenshot'}
                          </p>
                          <div className="mb-3">
                            <img
                              src={
                                selectedApplication.paymentScreenshot instanceof File 
                                  ? URL.createObjectURL(selectedApplication.paymentScreenshot)
                                  : selectedApplication.paymentScreenshot?.url || ''
                              }
                              alt="Payment Screenshot"
                              className="w-full h-32 object-cover rounded border"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-32 bg-muted flex items-center justify-center rounded border">
                                      <div class="text-center text-muted-foreground">
                                        <FileText class="w-8 h-8 mx-auto mb-2" />
                                        <p class="text-sm">File Preview Not Available</p>
                                      </div>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Check if it's a File object or URL
                                if (selectedApplication.paymentScreenshot instanceof File) {
                                  const url = URL.createObjectURL(selectedApplication.paymentScreenshot);
                                  window.open(url, '_blank');
                                } else if (selectedApplication.paymentScreenshot?.url) {
                                  window.open(selectedApplication.paymentScreenshot.url, '_blank');
                                }
                              }}
                              className="flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View Image
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Check if it's a File object or URL
                                if (selectedApplication.paymentScreenshot instanceof File) {
                                  const url = URL.createObjectURL(selectedApplication.paymentScreenshot);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = selectedApplication.paymentScreenshotName || 'payment-screenshot.png';
                                  a.click();
                                } else if (selectedApplication.paymentScreenshot?.url) {
                                  const a = document.createElement('a');
                                  a.href = selectedApplication.paymentScreenshot.url;
                                  a.download = selectedApplication.paymentScreenshotName || 'payment-screenshot.png';
                                  a.click();
                                }
                              }}
                              className="flex items-center"
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* No files message */}
                      {!selectedApplication.cvFile && !selectedApplication.paymentScreenshot && (
                        <div className="col-span-2 text-center py-8 text-muted-foreground">
                          <FileText className="w-12 h-12 mx-auto mb-4" />
                          <p>No files attached</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedApplication.source !== 'contact-form' && (
                  <div className="flex justify-end space-x-2 mt-6">
                    <Button
                      onClick={() => confirmApplication(selectedApplication, 'approved')}
                      className="bg-green-500 hover:bg-green-600 flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => confirmApplication(selectedApplication, 'rejected')}
                      variant="destructive"
                      className="flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
