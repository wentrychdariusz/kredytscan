import React from 'react';
import { CheckCircle2, TrendingUp, Users } from 'lucide-react';

const SuccessStoriesSection = () => {
  const successPhotos = [
    "/lovable-uploads/client-success-1.jpg",
    "/lovable-uploads/client-success-2.jpg",
    "/lovable-uploads/client-success-3.jpg",
    "/lovable-uploads/client-success-4.jpg"
  ];

  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-8 md:py-12 relative overflow-hidden my-8 rounded-2xl">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-prestige-gold-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-prestige-gold-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="px-4 md:px-6 max-w-5xl mx-auto relative z-10">
        
        {/* Success Photos Grid - compact */}
        <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
          {successPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative overflow-hidden rounded-lg shadow-md"
            >
              <img
                src={photo}
                alt="Zadowolony klient"
                className="w-full h-24 md:h-32 object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Main Value Proposition */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-prestige-gold-500/20 border border-prestige-gold-500/30 rounded-full px-3 py-1 mb-3">
            <Users className="w-4 h-4 text-prestige-gold-400" />
            <span className="text-prestige-gold-300 font-semibold text-xs md:text-sm">
              Pomogliśmy już tysiącom Polaków
            </span>
          </div>
          
          <h3 className="font-montserrat text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3">
            Dlaczego ta analiza jest <span className="text-prestige-gold-400">wyjątkowa?</span>
          </h3>
        </div>

        {/* Value boxes - 2 column grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Box 1: Wartość */}
          <div className="bg-gradient-to-r from-prestige-gold-500/10 to-prestige-gold-600/10 border border-prestige-gold-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-prestige-gold-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="text-prestige-gold-300 text-sm font-semibold mb-1">Prawdziwa wartość naszej analizy</p>
                <p className="text-white font-bold text-lg md:text-xl mb-1">~1000 zł</p>
                <p className="text-warm-neutral-300 text-xs md:text-sm">Dziś tylko <span className="text-prestige-gold-400 font-bold">29 zł</span> — chcemy zacząć współpracę z nowymi klientami</p>
              </div>
            </div>
          </div>

          {/* Box 2: Insider Knowledge */}
          <div className="bg-gradient-to-r from-prestige-gold-500/10 to-prestige-gold-600/10 border border-prestige-gold-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-prestige-gold-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-navy-900" />
              </div>
              <div>
                <p className="text-prestige-gold-300 text-sm font-semibold mb-1">Wiedza od środka</p>
                <p className="text-warm-neutral-200 text-xs md:text-sm leading-relaxed">
                  W zespole mamy <span className="text-white font-semibold">ludzi, którzy pracowali w bankach</span> — wiemy dokładnie jak oceniają klientów
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <p className="text-center text-prestige-gold-200 text-sm md:text-base font-lato font-semibold leading-relaxed">
          Widzieliśmy już setki beznadziejnych przypadków. <span className="text-white">Dziś ci ludzie mają kredyty w bankach.</span>
        </p>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
