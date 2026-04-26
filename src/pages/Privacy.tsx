import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Recycle } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ScrapWise</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-lg max-w-none text-foreground">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground">
              <strong>Personal Information:</strong> Name, email address, phone number, and address when you create an account.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Transaction Data:</strong> Details of listings, purchases, and payments made through our platform.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Usage Data:</strong> How you interact with our platform, including pages visited and features used.
            </p>
            <p className="text-muted-foreground mt-2">
              <strong>Device Information:</strong> IP address, browser type, and device identifiers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Provide and improve our services</li>
              <li>Process transactions and send related notifications</li>
              <li>Communicate with you about your account and orders</li>
              <li>Send promotional content (with your consent)</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Other users (as necessary for transactions)</li>
              <li>Service providers who help operate our platform</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement industry-standard security measures including encryption, secure servers, and access controls. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Opt out of marketing communications</li>
              <li>Export your data</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your data for as long as your account is active or as needed to provide services. We may retain certain information as required by law or for legitimate business purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy periodically. We will notify you of significant changes via email or platform notification.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              For privacy-related questions, contact our Data Protection Officer at privacy@scrapwise.com or through our Contact page.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border/50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Recycle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">ScrapWise</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
            <Link to="/faq" className="hover:text-foreground">FAQ</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
