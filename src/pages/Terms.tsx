import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Recycle } from 'lucide-react';

export default function Terms() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

          <div className="prose prose-lg max-w-none text-foreground">
            <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using ScrapWise, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, you should not use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground">
              ScrapWise provides an online marketplace platform that connects scrap material sellers with buyers. Our AI-powered valuation system provides estimated prices for scrap materials based on image analysis and market data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground">
              To use our services, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">4. Buyer and Seller Responsibilities</h2>
            <p className="text-muted-foreground">
              <strong>Sellers:</strong> Must provide accurate descriptions and images of materials. Must honor agreed-upon prices and delivery terms. Must comply with all applicable laws regarding scrap material sales.
            </p>
            <p className="text-muted-foreground mt-4">
              <strong>Buyers:</strong> Must make payments as agreed. Must inspect materials upon delivery and report any issues within 48 hours. Must comply with all applicable laws regarding scrap material purchases.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">5. Fees and Payments</h2>
            <p className="text-muted-foreground">
              ScrapWise charges a platform fee of 2% on completed transactions. All fees are clearly disclosed before transaction completion. Payments are processed through secure third-party payment providers.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">6. AI Valuation Disclaimer</h2>
            <p className="text-muted-foreground">
              Our AI valuations are estimates based on image analysis and market data. Actual values may vary. Users should conduct their own due diligence before completing transactions.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">7. Dispute Resolution</h2>
            <p className="text-muted-foreground">
              In case of disputes between buyers and sellers, ScrapWise will provide mediation services. Our decisions in disputes are final and binding. We reserve the right to suspend accounts involved in repeated disputes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              ScrapWise is not liable for any indirect, incidental, or consequential damages arising from the use of our platform. Our liability is limited to the fees collected from the specific transaction in question.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">9. Modifications to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or platform notifications. Continued use of the platform after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at legal@scrapwise.com or through our Contact page.
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
