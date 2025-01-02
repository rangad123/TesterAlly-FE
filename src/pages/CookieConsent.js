import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-white border-t shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            This website uses cookies
          </h2>
          <div className="mt-2">
            <p className="mb-4 text-gray-600">
              We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. 
              We also share information about your use of our site with our social media, advertising and analytics partners 
              who may combine it with other information that you've provided to them or that they've collected from your use 
              of their services.
            </p>
            
            {showDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h4 className="font-semibold mb-2">Cookie Types:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Essential cookies: Required for basic site functionality</li>
                  <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                  <li>Marketing cookies: Used to deliver relevant advertisements</li>
                  <li>Social media cookies: Enable social sharing and tracking</li>
                </ul>
              </div>
            )}
            
            <div className="flex items-center gap-4 mt-4">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
              <button 
                onClick={handleDeny}
                className="px-4 py-2 border border-gray-300 rounded-md text-red-600 hover:bg-red-50 transition-colors"
              >
                Deny
              </button>
              <button 
                onClick={handleAccept}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Allow all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;