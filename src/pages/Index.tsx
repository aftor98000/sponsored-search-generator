
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Sponsored Search
            <span className="text-orange-500"> Generator</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create realistic sponsored search prompts that blend naturally with platform contexts
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Platform URL</label>
                <Input
                  type="url"
                  placeholder="e.g., amazon.com, youtube.com"
                  value={platformUrl}
                  onChange={(e) => setPlatformUrl(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-orange-400 rounded-xl text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Brand Name</label>
                <Input
                  type="text"
                  placeholder="e.g., Nike, Apple, Tesla"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-orange-400 rounded-xl text-base"
                />
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={generateSearchQuery}
                disabled={!platformUrl || !brandName || isGenerating}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGenerating ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Search className="w-5 h-5" />
                    <span>Generate</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Animated Search Result */}
          {showAnimation && generatedQuery && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Generated Search Query
              </h3>
              <AnimatedSearchBar query={generatedQuery} />
            </div>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Smart Context</h3>
              <p className="text-gray-600 text-sm">Generates queries that feel natural for each platform</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 bg-orange-600 rounded-sm"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Brand Integration</h3>
              <p className="text-gray-600 text-sm">Seamlessly blends brand messaging with organic search</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-6 h-6 border-2 border-orange-600 rounded-full animate-pulse"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Realistic Animation</h3>
              <p className="text-gray-600 text-sm">Typing animation mimics real user search behavior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
