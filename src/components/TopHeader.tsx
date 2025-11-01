import React from 'react';
import OptimizedImage from './OptimizedImage';
import PolishCitizensNotice from './PolishCitizensNotice';

const TopHeader = () => {
  return (
    <div className="bg-gradient-to-b from-navy-900 via-navy-800 to-navy-900 text-white py-2 px-4 border-b border-navy-700/50">
      <div className="container mx-auto flex items-center justify-between flex-wrap gap-2">
        <img 
          src="/logos/skan-kredytowy-logo.png" 
          alt="Skan Kredytowy - profesjonalna analiza zdolności kredytowej" 
          className="h-12 w-auto"
        />
        <p className="text-sm flex-1 text-center">🔒 Bezpieczne i dyskretne doradztwo finansowe</p>
      </div>
      <PolishCitizensNotice />
    </div>
  );
};
export default TopHeader;