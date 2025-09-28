export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  skills: string;
  coverLetter: string;
  resume: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected' | 'confirmed';
  source: 'careers-page' | 'direct-apply' | 'get-started-button' | 'contact-form';
  // Additional fields for multi-step form
  country?: string;
  cvFile?: File;
  cvFileName?: string;
  paymentMethod?: string;
  walletAddress?: string;
  network?: string;
  coin?: string;
  paymentScreenshot?: File;
  paymentScreenshotName?: string;
  transactionId?: string;
}

// Mock database - in real app, this would be a real database
let jobApplications: JobApplication[] = [];

// In-memory file storage for current session
const fileStorage = new Map<string, { cvFile?: File; paymentScreenshot?: File }>();

// Load from localStorage on startup
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('jobApplications');
    if (stored) {
      jobApplications = JSON.parse(stored).map((item: any) => ({
        ...item,
        appliedAt: new Date(item.appliedAt),
        // Note: File objects cannot be stored in localStorage, so they will be undefined
        cvFile: undefined,
        paymentScreenshot: undefined
      }));
      console.log('📥 Loaded job applications from storage:', jobApplications.length);
    }
  } catch (error) {
    console.error('Error loading job applications from storage:', error);
  }
};

// Load data on module load
loadFromStorage();

// Save job application to database
export const saveJobApplication = async (applicationData: any): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate required fields
    if (!applicationData.fullName || !applicationData.email || !applicationData.phone) {
      return { success: false, message: 'Please fill in all required fields' };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Try to save to Supabase database first
    try {
      console.log('🔄 Attempting to save to Supabase database...');
      const { saveJobApplication: saveToSupabase } = await import('./database');
      const result = await saveToSupabase(applicationData);
      console.log('📊 Supabase save result:', result);
      
      if (result.success) {
        console.log('✅ Successfully saved to Supabase database');
        return result;
      } else {
        console.log('❌ Supabase save failed, falling back to localStorage');
        throw new Error(result.message);
      }
    } catch (dbError) {
      console.warn('⚠️ Supabase database not available, falling back to localStorage:', dbError);
      
      // Fallback to localStorage
      console.log('🔄 Falling back to localStorage...');
      console.log('🔍 Checking for existing applications with email:', applicationData.email);
      console.log('📊 Current applications in memory:', jobApplications.length);
      console.log('📋 Existing applications:', jobApplications.map(app => ({ id: app.id, email: app.email, fullName: app.fullName })));
      
      const existingApplication = jobApplications.find(app => app.email.toLowerCase() === applicationData.email.toLowerCase());
      if (existingApplication) {
        console.log('❌ Application already exists with this email:', existingApplication);
        console.log('🔄 Updating existing application instead of creating new one...');
        
        // Update existing application instead of creating new one
        const updatedApplication = {
          ...existingApplication,
          ...applicationData,
          appliedAt: new Date(),
          status: 'pending'
        };
        
        const index = jobApplications.findIndex(app => app.id === existingApplication.id);
        jobApplications[index] = updatedApplication;
        localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
        
        console.log('✅ Existing application updated successfully');
        return { success: true, message: 'Application updated successfully!' };
      }

      // Create new application
      const newApplication: JobApplication = {
        id: Date.now().toString(),
        ...applicationData,
        appliedAt: new Date(),
        status: 'pending',
        source: applicationData.source || 'careers-page'
      };

      console.log('📝 Creating new application:', newApplication);

      // Store files in memory for current session
      if (applicationData.cvFile || applicationData.paymentScreenshot) {
        console.log('💾 Storing files for application:', newApplication.id);
        console.log('📄 CV File:', applicationData.cvFile);
        console.log('📸 Payment Screenshot:', applicationData.paymentScreenshot);
        fileStorage.set(newApplication.id, {
          cvFile: applicationData.cvFile,
          paymentScreenshot: applicationData.paymentScreenshot
        });
        console.log('✅ Files stored in memory storage');
      } else {
        console.log('⚠️ No files to store for application:', newApplication.id);
      }

      // Save to localStorage
      jobApplications.push(newApplication);
      localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
      
      console.log('📊 Total applications in localStorage:', jobApplications.length);
      console.log('📋 All applications:', jobApplications);

      console.log('✅ Job application saved to localStorage (fallback):', newApplication);
      return { success: true, message: 'Application submitted successfully! We will review your application and get back to you soon.' };
    }
  } catch (error) {
    console.error('Error saving job application:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

// Get all job applications
export const getAllJobApplications = async (): Promise<JobApplication[]> => {
  try {
    console.log('🔄 getAllJobApplications called');
    
    // Always load fresh data from localStorage
    console.log('🔄 Loading fresh data from localStorage...');
    const localData = localStorage.getItem('jobApplications');
    console.log('📊 Raw localStorage data:', localData);
    
    if (localData) {
      try {
        const parsedData = JSON.parse(localData);
        console.log('📋 Parsed localStorage data:', parsedData);
        console.log('📊 Parsed data length:', parsedData.length);
        console.log('📋 Data type check:', typeof parsedData, Array.isArray(parsedData));
        
        // Convert to proper format
        const applications = parsedData.map((app: any) => ({
          ...app,
          appliedAt: new Date(app.appliedAt),
          // Files will be attached from memory storage if available
          cvFile: undefined,
          paymentScreenshot: undefined
        }));
        
        // Attach file objects from memory storage
        const applicationsWithFiles = applications.map((app: any) => {
          const files = fileStorage.get(app.id);
          console.log('📋 Loading application:', app.id, 'Files available:', !!files);
          console.log('📁 CV File in memory:', files?.cvFile ? files.cvFile.name : 'No CV file');
          console.log('📸 Payment Screenshot in memory:', files?.paymentScreenshot ? files.paymentScreenshot.name : 'No payment screenshot');
          return {
            ...app,
            cvFile: files?.cvFile,
            paymentScreenshot: files?.paymentScreenshot
          };
        });
        
        console.log('📊 Total applications with files:', applicationsWithFiles.length);
        console.log('📋 Final applications data:', applicationsWithFiles);
        return applicationsWithFiles;
      } catch (parseError) {
        console.error('❌ Error parsing localStorage data:', parseError);
        return [];
      }
    } else {
      console.log('⚠️ No data in localStorage');
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching job applications:', error);
    return [];
  }
};

// Get job application count
export const getJobApplicationCount = async (): Promise<{ total: number; pending: number; reviewed: number; accepted: number; rejected: number }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const total = jobApplications.length;
      const pending = jobApplications.filter(app => app.status === 'pending').length;
      const reviewed = jobApplications.filter(app => app.status === 'reviewed').length;
      const accepted = jobApplications.filter(app => app.status === 'accepted').length;
      const rejected = jobApplications.filter(app => app.status === 'rejected').length;
      resolve({ total, pending, reviewed, accepted, rejected });
    }, 500); // Simulate API call delay
  });
};

// Update application status
export const updateApplicationStatus = async (id: string, status: JobApplication['status']): Promise<{ success: boolean; message: string }> => {
  try {
    const application = jobApplications.find(app => app.id === id);
    if (!application) {
      return { success: false, message: 'Application not found' };
    }

    application.status = status;
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
    
    return { success: true, message: 'Application status updated successfully' };
  } catch (error) {
    console.error('Error updating application status:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
