
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

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
    <div className="max-w-2xl mx-auto">
      {/* Search Bar Container */}
      <div className="relative bg-gray-50 rounded-full shadow-inner border-2 border-gray-200 p-2">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white ml-1">
            <Search className="w-5 h-5" />
          </div>
          <div className="flex-1 px-4">
            <div className="relative">
              <span className="text-gray-800 text-lg font-medium">
                {displayedText}
              </span>
              {/* Typing cursor */}
              {!isComplete && (
                <span className="inline-block w-0.5 h-6 bg-orange-500 ml-1 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Suggestions (appears after typing completes) */}
      {isComplete && (
        <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in">
          <div className="p-4">
            <div className="text-sm text-gray-500 mb-3">Search suggestions:</div>
            <div className="space-y-2">
              {[
                displayedText,
                displayedText.replace(' - Sponsored by', ' reviews -'),
                displayedText.replace(' - Sponsored by', ' comparison -'),
              ].map((suggestion, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    index === 0 ? 'bg-orange-50 border border-orange-200' : ''
                  }`}
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className={`text-sm ${index === 0 ? 'text-orange-700 font-medium' : 'text-gray-700'}`}>
                    {suggestion}
                  </span>
                  {index === 0 && (
                    <span className="ml-auto text-xs bg-orange-500 text-white px-2 py-1 rounded-full">
                      Sponsored
                    </span>
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
