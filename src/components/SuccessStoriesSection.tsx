import React from 'react';
import OptimizedImage from './OptimizedImage';
import { CheckCircle2, TrendingUp } from 'lucide-react';

const SuccessStoriesSection = () => {
  const successPhotos = [
    {
      src: "/lovable-uploads/client-success-1.jpg",
      alt: "Zadowolony klient z książką Dariusza Wentrycha"
    },
    {
      src: "/lovable-uploads/client-success-2.jpg",
      alt: "Klient po udanym oddłużeniu"
    },
    {
      src: "/lovable-uploads/client-success-3.jpg",
      alt: "Zadowolona klientka po konsultacji finansowej"
    },
    {
      src: "/lovable-uploads/client-success-4.jpg",
      alt: "Klientka po pomyślnym zakończeniu procesu oddłużenia"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-12 md:py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-prestige-gold-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-prestige-gold-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="px-4 md:px-8 lg:px-12 xl:px-16 max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-prestige-gold-500/20 border border-prestige-gold-500/30 rounded-full px-4 py-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-prestige-gold-400" />
            <span className="text-prestige-gold-300 font-semibold text-sm">
              Sprawdzone rezultaty
            </span>
          </div>
          
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Pomogliśmy już <span className="text-prestige-gold-400">tysiącom Polaków</span>
          </h2>
          
          <p className="text-warm-neutral-200 text-lg md:text-xl max-w-3xl mx-auto font-lato">
            Dołącz do grona zadowolonych klientów, którzy odzyskali kontrolę nad swoimi finansami
          </p>
        </div>

        {/* Success Photos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {successPhotos.map((photo, index) => (
            <div 
              key={index} 
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <OptimizedImage
                src={photo.src}
                alt={photo.alt}
                className="w-full h-64 md:h-80 object-cover"
                priority={index < 2}
                width={400}
                height={320}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-prestige-gold-500/10 to-prestige-gold-600/10 border border-prestige-gold-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="bg-prestige-gold-500 rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-navy-900" />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-3">
                Wartość tej analizy: <span className="text-prestige-gold-400">kilka tysięcy złotych</span>
              </h3>
              <p className="text-warm-neutral-200 text-base md:text-lg font-lato leading-relaxed">
                Otrzymujesz ekskluzywną wiedzę i doświadczenie, których <strong className="text-prestige-gold-300">nie znajdziesz w innych firmach</strong>. 
                Nasze autorskie strategie oddłużeniowe to efekt 20 lat pracy z tysiącami klientów.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
