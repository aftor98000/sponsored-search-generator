
import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';

const Index = () => {
  const [platformUrl, setPlatformUrl] = useState('');
  const [brandName, setBrandName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);

  const generateSearchQuery = () => {
    if (!platformUrl || !brandName) return;

    setIsGenerating(true);
    setShowAnimation(false);

    // Extract platform name from URL
    let platformName = 'website';
    try {
      const url = new URL(platformUrl.startsWith('http') ? platformUrl : `https://${platformUrl}`);
      platformName = url.hostname.replace('www.', '').split('.')[0];
    } catch (e) {
      platformName = platformUrl.replace(/https?:\/\/|www\.|\.com|\.net|\.org/g, '');
    }

    // Generate realistic search queries
    const searchTemplates = [
      `best ${brandName} deals on ${platformName}`,
      `${brandName} reviews ${platformName}`,
      `${brandName} discount codes ${platformName}`,
      `top ${brandName} products ${platformName}`,
      `${brandName} sale ${platformName}`,
      `${brandName} vs competitors ${platformName}`,
      `${brandName} customer reviews`,
      `where to buy ${brandName} online`,
      `${brandName} latest offers ${platformName}`,
      `${brandName} price comparison ${platformName}`
    ];

    const randomQuery = searchTemplates[Math.floor(Math.random() * searchTemplates.length)];
    const finalQuery = `${randomQuery} - Sponsored by ${brandName}`;

    setTimeout(() => {
      setGeneratedQuery(finalQuery);
      setIsGenerating(false);
      setShowAnimation(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/50">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sponsored Search
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Generator</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create realistic sponsored search prompts that blend naturally with platform contexts. 
            Generate authentic-looking queries that feel organic to users.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Form */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Platform URL</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g., amazon.com, youtube.com, reddit.com"
                      value={platformUrl}
                      onChange={(e) => setPlatformUrl(e.target.value)}
                      className="h-14 pl-4 pr-4 border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-xl text-base bg-gray-50/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-800 uppercase tracking-wide">Brand Name</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g., Nike, Apple, Tesla, Spotify"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="h-14 pl-4 pr-4 border-2 border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 rounded-xl text-base bg-gray-50/50 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={generateSearchQuery}
                  disabled={!platformUrl || !brandName || isGenerating}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 h-14 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border-0"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Search Query...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <Search className="w-5 h-5" />
                      <span>Generate Search Query</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Animated Search Result */}
          {showAnimation && generatedQuery && (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm animate-fade-in">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Generated Search Query</h3>
                  <p className="text-gray-600">Watch how your sponsored search appears to users</p>
                </div>
                <AnimatedSearchBar query={generatedQuery} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
