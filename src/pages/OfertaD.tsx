import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CheckCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
import { supabase } from '@/integrations/supabase/client';

const OfertaD = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
  const { formattedTime, timeLeft } = useCountdown({
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
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error: saveError } = await supabase.from('leads').insert({
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-warm-neutral-50 to-business-blue-50">
      {/* Logo Header */}
      <header className="pt-4 pb-3 px-4 bg-gradient-to-b from-warm-neutral-50 via-warm-neutral-100 to-warm-neutral-50 border-b border-warm-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          <img 
            src="/logos/skan-kredytowy-logo.png" 
            alt="Skan Kredytowy - Profesjonalna Analiza Kredytowa" 
            className="h-16 md:h-24 lg:h-28 flex-shrink-0" 
          />
          <div className="text-right flex-1">
            <h2 className="font-montserrat text-xs md:text-lg lg:text-xl xl:text-2xl font-bold text-navy-900 leading-tight">
              Jak sprawić, by bank w końcu powiedział<br />
              <span className="text-prestige-gold-600">„TAK"</span>
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Hook - Problem Statement */}
          <div className="text-center mb-6 md:mb-8">
            {/* Mini tagline */}
            <p className="text-sm md:text-base text-prestige-gold-700 font-semibold mb-3">
              💳 Odkryj, co naprawdę widzą o Tobie banki
            </p>
            
            <h1 className="font-montserrat leading-relaxed max-w-4xl mx-auto">
              <span className="block text-xl md:text-3xl lg:text-4xl font-bold text-navy-900 mb-3 md:mb-4 px-2">
                💥 Jak sprawić, by bank w końcu powiedział „TAK"
              </span>
              <span className="block text-base md:text-xl lg:text-2xl text-warm-neutral-700 mb-4 md:mb-6 px-2">
                …nawet jeśli wcześniej słyszałeś same odmowy
              </span>
            </h1>
            
            <div className="bg-warm-neutral-100 border-l-4 border-prestige-gold-500 p-4 md:p-6 rounded-lg mb-4 md:mb-6 text-left">
              <p className="text-base md:text-lg text-navy-900 leading-relaxed mb-3 md:mb-3">
                <strong>To nie Twoja zdolność jest problemem</strong> — to coś, czego bank Ci nigdy nie pokaże.
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed">
                Na co dzień ludzie płacą nam <strong className="text-prestige-gold-700">500 zł za godzinę konsultacji</strong>, żeby dowiedzieć się, co naprawdę blokuje ich kredyt.
                <span className="block mt-2 text-success-green-700 font-bold">Ty możesz mieć to samo — za 29 zł.</span>
              </p>
            </div>

            {/* CTA Above the Fold */}
            <div className="mb-4">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-6 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
              >
                <span className="text-base md:text-lg lg:text-xl">
                  👉 SPRAWDŹ ZA 29 ZŁ
                </span>
              </Button>
            </div>

            {/* Micro Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-warm-neutral-700 mb-10 md:mb-12 bg-warm-neutral-50 py-3 px-4 rounded-lg border border-warm-neutral-200">
              <div className="flex items-center gap-1">
                <span className="text-prestige-gold-500">⭐⭐⭐⭐⭐</span>
                <span className="font-semibold">15 000+ klientów</span>
              </div>
              <span>•</span>
              <span className="font-semibold">📊 Wynik w 24h</span>
              <span>•</span>
              <span className="font-semibold">💯 Zwrot pieniędzy 14 dni</span>
            </div>

            {/* Wyobraź sobie moment */}
            <div className="bg-gradient-to-br from-success-green-50 to-business-blue-50 rounded-xl p-4 md:p-8 mb-6 md:mb-8 border-2 border-success-green-300">
              <p className="text-lg md:text-xl font-semibold text-navy-900 mb-3 md:mb-4">
                Wyobraź sobie ten moment, gdy logujesz się do banku…
              </p>
              <p className="text-base md:text-lg text-navy-900 mb-3 md:mb-4">
                i zamiast kolejnego <span className="bg-destructive text-white px-2 py-1 rounded font-bold text-sm md:text-base">Odmowa</span> widzisz <span className="bg-success-green-500 text-white px-2 py-1 rounded font-bold text-sm md:text-base">Decyzja pozytywna</span>.
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
            
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-prestige-gold-400 mb-4 shadow-xl">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych" 
                  className="object-cover" 
                />
                <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
              </Avatar>
              <p className="text-sm md:text-base text-warm-neutral-600 font-semibold mb-4">
                Dariusz Wentrych — ekspert finansowy i autor bestsellera
              </p>

              {/* Authority Banner */}
              <div className="mb-5 bg-gradient-to-r from-prestige-gold-100 to-business-blue-100 px-6 py-3 rounded-lg border border-prestige-gold-300">
                <p className="text-base md:text-lg font-bold text-navy-900">
                  📘 Autor bestsellera „Nowe życie bez długów"
                </p>
                <p className="text-sm md:text-base text-warm-neutral-700 mt-1">
                  Dzięki jego metodom ponad 15 000 Polaków uzyskało kredyt w banku
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

            <div className="bg-warm-neutral-50 border-l-4 border-prestige-gold-400 p-5 rounded-r-lg">
              <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg mb-3">
                „Przez lata pracowałem po stronie banków.<br />
                Teraz pokazuję ludziom, jak system naprawdę ocenia ich zdolność.
              </p>
              <p className="text-navy-900 font-semibold text-base md:text-lg">
                Chcę Ci pomóc, żebyś nie był skazany na drogie pożyczki pozabankowe."
              </p>
              <p className="text-right text-warm-neutral-600 font-semibold mt-3">
                — Dariusz Wentrych
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
            <div className="text-center mb-8">
              <Button 
                size="lg" 
                onClick={scrollToForm}
                className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-8 py-5 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
              >
                <span className="text-base md:text-lg">
                  ✅ ZAMÓW ANALIZĘ ZA 29 ZŁ
                </span>
              </Button>
            </div>
          </div>

          {/* Comparison Table - Desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-6 text-center">
              💡 Wybierz swoją wersję
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-prestige-gold-100 to-business-blue-100">
                    <th className="p-3 text-left text-sm md:text-base font-semibold text-navy-900 border border-warm-neutral-300">
                      Zawartość
                    </th>
                    <th className="p-3 text-center text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300 relative bg-success-green-50 shadow-lg">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-success-green-500 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">
                        🟩 NAJCZĘŚCIEJ WYBIERANA
                      </div>
                      ANALIZA<br />KREDYTOWA 3K™
                    </th>
                    <th className="p-3 text-center text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300 opacity-80">
                      LIMITOWANA<br />EDYCJA VIP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🔍 Analiza Twojej sytuacji kredytowej
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🧾 Wskazanie błędów w rejestrach
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🎯 Plan poprawy scoringu
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🤝 Dostęp do sieci inwestorów
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-success-green-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      📘 Książka „Nowe życie bez długów" z autografem
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-400">
                      —
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-prestige-gold-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-warm-neutral-50">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      🖋️ Imienna dedykacja od Dariusza Wentrycha
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-400">
                      —
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-prestige-gold-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-3 text-sm md:text-base text-navy-900 border border-warm-neutral-300">
                      📸 Pamiątkowe zdjęcie z Dariuszem
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-warm-neutral-400">
                      —
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300 text-prestige-gold-700 font-bold text-lg">
                      ✓
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-warm-neutral-100 to-prestige-gold-100">
                    <td className="p-3 text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300">
                      💰 Łączna wartość
                    </td>
                    <td className="p-3 text-center text-base md:text-lg font-bold text-navy-900 border border-warm-neutral-300">
                      2 750 zł
                    </td>
                    <td className="p-3 text-center text-base md:text-lg font-bold text-navy-900 border border-warm-neutral-300">
                      3 750 zł
                    </td>
                  </tr>
                  <tr className="bg-gradient-to-r from-success-green-100 to-prestige-gold-100">
                    <td className="p-3 text-sm md:text-base font-bold text-navy-900 border border-warm-neutral-300">
                      💳 Cena
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300">
                      <p className="text-2xl md:text-3xl font-black text-success-green-700">29 zł</p>
                    </td>
                    <td className="p-3 text-center border border-warm-neutral-300">
                      <p className="text-2xl md:text-3xl font-black text-prestige-gold-700">199 zł</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border border-warm-neutral-300"></td>
                    <td className="p-4 text-center border border-warm-neutral-300 bg-success-green-50 shadow-xl">
                      <Button 
                        size="lg" 
                        onClick={scrollToForm}
                        className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-6 py-4 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 w-full hover:scale-105"
                      >
                        👉 WYBIERAM ANALIZĘ ZA 29 ZŁ
                      </Button>
                    </td>
                    <td className="p-4 text-center border border-warm-neutral-300 opacity-80">
                      <p className="text-warm-neutral-600 font-semibold italic text-sm mb-2">
                        VIP wyprzedane
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison Cards - Mobile */}
          <div className="md:hidden mb-8 space-y-4">
            <h3 className="font-montserrat text-xl font-bold text-navy-900 mb-6 text-center">
              💡 Wybierz swoją wersję
            </h3>

            {/* ANALIZA KREDYTOWA 3K Card */}
            <div className="bg-white rounded-xl shadow-2xl border-4 border-success-green-400 overflow-hidden relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-success-green-500 text-white px-4 py-1 rounded-full text-xs font-bold z-10 shadow-lg">
                🟩 NAJCZĘŚCIEJ WYBIERANA
              </div>
              <div className="bg-gradient-to-r from-success-green-100 to-prestige-gold-100 p-4 text-center mt-4">
                <h4 className="font-bold text-lg text-navy-900 mb-2">
                  ANALIZA KREDYTOWA 3K™
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
                <Button 
                  size="lg" 
                  onClick={scrollToForm}
                  className="w-full bg-success-green-600 hover:bg-success-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  👉 WYBIERAM ANALIZĘ ZA 29 ZŁ
                </Button>
              </div>
            </div>

            {/* LIMITOWANA EDYCJA VIP Card */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-warm-neutral-300 overflow-hidden opacity-75">
              <div className="bg-gradient-to-r from-warm-neutral-100 to-prestige-gold-100 p-4 text-center">
                <h4 className="font-bold text-lg text-navy-900 mb-2">
                  LIMITOWANA EDYCJA VIP
                </h4>
                <p className="text-sm text-warm-neutral-700 line-through">Wartość: 3 750 zł</p>
                <p className="text-3xl font-black text-prestige-gold-700 mt-2">199 zł</p>
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
                <div className="text-sm text-navy-900 font-semibold">
                  📘 Książka z autografem
                </div>
                <div className="text-sm text-navy-900 font-semibold">
                  🖋️ Imienna dedykacja
                </div>
                <div className="text-sm text-navy-900 font-semibold">
                  📸 Zdjęcie z Dariuszem
                </div>
              </div>

              <div className="p-4">
                <p className="text-center text-warm-neutral-600 font-semibold italic">
                  VIP wyprzedane
                </p>
              </div>
            </div>
          </div>

          {/* Co zawiera edycja VIP */}
          <div className="bg-gradient-to-br from-prestige-gold-50 to-warm-neutral-50 rounded-xl p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              🎁 Co zawiera edycja VIP
            </h3>
            
            <div className="space-y-3">
              <p className="text-base md:text-lg text-navy-900 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                📘 Książka „Nowe życie bez długów" z autografem
              </p>
              <p className="text-base md:text-lg text-navy-900 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                🖋️ Imienna dedykacja napisana przez Dariusza Wentrycha
              </p>
              <p className="text-base md:text-lg text-navy-900 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                📸 Pamiątkowe zdjęcie z Dariuszem
              </p>
            </div>

            <p className="text-center text-base md:text-lg font-bold text-alert-red-700 mt-6">
              💡 Edycja limitowana – aktualnie wyprzedana.
            </p>
          </div>

          {/* Dlaczego warto to zrobić teraz */}
          <div className="bg-gradient-to-r from-alert-red-50 to-prestige-gold-50 border-2 border-alert-red-300 rounded-xl p-6 md:p-8 mb-8">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              💡 Dlaczego warto to zrobić teraz
            </h3>
            
            <div className="space-y-4 text-base md:text-lg text-navy-900">
              <p className="leading-relaxed">
                Konsultacja z nami kosztuje <strong className="text-prestige-gold-700">500 zł/h</strong>.
              </p>
              <p className="leading-relaxed">
                Dzięki tej analizie otrzymujesz naszą wiedzę i plan działania<br />
                za ułamek tej ceny — <strong className="text-success-green-700">tylko 29 zł</strong>.
              </p>
              <p className="leading-relaxed text-alert-red-700 font-semibold">
                Możesz to odłożyć…<br />
                ale jeśli dziś złożysz kolejny wniosek bez analizy,<br />
                bank obniży Twój scoring nawet na 2 lata.
              </p>
              <p className="leading-relaxed font-bold text-navy-900 text-center text-lg md:text-xl">
                Zrób analizę teraz — zanim system Cię „oznaczy"<br />
                i zamknie drogę do finansowania.
              </p>
            </div>

            {/* FOMO Bar */}
            <div className="mt-6 bg-gradient-to-r from-prestige-gold-100 to-alert-red-100 border-2 border-prestige-gold-500 rounded-lg p-5 text-center shadow-lg">
              <p className="text-lg md:text-xl font-black text-navy-900 mb-2">
                ⏰ Zostało 37 z 100 analiz dostępnych w listopadzie
              </p>
              <p className="text-sm md:text-base text-alert-red-700 font-bold">
                ⚡ Oferta znika po wyczerpaniu limitu
              </p>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center mb-8">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-8 py-7 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              <span className="text-lg md:text-xl lg:text-2xl">
                ✅ SPRAWDŹ, CO BANK WIDZI O TOBIE – ZA 29 ZŁ
              </span>
            </Button>
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
                <div 
                  className="bg-gradient-to-r from-prestige-gold-500 to-success-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(filledFields / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-navy-900 font-semibold">
                  Imię i nazwisko *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500"
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold">
                  Adres e-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500"
                  placeholder="jan.kowalski@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold">
                  Numer telefonu *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 border-warm-neutral-300 focus:border-prestige-gold-500"
                  placeholder="+48 123 456 789"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-success-green-600 hover:bg-success-green-700 text-white font-bold py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {isSubmitting ? (
                  "Przetwarzanie..."
                ) : (
                  <span className="text-lg md:text-xl">✅ Sprawdź swoją zdolność – za 29 zł</span>
                )}
              </Button>

              {/* Micro Copy Pod Przyciskiem */}
              <div className="mt-4 bg-success-green-50 border border-success-green-300 rounded-lg p-3 text-center">
                <p className="text-sm md:text-base font-semibold text-success-green-700">
                  💯 Zwrot pieniędzy w 14 dni • 📊 Wynik w 24h
                </p>
              </div>
            </form>

            <div className="mt-6 space-y-2 text-center">
              <p className="text-sm md:text-base text-navy-900">
                🎁 Zwrot 29 zł przy rozpoczęciu współpracy
              </p>
              <p className="text-xs md:text-sm text-warm-neutral-600">
                💳 Bezpieczna płatność • ⚡ Natychmiastowy dostęp
              </p>
            </div>
          </div>

          {/* Bezpieczeństwo */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-warm-neutral-200">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              🔒 Bezpieczeństwo
            </h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-sm md:text-lg text-navy-900 flex items-start gap-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-success-green-600 flex-shrink-0 mt-1" />
                ✅ Gwarancja zwrotu pieniędzy w 14 dni
              </p>
              <p className="text-sm md:text-lg text-navy-900 flex items-start gap-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-success-green-600 flex-shrink-0 mt-1" />
                ✅ Dane szyfrowane SSL
              </p>
              <p className="text-sm md:text-lg text-navy-900 flex items-start gap-3">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-success-green-600 flex-shrink-0 mt-1" />
                ✅ Zwrot 29 zł przy rozpoczęciu współpracy
              </p>
            </div>

            {/* Simplified Security Statement */}
            <div className="text-center">
              <p className="text-base md:text-lg text-navy-900 font-semibold mb-4">
                🔐 Bezpieczna płatność chroniona przez TPay i szyfrowanie SSL
              </p>
              <img 
                src="/logos/tpay-payment-methods.jpg" 
                alt="TPay - Dostępne metody płatności" 
                className="w-full max-w-[200px] md:max-w-[280px] mx-auto rounded-lg opacity-90" 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Motivational Quote Before Form */}
          <div className="bg-gradient-to-br from-prestige-gold-100 to-business-blue-100 rounded-xl p-6 md:p-8 mb-8 border-2 border-prestige-gold-400 text-center">
            <p className="text-lg md:text-xl lg:text-2xl font-bold text-navy-900 italic leading-relaxed">
              „Nie ma sytuacji bez wyjścia.<br />
              Jest tylko brak wiedzy, co zrobić jako pierwsze."
            </p>
            <p className="text-base md:text-lg text-warm-neutral-700 font-semibold mt-4">
              — Dariusz Wentrych
            </p>
          </div>

          {/* Final CTA Button */}
          <div className="text-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-success-green-600 hover:bg-success-green-700 text-white font-bold px-8 py-6 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full md:w-auto"
            >
              <span className="text-lg md:text-xl">
                ✅ ZAMÓW ANALIZĘ – ZA 29 ZŁ
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t-2 border-prestige-gold-400 shadow-2xl p-3">
          <Button
            size="lg"
            onClick={scrollToForm}
            className="w-full bg-success-green-600 hover:bg-success-green-700 text-white font-bold py-4 rounded-xl shadow-xl"
          >
            <span className="text-base">✅ ZAMÓW ZA 29 ZŁ</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OfertaD;
