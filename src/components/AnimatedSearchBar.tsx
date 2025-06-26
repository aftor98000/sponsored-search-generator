
import React, { useState, useEffect } from 'react';
import { Search, TrendingUp } from 'lucide-react';

interface AnimatedSearchBarProps {
  query: string;
}

const AnimatedSearchBar = ({ query }: AnimatedSearchBarProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [query]);

  useEffect(() => {
    if (currentIndex < query.length) {
      const timer = setTimeout(() => {
        setDisplayedText(query.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50 + Math.random() * 100); // Variable typing speed for realism

      return () => clearTimeout(timer);
    } else if (currentIndex === query.length && !isComplete) {
      setTimeout(() => {
        setIsComplete(true);
      }, 500);
    }
  }, [currentIndex, query, isComplete]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex items-center p-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex-1 px-6">
            <div className="relative">
              <span className="text-gray-900 text-xl font-medium">
                {displayedText}
              </span>
              {/* Typing cursor */}
              {!isComplete && (
                <span className="inline-block w-0.5 h-7 bg-orange-500 ml-1 animate-pulse rounded-full" />
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 pr-2">
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Search Suggestions (appears after typing completes) */}
      {isComplete && (
        <div className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Search Suggestions</div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">3 results</div>
            </div>
            <div className="space-y-1">
              {[
                displayedText,
                displayedText.replace(' - Sponsored by', ' reviews -'),
                displayedText.replace(' - Sponsored by', ' comparison -'),
              ].map((suggestion, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group ${
                    index === 0 ? 'bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200/50' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gray-100 group-hover:bg-gray-200'
                  } transition-colors`}>
                    <Search className={`w-4 h-4 ${index === 0 ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <span className={`text-base ${index === 0 ? 'text-orange-800 font-semibold' : 'text-gray-700'}`}>
                      {suggestion}
                    </span>
                  </div>
                  {index === 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full font-medium shadow-sm">
                        Sponsored
                      </span>
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedSearchBar;
