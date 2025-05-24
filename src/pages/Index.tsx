
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Calendar, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">TaskOrbit</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="outline">Login</Button>
            <Button asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Tenant Task Management
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Organize your teams, manage projects, and track progress across multiple organizations 
            with role-based access control and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/dashboard">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Multi-Tenant</CardTitle>
              <CardDescription>
                Manage multiple organizations with isolated data and role-based access control.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Task Tracking</CardTitle>
              <CardDescription>
                Create, assign, and track tasks with priorities, categories, and due dates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <Calendar className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Smart Scheduling</CardTitle>
              <CardDescription>
                Automatic task expiry detection with notifications for overdue items.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Comprehensive dashboards with task completion rates and team performance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Preview */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">See TaskOrbit in Action</h2>
            <p className="text-muted-foreground">
              Experience the power of organized team collaboration
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-8 text-center">
            <div className="bg-white rounded-lg p-6 inline-block">
              <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Interactive Dashboard Preview</h3>
              <p className="text-muted-foreground mb-4">
                Click below to explore the full dashboard with sample data
              </p>
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Organized?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of teams already using TaskOrbit to streamline their workflow.
          </p>
          <Button size="lg" className="text-lg px-8" asChild>
            <Link to="/dashboard">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">TaskOrbit</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 TaskOrbit. Built for modern teams.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
