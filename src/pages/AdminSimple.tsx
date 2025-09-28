import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

const AdminSimple = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Admin Panel - Simple Version
            </h1>
            <p className="text-xl text-muted-foreground">
              This is a simplified admin panel for testing
            </p>
          </div>

          {/* Test Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-card">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">0</h3>
                <p className="text-muted-foreground">Total Subscriptions</p>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">0</h3>
                <p className="text-muted-foreground">Active Subscriptions</p>
              </div>
            </Card>

            <Card className="p-6 shadow-card">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">0</h3>
                <p className="text-muted-foreground">Unsubscribed</p>
              </div>
            </Card>
          </div>

          {/* Test Content */}
          <Card className="shadow-card">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Admin Panel is Working!
              </h3>
              <p className="text-muted-foreground mb-4">
                If you can see this, the admin panel is loading correctly.
              </p>
              <Button className="bg-gradient-primary">
                Test Button
              </Button>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSimple;
