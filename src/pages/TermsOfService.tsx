import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const TermsOfService = () => {
  const lastUpdated = "January 2025";

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-hero py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Terms of Service
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
                  <FileText className="w-6 h-6 text-primary" />
                  Agreement to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to Smart Assign. These Terms of Service ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services") provided by Smart Assign.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Your continued use of our Services after any changes constitutes acceptance of the updated Terms.
                </p>
              </div>

              {/* Services Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Smart Assign provides professional micro-services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>SEO Content Writing</li>
                  <li>Data Entry and Management</li>
                  <li>Research Assistance</li>
                  <li>Proofreading & Editing</li>
                  <li>Canva Designing</li>
                  <li>Typing & Formatting</li>
                  <li>Assignment Writing</li>
                  <li>Literature Review</li>
                  <li>Presentation Design</li>
                  <li>Resume & Cover Letter Writing</li>
                  <li>Academic Formatting</li>
                  <li>Virtual Assistance</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue any service at any time without prior notice.
                </p>
              </div>

              {/* User Accounts */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">User Accounts and Registration</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To use certain features of our Services, you may be required to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your information to keep it accurate</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>

              {/* Payment Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Payment Terms</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Payment Requirements</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>All services require a 50% advance payment before work begins</li>
                  <li>Remaining balance is due upon project completion and delivery</li>
                  <li>Payment methods accepted: JazzCash, Easypaisa, Meezan Bank (Pakistan), Payoneer (International)</li>
                  <li>All prices are in USD unless otherwise specified (Pakistan: PKR)</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Refund Policy</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Refunds are considered on a case-by-case basis</li>
                  <li>If work has not commenced, full refund may be provided</li>
                  <li>If work has begun, refund amount will be prorated based on work completed</li>
                  <li>No refunds for completed and delivered work unless there is a material breach of service agreement</li>
                  <li>Refund requests must be submitted within 7 days of service delivery</li>
                </ul>
              </div>

              {/* Service Delivery */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Service Delivery and Timelines</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <CheckCircle className="w-5 h-5 inline text-primary mr-2" />
                  We strive to deliver services within the agreed timelines. Delivery times vary by service type and project complexity.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <CheckCircle className="w-5 h-5 inline text-primary mr-2" />
                  Clients will receive deliverables via email or through our designated communication channels.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <CheckCircle className="w-5 h-5 inline text-primary mr-2" />
                  Revisions are included within the scope of work as specified in the service agreement.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <XCircle className="w-5 h-5 inline text-red-500 mr-2" />
                  We are not responsible for delays caused by client's failure to provide necessary information or materials.
                </p>
              </div>

              {/* Intellectual Property */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property Rights</h2>
                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Client Content</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You retain ownership of any content, materials, or information you provide to us. By submitting content, you grant us a license to use, modify, and display such content solely for the purpose of providing our services.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Deliverables</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Upon full payment, you receive ownership rights to the deliverables created specifically for you. We retain the right to use completed work for portfolio and marketing purposes unless otherwise agreed in writing.
                </p>

                <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Our Intellectual Property</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All website content, designs, logos, trademarks, and proprietary materials are owned by Smart Assign and protected by intellectual property laws.
                </p>
              </div>

              {/* Prohibited Uses */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-primary" />
                  Prohibited Uses
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You agree not to use our Services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>For any illegal or unauthorized purpose</li>
                  <li>To violate any laws, regulations, or third-party rights</li>
                  <li>To transmit viruses, malware, or harmful code</li>
                  <li>To interfere with or disrupt our Services or servers</li>
                  <li>To attempt unauthorized access to our systems</li>
                  <li>To use automated systems to access our Services without permission</li>
                  <li>To impersonate others or provide false information</li>
                  <li>To request services that violate academic integrity policies (e.g., completing exams, taking classes on your behalf)</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Our Services are provided "as is" and "as available" without warranties of any kind</li>
                  <li>We do not guarantee that our Services will be uninterrupted, error-free, or secure</li>
                  <li>We are not liable for any indirect, incidental, special, consequential, or punitive damages</li>
                  <li>Our total liability shall not exceed the amount you paid for the specific service in question</li>
                  <li>We are not responsible for any loss or damage resulting from your use of deliverables</li>
                </ul>
              </div>

              {/* Dispute Resolution */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any concerns or disputes regarding our Services, please contact us first. We will work in good faith to resolve the issue.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Any disputes that cannot be resolved through direct communication may be subject to binding arbitration or resolved in the courts of Pakistan, as applicable.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We reserve the right to suspend or terminate your access to our Services at any time, with or without cause or notice, for any reason including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Non-payment of fees</li>
                  <li>Any other reason we deem necessary</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  You may terminate your use of our Services at any time by discontinuing use and notifying us.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may modify these Terms at any time. Material changes will be communicated through our website or via email. Your continued use of our Services after changes become effective constitutes acceptance of the modified Terms.
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gradient-hero p-6 rounded-lg">
                  <p className="text-foreground font-semibold mb-2">Smart Assign</p>
                  <p className="text-muted-foreground mb-1">Email: <a href="mailto:smartassignmentofficial@gmail.com" className="text-primary hover:underline">smartassignmentofficial@gmail.com</a></p>
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

export default TermsOfService;

