// Data dekne ke liye utility function
import { getAllSubscriptions } from '../api/emailSubscription';

// Console mein data show karne ke liye
export const showAllEmails = async () => {
  try {
    const emails = await getAllSubscriptions();
    console.log('📧 All Email Subscriptions:');
    console.table(emails);
    console.log(`Total: ${emails.length} emails`);
    return emails;
  } catch (error) {
    console.error('Error loading emails:', error);
  }
};

// Browser console mein use karne ke liye
window.showEmails = showAllEmails;
