import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
import { supabase } from '@/integrations/supabase/client';
import bookCover from '@/assets/book-cover.png';
const OfertaD = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ordersToday, setOrdersToday] = useState(47);
  const [filledFields, setFilledFields] = useState(0);
  const [showSticky, setShowSticky] = useState(false);

  // Countdown timer (12 hours)
  const {
    formattedTime,
    timeLeft
  } = useCountdown({
    initialTime: 12 * 60 * 60,
    storageKey: 'oferta_d_timer'
  });

  // Live social proof simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersToday(prev => Math.min(prev + 1, 99));
    }, Math.random() * 180000 + 120000);
    return () => clearInterval(interval);
  }, []);

  // Track filled fields for progress bar
  useEffect(() => {
    let count = 0;
    if (formData.email.trim()) count++;
    if (formData.phone.trim()) count++;
    if (formData.name.trim()) count++;
    setFilledFields(count);
  }, [formData]);

  // Sticky CTA scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToForm = () => {
    const formElement = document.getElementById('formularz-zamowienia');
    if (formElement) {
      formElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error: saveError
      } = await supabase.from('leads').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        payment_status: 'Nieopłacone',
        amount: 29
      });
      if (saveError) {
        console.error('Error saving to Supabase:', saveError);
      }
      const params = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: '29',
        service: 'Profesjonalna Analiza Kredytowa'
      });
      navigate(`/payment-express?${params.toString()}`);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił problem. Spróbuj ponownie.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gradient-to-b from-white via-warm-neutral-50 to-business-blue-50">
      {/* Logo Header */}
      <header className="pt-4 pb-3 px-4 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 border-b border-slate-500">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between gap-3 md:gap-6 mb-3">
            <img src="/logos/skan-kredytowy-logo.png" alt="Skan Kredytowy - Profesjonalna Analiza Kredytowa" className="h-16 md:h-24 lg:h-28 flex-shrink-0 rounded-lg" />
            <div className="text-right flex-1">
              <div className="flex items-center justify-end gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm md:text-base font-bold text-white">4.9</span>
              </div>
              <p className="text-[10px] md:text-xs text-slate-200 leading-tight">
                firma autora bestsellerowej książki<br className="hidden md:block" /> 
                <strong>"Nowe życie bez długów"</strong> oraz nowej książki<br className="hidden md:block" /> 
                <strong>"Kredyt Zaufania. Jak odzyskać finansowanie w banku."</strong>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Hook - Problem Statement */}
          <div className="text-center mb-6 md:mb-8">
            {/* Mini tagline */}
            <p className="text-xs md:text-sm text-prestige-gold-700 font-semibold mb-3 flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Zrób analizę zanim bank zamknie Ci drogę do kredytu.
            </p>
            
            <h1 className="font-montserrat leading-relaxed max-w-4xl mx-auto">
              <span className="block text-xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-3 md:mb-4 px-2">
                💥 Jak sprawić, by bank w końcu powiedział „TAK"
              </span>
              <span className="block text-base md:text-xl lg:text-2xl text-warm-neutral-700 mb-4 md:mb-6 px-2">
                …nawet jeśli wcześniej słyszałeś same odmowy
              </span>
            </h1>
            
            {/* Value Proposition with Authority Background */}
            <div className="bg-gradient-to-br from-prestige-gold-50 to-warm-neutral-100 rounded-xl p-5 md:p-7 mb-4 md:mb-6 shadow-lg border border-prestige-gold-200">
              {/* Main Message - Prominent */}
              <div className="bg-white rounded-lg p-4 md:p-5 mb-4 shadow-md border-l-4 border-prestige-gold-500">
                <p className="text-lg md:text-xl text-navy-900 leading-relaxed mb-3 font-semibold">
                  <strong>To nie Twoja zdolność jest problemem</strong> — to coś, czego bank Ci nigdy nie pokaże.
                </p>
                <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-2">
                  Na co dzień ludzie płacą nam <strong className="text-prestige-gold-700">500 zł za godzinę konsultacji</strong>, żeby dowiedzieć się, co naprawdę blokuje ich kredyt.
                </p>
                <p className="text-success-green-700 font-bold text-lg md:text-xl">
                  Ty możesz mieć to samo — za 29 zł.
                </p>
              </div>
              
              {/* Authority - Mobile Optimized */}
              <div className="space-y-3">
                {/* Row 1: Book + Description */}
                <div className="flex items-center gap-3">
                  <div className="w-16 md:w-20 flex-shrink-0">
                    <img src={bookCover} alt="Bestseller" className="w-full h-auto rounded shadow-md" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-center mb-2">
                      <span className="inline-block bg-prestige-gold-500 text-white text-xs font-bold px-3 py-1 rounded">
                        BESTSELLER
                      </span>
                    </div>
                    <p className="text-xs md:text-sm font-semibold text-navy-900 leading-tight">Firma autora bestsellerowej książki "Nowe życie bez długów" oraz nowej książki "Kredyt Zaufania. Jak odzyskać finansowanie w banku." premiera 2026.</p>
                  </div>
                </div>
                
                {/* Row 2: Trust Indicators - Centered on Mobile */}
                
                
                {/* Row 3: Rating - Full Width */}
                <div className="bg-gradient-to-r from-prestige-gold-100 to-warm-neutral-100 px-3 py-2 rounded-lg shadow-sm border border-prestige-gold-300">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <span className="font-bold text-navy-900 text-sm">4.9</span>
                  </div>
                  <p className="text-xs text-center text-navy-900 leading-tight">
                    na podstawie 383 zweryfikowanych opinii<br />
                    <span className="font-semibold">GOOGLE i OFERTEO</span>
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Above the Fold */}
            <div className="mb-4 px-2">
              <Button size="lg" onClick={scrollToForm} className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-6 md:px-8 py-6 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                <span className="text-base md:text-xl lg:text-2xl whitespace-nowrap">
                  👉 SPRAWDŹ ZA 29 ZŁ
                </span>
              </Button>
              <div className="mt-3 text-center text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
                <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
              </div>
            </div>

            {/* Social Proof Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-4 text-xs md:text-sm">
              <div className="flex items-center gap-1">
                <span className="text-prestige-gold-500">⭐⭐⭐⭐⭐</span>
                <span className="font-semibold text-navy-900">15 000+ klientów</span>
              </div>
              <div className="flex items-center gap-1">
                
                
              </div>
              <div className="flex items-center gap-1">
                
                
              </div>
            </div>

            {/* Mini Avatars with Names */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex -space-x-2">
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/client-success-1.jpg" alt="Joanna M." />
                  <AvatarFallback className="text-xs bg-prestige-gold-200">JM</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/client-success-2.jpg" alt="Tomasz R." />
                  <AvatarFallback className="text-xs bg-business-blue-200">TR</AvatarFallback>
                </Avatar>
                <Avatar className="w-8 h-8 border-2 border-white">
                  <AvatarImage src="/lovable-uploads/client-success-3.jpg" alt="Katarzyna S." />
                  <AvatarFallback className="text-xs bg-success-green-200">KS</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs md:text-sm text-warm-neutral-600">
                <span className="font-semibold text-navy-900">Joanna M.</span> | <span className="font-semibold text-navy-900">Tomasz R.</span> | <span className="font-semibold text-navy-900">Katarzyna S.</span>
              </p>
            </div>


            {/* Wyobraź sobie moment */}
            <div className="bg-gradient-to-br from-success-green-50 to-business-blue-50 rounded-xl p-4 md:p-8 mb-6 md:mb-8 border-2 border-success-green-300">
              <p className="text-lg md:text-xl font-semibold text-navy-900 mb-3 md:mb-4">
                Wyobraź sobie ten moment, gdy logujesz się do banku…
              </p>
              <p className="text-base md:text-lg text-navy-900 mb-3 md:mb-4">
                i zamiast kolejnego <span className="bg-destructive text-white px-2 py-1 rounded font-bold text-sm md:text-base inline-block">Odmowa</span>{' '}
                <span className="block mt-2">widzisz <span className="bg-success-green-500 text-white px-2 py-1 rounded font-bold text-sm md:text-base inline-block">Decyzja pozytywna</span>.</span>
              </p>
              
              <div className="space-y-3 md:space-y-3 text-left mt-4 md:mt-6">
                <p className="text-base md:text-lg text-success-green-700 leading-relaxed font-semibold italic">
                  💭 <strong>Ulga. Spokój.</strong> W końcu możesz ruszyć z życiem.
                </p>
                <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed">
                  Raty są niższe, zobowiązania uporządkowane, a z Twojej pensji wreszcie coś zostaje — na rodzinę, podróże, marzenia.
                </p>
              </div>
            </div>
          </div>

          {/* Kim jest Dariusz Wentrych */}
          <div className="bg-slate-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-warm-neutral-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-6 text-center">
              👤 Kim jest Dariusz Wentrych
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 items-start mb-6">
              {/* Left: Avatar and Info */}
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-prestige-gold-400 mb-4 shadow-xl">
                  <AvatarImage src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="object-cover" />
                  <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
                </Avatar>
                <p className="text-sm md:text-base text-warm-neutral-600 font-semibold mb-4">
                  Dariusz Wentrych — ekspert finansowy i autor bestsellera
                </p>

                {/* Authority Badge */}
                <div className="mb-4 bg-prestige-gold-100 px-4 py-2 rounded-lg border-2 border-prestige-gold-400 shadow-md">
                  <p className="text-sm md:text-base font-bold text-navy-900">
                    🏆 15 000+ przeanalizowanych przypadków
                  </p>
                </div>
                
                <div className="space-y-3">
                  <p className="text-base md:text-lg text-warm-neutral-700">
                    💼 20 lat doświadczenia w bankowości i finansach
                  </p>
                  <p className="text-base md:text-lg text-warm-neutral-700">
                    💬 Ponad 15 000 klientów, którzy odzyskali dostęp do kredytów
                  </p>
                </div>
              </div>

              {/* Right: Photo with Client */}
              <div className="flex flex-col items-center justify-center">
                <img src="/lovable-uploads/dariusz-with-happy-client.png" alt="Dariusz Wentrych z zadowoloną klientką" className="rounded-lg shadow-lg border-2 border-prestige-gold-300 w-full max-w-sm mb-3" />
                <p className="text-xs md:text-sm text-warm-neutral-600 italic text-center">
                  Dariusz Wentrych z zadowoloną klientką
                </p>
              </div>
            </div>

            {/* Authority Banner */}
            <div className="mb-5 bg-gradient-to-r from-prestige-gold-100 to-business-blue-100 px-6 py-3 rounded-lg border border-prestige-gold-300">
              <p className="text-base md:text-lg font-bold text-navy-900">
                📘 Autor bestsellera „Nowe życie bez długów" oraz nowej książki "Kredyt Zaufania. Jak odzyskać finansowanie w banku." premiera 2026.
              </p>
              <p className="text-sm md:text-base text-warm-neutral-700 mt-1">
                Dzięki jego metodom ponad 15 000 Polaków uzyskało kredyt w banku
              </p>
            </div>

            <div className="bg-warm-neutral-50 border-l-4 border-prestige-gold-400 p-5 rounded-r-lg mb-4">
              <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg mb-3">
                „Od ponad 20 lat pomagam ludziom odzyskać dostęp do finansowania.<br />
                W moim zespole pracują byli analitycy bankowi i doradcy, którzy doskonale wiedzą, jak system ocenia klientów.
              </p>
              <p className="text-navy-900 font-semibold text-base md:text-lg">
                Naszym celem jest jedno: żebyś znowu mógł usłyszeć od banku słowo „TAK"."
              </p>
              <p className="text-right text-warm-neutral-600 font-semibold mt-3">
                — Dariusz Wentrych
              </p>
            </div>

            {/* Micro CTA */}
            <div className="text-center bg-success-green-50 border border-success-green-300 rounded-lg p-4">
              <p className="text-sm md:text-base text-navy-900 font-semibold">
                💡 Sprawdź, jak widzi Cię bank – tak jak zrobiło to już <strong className="text-success-green-700">15 000 osób</strong>
              </p>
            </div>
          </div>

          {/* Co otrzymujesz */}
          <div className="bg-gradient-to-r from-prestige-gold-50 to-business-blue-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-2 text-center">
              💼 Co otrzymujesz
            </h3>
            <p className="text-center text-xl md:text-2xl font-black text-navy-900 mb-6">
              Wartość pakietu: <span className="line-through text-warm-neutral-600">2 750 zł</span> <span className="text-success-green-700">→ dziś tylko 29 zł</span>
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="text-base md:text-lg font-bold text-navy-900 mb-1">
                  🔍 1. Analizę Twojej sytuacji kredytowej <span className="text-prestige-gold-700">(wartość 500 zł)</span>
                </p>
                <p className="text-warm-neutral-700">
                  Dowiesz się, jak widzą Cię banki i co naprawdę wpływa na Twoją zdolność.
                </p>
              </div>

              <div>
                <p className="text-base md:text-lg font-bold text-navy-900 mb-1">
                  🧾 2. Wskazanie błędów w rejestrach (BIK, BIG, KRD, ERIF) <span className="text-prestige-gold-700">(wartość 300 zł)</span>
                </p>
                <p className="text-warm-neutral-700">
                  Zobaczysz dokładnie, które wpisy Cię blokują.
                </p>
              </div>

              <div>
                <p className="text-base md:text-lg font-bold text-navy-900 mb-1">
                  🎯 3. Plan krok po kroku, jak poprawić scoring <span className="text-prestige-gold-700">(wartość 1 500 zł)</span>
                </p>
                <p className="text-warm-neutral-700">
                  Otrzymasz konkretny plan działań, żeby zwiększyć swoje szanse na kredyt.
                </p>
              </div>

              <div className="bg-success-green-50 border-2 border-success-green-400 rounded-lg p-4">
                <p className="text-base md:text-lg font-bold text-navy-900 mb-1">
                  🤝 4. Bonus: Dostęp do sieci prywatnych inwestorów <span className="text-prestige-gold-700">(wartość 450 zł)</span>
                </p>
                <p className="text-warm-neutral-700">
                  Finansowanie do 200 000 zł na korzystnych warunkach.
                </p>
              </div>
            </div>

            {/* CTA After Benefits */}
            <div className="text-center mt-8 mb-10 px-2">
              <Button size="lg" onClick={scrollToForm} className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-6 md:px-10 py-6 md:py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full">
                <span className="text-lg md:text-xl lg:text-2xl">
                  💳 Zapłać BLIK – za 29 zł
                </span>
              </Button>
            </div>
          </div>

          {/* Comparison Table - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-6 text-center">
              💡 Wybierz swoją wersję i zobacz, jak widzi Cię bank
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-prestige-gold-100 to-business-blue-100">
                    <th className="p-3 text-left text-sm md:text-base font-semibold text-navy-900 border border-warm-neutral-300">
                      Zawartość
                    </th>
                    <th className="p-3 text-center text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300 relative shadow-lg" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-success-green-600 text-white px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap shadow-lg z-10">
                        🟩 NAJCZĘŚCIEJ WYBIERANA
                      </div>
                      ANALIZA<br />KREDYTOWA
                    </th>
                    <th className="p-3 text-center text-sm md:text-base font-bold border border-warm-neutral-300" style={{
                    backgroundColor: '#F9FAFB',
                    color: '#6B7280',
                    opacity: 0.8
                  }}>
                      <div className="text-xs mb-1">💎 Limitowana edycja VIP — wyprzedana</div>
                      LIMITOWANA<br />EDYCJA VIP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🔍 Analiza Twojej sytuacji kredytowej
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-500 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🧾 Wskazanie błędów w rejestrach
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-500 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🎯 Plan poprawy scoringu
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-500 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🤝 Dostęp do sieci inwestorów
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-500 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      🤝 Priorytetowa konsultacja VIP
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      📘 Książka „Nowe życie bez długów" z autografem
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-400" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      —
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-600 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      📸 Pamiątkowe zdjęcie z Dariuszem
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-400" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      —
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-600 font-bold text-lg" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-warm-neutral-100 to-prestige-gold-100">
                    <td className="p-3 text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300">
                      💰 Łączna wartość
                    </td>
                    <td className="p-3 text-center text-base md:text-lg font-bold text-navy-900 border border-warm-neutral-300" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      2 750 zł
                    </td>
                    <td className="p-3 text-center text-base md:text-lg font-bold border border-warm-neutral-300" style={{
                    backgroundColor: '#F9FAFB',
                    color: '#6B7280'
                  }}>
                      3 750 zł
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-success-green-100 to-prestige-gold-100">
                    <td className="p-3 text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300">
                      💳 Cena
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300" style={{
                    backgroundColor: '#ECFDF5'
                  }}>
                      <p className="text-2xl md:text-3xl font-black text-success-green-700">29 zł</p>
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      <p className="text-2xl md:text-3xl font-black text-warm-neutral-700">199 zł</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-warm-neutral-300"></td>
                    <td className="p-4 text-center border border-warm-neutral-300 shadow-xl" style={{
                    backgroundColor: '#ECFDF5',
                    boxShadow: '0 2px 10px rgba(16,185,129,0.2)'
                  }}>
                      <Button size="lg" onClick={scrollToForm} className="text-white font-bold px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 w-full hover:scale-105 text-sm md:text-base" style={{
                      backgroundColor: '#10B981'
                    }}>
                        SPRAWDŹ SWOJĄ ANALIZĘ – 29 ZŁ
                      </Button>
                      
                      {/* Payment methods */}
                      <div className="mt-3 text-xs text-warm-neutral-700 text-center leading-relaxed">
                        <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
                        <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
                      </div>
                      
                      {/* Trust badges under payment info */}
                      <div className="mt-2 text-xs text-warm-neutral-700">
                        💬 Wynik w 24h • 15 000+ zadowolonych klientów
                      </div>
                      
                      {/* FOMO section */}
                      <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
                        <p className="text-xs text-navy-900 font-semibold mb-1">
                          ⏳ Zostało tylko 20 analiz dostępnych do końca roku.
                        </p>
                        <p className="text-xs text-alert-red-700 font-bold">
                          🔥 Dziś zamówiono już 7 z 20.
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-center border border-warm-neutral-300" style={{
                    backgroundColor: '#F9FAFB'
                  }}>
                      <div className="bg-warm-neutral-300 text-warm-neutral-600 font-bold px-4 py-3 rounded-xl cursor-not-allowed border border-warm-neutral-400">
                        🔒 Wyprzedane — powiadom mnie o nowej edycji
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison Cards - Mobile */}
          <div className="md:hidden mb-8 space-y-4">
            <h3 className="font-montserrat text-xl font-bold text-navy-900 mb-6 text-center">
              💡 Wybierz swoją wersję i zobacz, jak widzi Cię bank
            </h3>

            {/* ANALIZA KREDYTOWA Card */}
            <div className="rounded-xl shadow-2xl border-4 border-success-green-400 overflow-visible relative mt-6" style={{
            backgroundColor: '#ECFDF5'
          }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-success-green-600 text-white px-4 py-2 rounded-full text-xs font-extrabold tracking-wide uppercase whitespace-nowrap z-20 shadow-2xl">
                🟩 NAJCZĘŚCIEJ WYBIERANA
              </div>
              <div className="bg-gradient-to-r from-success-green-100 to-prestige-gold-100 p-4 text-center mt-3">
                <h4 className="font-bold text-xl text-navy-900 mb-2">
                  ANALIZA KREDYTOWA
                </h4>
                <p className="text-sm text-warm-neutral-700 line-through">Wartość: 2 750 zł</p>
                <p className="text-3xl font-black text-success-green-700 mt-2">29 zł</p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="text-sm text-navy-900">
                  🔍 Analiza sytuacji kredytowej
                </div>
                <div className="text-sm text-navy-900">
                  🧾 Wskazanie błędów w rejestrach
                </div>
                <div className="text-sm text-navy-900">
                  🎯 Plan poprawy scoringu
                </div>
                <div className="text-sm text-navy-900">
                  🤝 Dostęp do sieci inwestorów
                </div>
              </div>

              <div className="p-4">
                <Button size="lg" onClick={scrollToForm} className="w-full text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-all text-base" style={{
                backgroundColor: '#10B981'
              }}>
                  SPRAWDŹ SWOJĄ ANALIZĘ – 29 ZŁ
                </Button>
                
                {/* Payment methods */}
                <div className="mt-3 text-center text-xs text-warm-neutral-700 leading-relaxed">
                  <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
                  <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
                </div>
                
                {/* Trust badges under payment info */}
                <div className="mt-2 text-center text-xs text-warm-neutral-700">
                  💬 Wynik w 24h • 15 000+ zadowolonych klientów
                </div>
              </div>

              {/* FOMO section */}
              <div className="mx-4 mb-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
                <p className="text-xs text-center text-navy-900 font-semibold mb-1">
                  ⏳ Dostępnych tylko 20 analiz w tej cenie.
                </p>
                <p className="text-xs text-center text-alert-red-700 font-bold">
                  🔥 Dziś zamówiono już 7.
                </p>
              </div>
            </div>

            {/* LIMITOWANA EDYCJA VIP Card */}
            <div className="rounded-xl shadow-lg border-2 border-warm-neutral-300 overflow-hidden" style={{
            backgroundColor: '#F9FAFB',
            opacity: 0.8
          }}>
              <div className="text-center pt-3 pb-2">
                <p className="text-xs text-warm-neutral-600 mb-1">💎 Limitowana edycja VIP — wyprzedana</p>
              </div>
              
              <div className="bg-gradient-to-r from-warm-neutral-100 to-prestige-gold-100 p-4 text-center">
                <h4 className="font-bold text-lg text-warm-neutral-700 mb-2">
                  LIMITOWANA EDYCJA VIP
                </h4>
                <p className="text-sm text-warm-neutral-600 line-through">Wartość: 3 750 zł</p>
                <p className="text-3xl font-black text-warm-neutral-700 mt-2">199 zł</p>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="text-sm text-warm-neutral-600">
                  🔍 Analiza sytuacji kredytowej
                </div>
                <div className="text-sm text-warm-neutral-600">
                  🧾 Wskazanie błędów w rejestrach
                </div>
                <div className="text-sm text-warm-neutral-600">
                  🎯 Plan poprawy scoringu
                </div>
                <div className="text-sm text-warm-neutral-600">
                  🤝 Priorytetowa konsultacja VIP
                </div>
                <div className="text-sm text-warm-neutral-700 font-semibold border-t pt-2 mt-2">
                  📘 Książka „Nowe życie bez długów" z autografem
                </div>
                <div className="text-sm text-warm-neutral-700 font-semibold">
                  📸 Pamiątkowe zdjęcie z Dariuszem
                </div>
              </div>

              <div className="p-4">
                <div className="bg-warm-neutral-300 text-warm-neutral-600 font-bold py-3 px-4 rounded-lg text-center border border-warm-neutral-400 cursor-not-allowed">
                  🔒 Wyprzedane — powiadom mnie o nowej edycji
                </div>
              </div>
            </div>
          </div>

          {/* Co zawiera edycja VIP */}
          

          {/* Dlaczego warto to zrobić teraz */}
          <div className="bg-gradient-to-r from-alert-red-50 to-prestige-gold-50 border-2 border-alert-red-300 rounded-xl p-6 md:p-8 mb-8">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              💡 Dlaczego warto to zrobić teraz
            </h3>
            
            <div className="space-y-6 text-base md:text-lg text-navy-900 text-center max-w-3xl mx-auto">
              <div className="space-y-2">
                <p className="leading-relaxed">
                  Konsultacja z nami kosztuje <strong className="text-prestige-gold-700">500 zł/h</strong>.
                </p>
                <p className="leading-relaxed">
                  Dzięki tej analizie otrzymujesz naszą wiedzę i plan działania<br />
                  za ułamek tej ceny — <strong className="text-success-green-700">tylko 29 zł</strong>.
                </p>
              </div>

              <div className="border-t-2 border-alert-red-200 pt-4 space-y-2">
                <p className="leading-relaxed text-alert-red-700 font-semibold italic">
                  Możesz to odłożyć…
                </p>
                <p className="leading-relaxed text-alert-red-700 font-semibold">
                  ale jeśli dziś złożysz kolejny wniosek bez analizy,<br />
                  bank obniży Twój scoring nawet na 2 lata.
                </p>
              </div>

              <div className="bg-navy-900 text-white rounded-lg p-4 md:p-6 mt-6">
                <p className="leading-relaxed font-bold text-lg md:text-xl">
                  ⚡ Zrób analizę teraz — zanim system Cię „oznaczy"<br />
                  i zamknie drogę do finansowania.
                </p>
              </div>
            </div>

            {/* FOMO Bar */}
            <div className="mt-6 bg-gradient-to-r from-prestige-gold-100 to-alert-red-100 border-2 border-prestige-gold-500 rounded-lg p-5 text-center shadow-lg">
              <p className="text-lg md:text-xl font-black text-navy-900 mb-2">
                ⏳ Dostępnych tylko 20 analiz w tej cenie.
              </p>
              <p className="text-sm md:text-base text-alert-red-700 font-bold">
                🔥 Dziś zamówiono już 7.
              </p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-8 overflow-hidden">
            <Button size="lg" onClick={scrollToForm} className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-4 md:px-8 py-8 md:py-10 rounded-xl shadow-2xl md:hover:shadow-3xl transition-all duration-300 md:hover:scale-105 w-full">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl break-words whitespace-normal leading-snug">
                ✅ SPRAWDŹ, CO BANK WIDZI O TOBIE — ZA 29 ZŁ
              </span>
            </Button>
            <div className="mt-4 text-center text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
              <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
              <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
            </div>
          </div>

          {/* Client Testimonials Slider */}
          <div className="mb-12 rounded-xl p-6 md:p-10">
            <h3 className="font-montserrat text-lg md:text-xl font-bold text-navy-900 mb-6 text-center">
              ⭐ Tym klientom pomogłem i chcę pomóc Tobie
            </h3>
            
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {/* Testimonial 1 */}
                <CarouselItem>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <img src="/lovable-uploads/client-success-1.jpg" alt="Anna K." className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-success-green-400" />
                      <div className="text-center">
                        <div className="text-yellow-500 text-lg mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="text-base md:text-lg font-bold text-navy-900 italic">
                          "W końcu dostałam kredyt na mieszkanie!"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Testimonial 2 */}
                <CarouselItem>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <img src="/lovable-uploads/client-success-2.jpg" alt="Tomasz R." className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-business-blue-400" />
                      <div className="text-center">
                        <div className="text-yellow-500 text-lg mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="text-base md:text-lg font-bold text-navy-900 italic">
                          "Za 29 zł dowiedziałem się więcej niż w banku!"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Testimonial 3 */}
                <CarouselItem>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <img src="/lovable-uploads/client-success-3.jpg" alt="Katarzyna S." className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-success-green-400" />
                      <div className="text-center">
                        <div className="text-yellow-500 text-lg mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="text-base md:text-lg font-bold text-navy-900 italic">
                          "Teraz wiem, co poprawić!"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Testimonial 4 */}
                <CarouselItem>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <img src="/lovable-uploads/client-success-4.jpg" alt="Marek W." className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-business-blue-400" />
                      <div className="text-center">
                        <div className="text-yellow-500 text-lg mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="text-base md:text-lg font-bold text-navy-900 italic">
                          "Szybko i profesjonalnie!"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                {/* Testimonial 8 */}
                <CarouselItem>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
                    <div className="flex flex-col items-center gap-6">
                      <img src="/lovable-uploads/d4784a58-cbb3-4dfe-9f16-12f748e1bb90.png" alt="Robert Z." className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-lg border-4 border-business-blue-400" />
                      <div className="text-center">
                        <div className="text-yellow-500 text-lg mb-2">⭐⭐⭐⭐⭐</div>
                        <p className="text-base md:text-lg font-bold text-navy-900 italic">
                          "Polecam każdemu!"
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-0 md:-left-12 bg-success-green-600 hover:bg-success-green-700 text-white border-0" />
              <CarouselNext className="right-0 md:-right-12 bg-success-green-600 hover:bg-success-green-700 text-white border-0" />
            </Carousel>
          </div>

          {/* Order Form */}
          <div id="formularz-zamowienia" className="bg-white rounded-xl shadow-2xl p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-3 text-center">
              📝 Zrób pierwszy krok — zamów analizę już dziś
            </h3>
            <p className="text-center text-sm md:text-base text-warm-neutral-600 mb-6">
              Wypełnij formularz i przejdź do bezpiecznej płatności
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-warm-neutral-600">Postęp wypełnienia:</p>
                <p className="text-sm font-bold text-prestige-gold-700">{filledFields}/3</p>
              </div>
              <div className="w-full bg-warm-neutral-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-prestige-gold-500 to-success-green-500 h-3 rounded-full transition-all duration-300" style={{
                width: `${filledFields / 3 * 100}%`
              }} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-navy-900 font-semibold">
                  Imię i nazwisko *
                </Label>
                <Input id="name" type="text" required value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500" placeholder="Jan Kowalski" />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold">
                  Adres e-mail *
                </Label>
                <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500" placeholder="jan.kowalski@example.com" />
              </div>

              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold">
                  Numer telefonu *
                </Label>
                <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500" placeholder="+48 123 456 789" />
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-4 py-5 md:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                {isSubmitting ? "Przetwarzanie..." : <span className="text-base md:text-lg lg:text-xl">✅ Sprawdź swoją zdolność – za 29 zł</span>}
              </Button>

              {/* Payment methods */}
              <div className="mt-3 text-center text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
                <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
              </div>

              {/* Micro Copy Pod Przyciskiem */}
              
            </form>

          </div>

          {/* Bezpieczeństwo */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-warm-neutral-200">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              🔒 Bezpieczeństwo
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm md:text-lg text-navy-900">
                ✅ Gwarancja zwrotu pieniędzy w 14 dni
              </p>
              <p className="text-sm md:text-lg text-navy-900">
                ✅ Dane szyfrowane SSL
              </p>
              <p className="text-sm md:text-lg text-navy-900">
                ✅ Zwrot 29 zł przy rozpoczęciu współpracy
              </p>
            </div>

            {/* Simplified Security Statement */}
            <div className="text-center">
              <p className="text-base md:text-lg text-navy-900 font-semibold mb-4">
                🔐 Bezpieczna płatność chroniona przez TPay i szyfrowanie SSL
              </p>
              <img src="/logos/tpay-payment-methods.jpg" alt="TPay - Dostępne metody płatności" className="w-full max-w-[200px] md:max-w-[280px] mx-auto rounded-lg opacity-90" loading="lazy" />
            </div>
          </div>

          {/* Ratings Section */}
          

          {/* Gwarancja */}
          

          {/* Motivational Quote Before Form */}
          

          {/* Final CTA Button */}
          <div className="text-center mb-12 px-2">
            <Button size="lg" onClick={scrollToForm} className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-4 md:px-8 py-5 md:py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full">
              <span className="text-base md:text-lg lg:text-xl">
                ✅ ZAMÓW ANALIZĘ – ZA 29 ZŁ
              </span>
            </Button>
            <div className="mt-4 text-center text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
              <p className="font-semibold">💳 BLIK • Przelewy online • Karta płatnicza</p>
              <p className="mt-1">🔒 Bezpieczna płatność przez TPay • Zwrot 14 dni</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      {showSticky && <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-navy-900 border-t-2 border-prestige-gold-400 shadow-2xl p-3">
          <Button size="lg" onClick={scrollToForm} className="w-full bg-success-green-600 hover:bg-success-green-700 text-white font-bold py-4 rounded-xl shadow-xl">
            <span className="text-base">✅ ZAMÓW ZA 29 ZŁ</span>
          </Button>
        </div>}
    </div>;
};
export default OfertaD;