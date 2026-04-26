import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Camera, Sparkles, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { analyzeScrapImage, ScrapAnalysisResult } from '@/lib/openai';

export default function UploadScrap() {
  const [step, setStep] = useState<'upload' | 'analyzing' | 'result'>('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<ScrapAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload an image under 10MB.', variant: 'destructive' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      setSelectedImage(base64);
      setAnalysisError(null);
      setStep('analyzing');

      try {
        const result = await analyzeScrapImage(base64);
        setAiResult(result);
        setTitle(`${result.material} Scrap`);
        setStep('result');
      } catch (err: any) {
        setAnalysisError(err.message ?? 'Analysis failed. Please try again.');
        setStep('upload');
        toast({ title: 'Analysis Failed', description: err.message ?? 'Could not analyze image.', variant: 'destructive' });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateListing = () => {
    if (!title || !price || !location) {
      toast({ title: 'Missing fields', description: 'Please fill title, price and location.', variant: 'destructive' });
      return;
    }
    toast({ title: 'Listing Created!', description: 'Your scrap listing is now live.' });
    setStep('upload');
    setSelectedImage(null);
    setAiResult(null);
    setTitle('');
    setPrice('');
    setDescription('');
    setLocation('');
    setPhone('');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Upload Scrap</h1>
          <p className="text-muted-foreground mt-1">Get instant AI valuation for your scrap materials</p>
        </div>

        {step === 'upload' && (
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Upload Scrap Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-border rounded-xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="mb-2 text-lg font-medium text-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">PNG, JPG or WEBP (MAX. 10MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>

              {analysisError && (
                <div className="mt-4 p-4 rounded-lg bg-destructive/10 border border-destructive/30 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">Analysis Error</p>
                    <p className="text-sm text-muted-foreground mt-1">{analysisError}</p>
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-medium text-foreground mb-2">Tips for best results:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ensure good lighting and clear visibility of the scrap</li>
                  <li>• Include a reference object for scale if possible</li>
                  <li>• Capture the material from multiple angles if needed</li>
                  <li>• Keep the background clean and uncluttered</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'analyzing' && (
          <Card className="border-border/50">
            <CardContent className="py-16">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-6 animate-pulse-glow">
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Scrap</h3>
                <p className="text-muted-foreground mb-6">
                  GPT-4o is identifying material type, quality, and estimating value...
                </p>
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Uploaded scrap"
                    className="w-48 h-48 object-cover rounded-xl mb-6 opacity-70"
                  />
                )}
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Processing image with AI...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'result' && aiResult && (
          <div className="space-y-6">
            <Card className="border-border/50 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto bg-muted">
                  {selectedImage && (
                    <img src={selectedImage} alt="Uploaded scrap" className="w-full h-full object-cover" />
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">GPT-4o Analysis Complete</span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-6">AI Valuation Result</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Material Type</span>
                      <span className="font-semibold text-foreground">{aiResult.material}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Quality Grade</span>
                      <span className="font-semibold text-primary">{aiResult.quality}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="text-muted-foreground">Estimated Weight</span>
                      <span className="font-semibold text-foreground">{aiResult.estimatedWeight}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-border/50">
                      <span className="text-muted-foreground">AI Confidence</span>
                      <span className={`font-semibold ${aiResult.confidence >= 70 ? 'text-accent' : 'text-yellow-500'}`}>
                        {aiResult.confidence}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-4 bg-primary/5 rounded-lg px-4 -mx-4">
                      <span className="text-lg font-medium text-foreground">Predicted Price</span>
                      <span className="text-2xl font-bold text-primary">{aiResult.predictedPrice}</span>
                    </div>
                  </div>

                  {aiResult.description && (
                    <p className="mt-4 text-sm text-muted-foreground italic border-t border-border/50 pt-4">
                      {aiResult.description}
                    </p>
                  )}
                </CardContent>
              </div>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Listing Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Listing Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder={`${aiResult.material} Scrap`}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Your Price (₹)</Label>
                    <Input
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="10000"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details about your scrap..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter your city"
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="h-12"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => { setStep('upload'); setSelectedImage(null); setAiResult(null); }}>
                    Upload Different Image
                  </Button>
                  <Button variant="hero" onClick={handleCreateListing}>
                    Create Listing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
