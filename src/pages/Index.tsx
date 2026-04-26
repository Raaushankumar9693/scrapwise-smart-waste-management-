import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Recycle, 
  ArrowRight, 
  Camera, 
  TrendingUp, 
  Shield, 
  Zap,
  Users,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: 'AI Image Recognition',
    description: 'Upload a photo and our AI instantly identifies material type, quality grade, and contamination levels.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Price Prediction',
    description: 'ML-powered valuation considers material type, quality, weight, and real-time market rates.',
  },
  {
    icon: Shield,
    title: 'Transparent Trading',
    description: 'Fair, scientific pricing eliminates negotiation friction and builds trust between buyers and sellers.',
  },
  {
    icon: Zap,
    title: 'Instant Valuations',
    description: 'Get accurate price estimates in seconds, not hours. List and sell faster than ever before.',
  },
];

const stats = [
  { value: '50K+', label: 'Active Users' },
  { value: '₹2Cr+', label: 'Monthly Transactions' },
  { value: '95%', label: 'Valuation Accuracy' },
  { value: '24/7', label: 'AI Support' },
];

const materials = ['Metal', 'Copper', 'Aluminum', 'E-Waste', 'Paper', 'Plastic', 'Glass', 'Rubber'];

export default function Index() {
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-primary/30 blur-3xl animate-float" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-accent/30 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-foreground/90 mb-8 opacity-0 animate-fade-in">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Scrap Valuation Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transform Scrap Into
              <span className="block text-gradient">Fair Value</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Upload a photo, get instant AI-powered valuation, and connect with verified 
              buyers and sellers. The smarter way to trade scrap materials.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button variant="accent" size="xl" asChild>
                <Link to="/auth">
                  Start Selling <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/auth">
                  Browse Scrap
                </Link>
              </Button>
            </div>

            {/* Material Tags */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {materials.map((material, i) => (
                <span 
                  key={material}
                  className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium border border-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors cursor-default"
                >
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card border-y border-border/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines computer vision, machine learning, and real-time market 
              data to deliver accurate, fair valuations instantly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl border border-border/50 bg-card hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to get fair value for your scrap
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { step: '01', title: 'Upload Photo', description: 'Take a clear photo of your scrap material and upload it to our platform.' },
              { step: '02', title: 'Get AI Valuation', description: 'Our AI analyzes material type, quality, and market rates to give you a fair price.' },
              { step: '03', title: 'Connect & Sell', description: 'List your scrap and connect with verified buyers for quick, secure transactions.' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-8xl font-bold text-primary/10 absolute -top-8 left-0">
                  {item.step}
                </div>
                <div className="relative z-10 pt-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/30 blur-3xl" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Get Fair Value for Your Scrap?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join thousands of sellers and buyers already using ScrapWise for 
              transparent, AI-powered scrap trading.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="accent" size="xl" asChild>
                <Link to="/auth">
                  Create Free Account <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-card border-t border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">ScrapWise</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 ScrapWise. AI-Powered Scrap Marketplace.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
