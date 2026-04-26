import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Recycle, Users, Target, Award, ArrowRight } from 'lucide-react';

const team = [
  { name: 'Rajesh Kumar', role: 'Founder & CEO', bio: '15+ years in recycling industry' },
  { name: 'Priya Sharma', role: 'CTO', bio: 'Former Google AI engineer' },
  { name: 'Amit Patel', role: 'Head of Operations', bio: 'Supply chain expert' },
  { name: 'Sneha Reddy', role: 'Head of Product', bio: 'Ex-Flipkart product lead' },
];

const values = [
  { icon: Recycle, title: 'Sustainability', description: 'We believe in creating a circular economy where nothing goes to waste.' },
  { icon: Users, title: 'Community', description: 'Empowering local scrap collectors and businesses with fair pricing.' },
  { icon: Target, title: 'Transparency', description: 'AI-powered valuations ensure fair, unbiased pricing for everyone.' },
  { icon: Award, title: 'Quality', description: 'Verified sellers and quality grading you can trust.' },
];

export default function About() {
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

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 gradient-hero">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-primary-foreground mb-6">
            Transforming India's<br />Recycling Industry
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            ScrapWise is on a mission to create a transparent, efficient marketplace 
            for scrap materials using AI-powered valuations.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p>
              ScrapWise was born from a simple observation: the scrap industry in India 
              is massive but fragmented. Sellers often don't know the true value of their 
              materials, and buyers struggle to find quality scrap at fair prices.
            </p>
            <p className="mt-4">
              Our team of technologists and industry experts came together to solve this 
              problem using artificial intelligence. By analyzing images and market data, 
              we provide instant, accurate valuations that benefit both buyers and sellers.
            </p>
            <p className="mt-4">
              Today, ScrapWise connects thousands of sellers and buyers across India, 
              processing millions of rupees in transactions while contributing to a 
              more sustainable, circular economy.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="border-border/50 text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">
            Ready to Join the Movement?
          </h2>
          <Button variant="accent" size="xl" asChild>
            <Link to="/auth">
              Get Started Today <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

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
