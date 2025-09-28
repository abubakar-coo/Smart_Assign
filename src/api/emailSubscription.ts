// Email Subscription API
export interface EmailSubscription {
  id: string;
  email: string;
  subscribedAt: Date;
  status: 'active' | 'unsubscribed';
  source: 'website' | 'newsletter' | 'contact';
}

// Mock database - in real app, this would be a real database
let emailSubscriptions: EmailSubscription[] = [];

// Load from localStorage on startup
const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem('emailSubscriptions');
    if (stored) {
      emailSubscriptions = JSON.parse(stored).map((item: any) => ({
        ...item,
        subscribedAt: new Date(item.subscribedAt)
      }));
      console.log('📥 Loaded emails from storage:', emailSubscriptions.length);
    }
  } catch (error) {
    console.error('Error loading from storage:', error);
  }
};

// Load data on module load
loadFromStorage();

// Save email to database
export const saveEmailSubscription = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address' };
    }

    // Check if email already exists
    const existingEmail = emailSubscriptions.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (existingEmail) {
      return { success: false, message: 'This email is already subscribed' };
    }

    // Create new subscription
    const newSubscription: EmailSubscription = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      subscribedAt: new Date(),
      status: 'active',
      source: 'website'
    };

    // Save to database
    emailSubscriptions.push(newSubscription);

    // Debug logging
    console.log('✅ Email saved to database:', newSubscription);
    console.log('📊 Total subscriptions:', emailSubscriptions.length);
    console.log('📋 All emails:', emailSubscriptions);
    
    // Also save to localStorage for persistence
    localStorage.setItem('emailSubscriptions', JSON.stringify(emailSubscriptions));

    return { success: true, message: 'Successfully subscribed! Thank you for joining us.' };
  } catch (error) {
    console.error('Error saving email:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

// Get all subscriptions (for admin)
export const getAllSubscriptions = async (): Promise<EmailSubscription[]> => {
  return emailSubscriptions;
};

// Get subscription count
export const getSubscriptionCount = async (): Promise<number> => {
  return emailSubscriptions.length;
};

// Unsubscribe email
export const unsubscribeEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  try {
    const subscription = emailSubscriptions.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (!subscription) {
      return { success: false, message: 'Email not found' };
    }

    subscription.status = 'unsubscribed';
    return { success: true, message: 'Successfully unsubscribed' };
  } catch (error) {
    console.error('Error unsubscribing email:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
