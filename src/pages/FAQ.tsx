import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Recycle, HelpCircle, ShoppingCart, Upload, CreditCard, Shield } from 'lucide-react';

const categories = [
  { id: 'general', label: 'General', icon: HelpCircle },
  { id: 'buying', label: 'Buying', icon: ShoppingCart },
  { id: 'selling', label: 'Selling', icon: Upload },
  { id: 'payments', label: 'Payments', icon: CreditCard },
  { id: 'safety', label: 'Safety', icon: Shield },
];

const faqs = [
  {
    category: 'general',
    question: 'What is ScrapWise?',
    answer: 'ScrapWise is an AI-powered marketplace that connects scrap sellers with buyers. We use artificial intelligence to provide accurate, fair valuations for scrap materials.',
  },
  {
    category: 'general',
    question: 'How does the AI valuation work?',
    answer: 'Our AI analyzes images of your scrap materials to identify the type, quality grade, and estimate weight. Combined with current market rates, it provides an accurate price prediction within seconds.',
  },
  {
    category: 'general',
    question: 'Is ScrapWise available across India?',
    answer: 'Yes! ScrapWise is available in all major cities across India. We are continuously expanding our network of buyers and sellers.',
  },
  {
    category: 'buying',
    question: 'How do I purchase scrap materials?',
    answer: 'Browse our listings, filter by material type or location, and contact sellers directly. You can add items to your cart and complete the purchase through our secure checkout process.',
  },
  {
    category: 'buying',
    question: 'Can I negotiate prices with sellers?',
    answer: 'Yes, you can message sellers directly through our platform to discuss pricing, bulk discounts, or any other queries before making a purchase.',
  },
  {
    category: 'buying',
    question: 'How is delivery handled?',
    answer: 'Delivery options vary by seller. Some offer pickup from their location, while others provide delivery services. Details are available on each listing.',
  },
  {
    category: 'selling',
    question: 'How do I list my scrap for sale?',
    answer: 'Create a seller account, upload photos of your scrap, and our AI will provide an instant valuation. You can then set your asking price and publish the listing.',
  },
  {
    category: 'selling',
    question: 'Is there a fee for selling on ScrapWise?',
    answer: 'Listing is free! We charge a small platform fee (2%) only when a sale is completed successfully.',
  },
  {
    category: 'selling',
    question: 'How accurate is the AI valuation?',
    answer: 'Our AI has 95% accuracy in identifying materials and quality grades. Valuations are based on real-time market data and are updated regularly.',
  },
  {
    category: 'payments',
    question: 'What payment methods are accepted?',
    answer: 'We accept UPI, credit/debit cards, net banking, and cash on delivery (where available).',
  },
  {
    category: 'payments',
    question: 'When do sellers receive payment?',
    answer: 'Sellers receive payment within 2-3 business days after the buyer confirms delivery.',
  },
  {
    category: 'payments',
    question: 'Is there buyer protection?',
    answer: 'Yes! All transactions are protected. If the item is not as described, you can raise a dispute and we will help resolve it.',
  },
  {
    category: 'safety',
    question: 'How do you verify sellers?',
    answer: 'Sellers go through a verification process including identity verification and business documentation. Verified sellers display a badge on their profile.',
  },
  {
    category: 'safety',
    question: 'What if I have a dispute with a seller?',
    answer: 'You can raise a dispute through the order page. Our support team will review the case and help reach a fair resolution.',
  },
  {
    category: 'safety',
    question: 'Is my personal information safe?',
    answer: 'Absolutely. We use industry-standard encryption and never share your personal data with third parties. See our Privacy Policy for details.',
  },
];

export default function FAQ() {
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to frequently asked questions
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <cat.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
              </a>
            ))}
          </div>

          {/* FAQ Sections */}
          {categories.map((category) => (
            <div key={category.id} id={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <category.icon className="w-6 h-6 text-primary" />
                {category.label}
              </h2>
              <Card className="border-border/50">
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs
                      .filter((faq) => faq.category === category.id)
                      .map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="px-6 text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4 text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Contact CTA */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">Our support team is here to help.</p>
              <Button variant="hero" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
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
