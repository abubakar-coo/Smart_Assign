import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Cookie, Settings, Shield, Info } from "lucide-react";

const CookiePolicy = () => {
  const lastUpdated = "January 2025";

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 shadow-card">
            <div className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" />
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This Cookie Policy explains how Smart Assign uses cookies and similar technologies on our website and how you can manage your cookie preferences.
                </p>
              </div>

              {/* Types of Cookies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  Types of Cookies We Use
                </h2>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Essential Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies as they are essential for the website to work.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
                  <li><strong>Security Cookies:</strong> Help protect against fraud and maintain website security</li>
                  <li><strong>Authentication Cookies:</strong> Remember your login status and preferences</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Analytics and Performance Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Track page views and user navigation patterns</li>
                  <li>Measure website performance and loading times</li>
                  <li>Identify popular content and areas for improvement</li>
                  <li>Monitor error rates and technical issues</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Functionality Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Store information about your location or currency</li>
                  <li>Enable personalized content and features</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Marketing and Advertising Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They may also be used to limit the number of times you see an advertisement and measure the effectiveness of advertising campaigns.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Note:</strong> We currently do not use third-party advertising cookies, but this may change in the future.
                </p>
              </div>

              {/* Third-Party Cookies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Cookies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Some cookies on our website are set by third-party services. These may include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li><strong>Analytics Services:</strong> Tools like Google Analytics to understand website usage</li>
                  <li><strong>Payment Processors:</strong> Cookies from payment service providers when processing transactions</li>
                  <li><strong>Social Media:</strong> Cookies from social media platforms if you interact with social features</li>
                  <li><strong>Cloud Storage:</strong> Cookies from services like Supabase for file uploads and storage</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  These third parties have their own privacy policies and cookie practices. We encourage you to review their policies.
                </p>
              </div>

              {/* Cookie Duration */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Cookie Duration</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Session Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while browsing our website.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Persistent Cookies</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These cookies remain on your device for a set period or until you delete them. They help us recognize you when you return to our website and remember your preferences.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Persistent cookies typically expire after:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>30 days for preference cookies</li>
                  <li>90 days for analytics cookies</li>
                  <li>1 year for authentication cookies (if applicable)</li>
                </ul>
              </div>

              {/* Managing Cookies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Managing Your Cookie Preferences
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Browser Settings</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You can control cookies through your browser settings. Here are links to instructions for popular browsers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946f29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Important Notes</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Disabling essential cookies may affect website functionality</li>
                  <li>Some features may not work properly if cookies are disabled</li>
                  <li>You may need to re-enter information each time you visit if cookies are disabled</li>
                  <li>Cookie preferences are browser-specific, so you'll need to set them for each browser you use</li>
                </ul>
              </div>

              {/* Do Not Track */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Do Not Track Signals</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We do not currently respond to DNT browser signals. However, you can manage your cookie preferences through your browser settings as described above.
                </p>
              </div>

              {/* Updates to Policy */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Updates to This Cookie Policy</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page and updating the "Last Updated" date.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="bg-gradient-hero p-6 rounded-lg">
                  <p className="text-foreground font-semibold mb-2">Smart Assign</p>
                  <p className="text-muted-foreground mb-1">Email: <a href="mailto:smartassign01@gmail.com" className="text-primary hover:underline">smartassign01@gmail.com</a></p>
                  <p className="text-muted-foreground mb-1">Phone: <a href="tel:+923098091819" className="text-primary hover:underline">+92 3098091819</a></p>
                  <p className="text-muted-foreground">Website: <a href="/contact" className="text-primary hover:underline">Contact Page</a></p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CookiePolicy;

