import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Shield, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
const AnalizaKredytowa = () => {
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
  
  // Main CTA text
  const ctaText = "Sprawdź swoją zdolność - 29 zł";
  
  // Countdown timer (12 hours)
  const { formattedTime, timeLeft } = useCountdown({
    initialTime: 12 * 60 * 60, // 12 hours in seconds
    storageKey: 'analiza_kredytowa_timer'
  });

  // Live social proof simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersToday(prev => Math.min(prev + 1, 99));
    }, Math.random() * 180000 + 120000); // Random between 2-5 minutes
    
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
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
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
  const benefits = ["Ocenimy Twoje możliwości kredytowania na podstawie danych i historii płatniczej", "Wskażemy błędy i czynniki ryzyka, które obniżają Twoją wiarygodność", "Przeanalizujemy informacje ze wszystkich rejestrów kredytowych i baz danych", "Zaproponujemy czyszczenie rejestrów — największe know-how w Polsce w tej dziedzinie", "Pokażemy, co można poprawić, by zwiększyć szanse na kredyt w banku", "Jeśli będzie to możliwe, skontaktujemy Cię z naszą bazą prywatnych inwestorów", "Dostęp do prywatnego finansowania do poziomu 200 000 zł na najlepszych warunkach", "Zaproponujemy najlepszy kierunek działania dopasowany do Twojej sytuacji"];
  const premiumAdvantages = [{
    label: "Obsługa indywidualna",
    icon: CheckCircle
  }, {
    label: "Dostęp do finansowania do 200 000 zł",
    icon: CheckCircle
  }, {
    label: "Najlepsze know-how finansowe w Polsce",
    icon: CheckCircle
  }, {
    label: "Zaufanie ponad 15.000 osób",
    icon: CheckCircle
  }, {
    label: "Setki pozytywnych opinii i historii",
    icon: CheckCircle
  }];
  return <div className="min-h-screen bg-gradient-to-b from-white via-warm-neutral-50 to-business-blue-50">
      
      {/* Logo Header */}
      <header className="pt-4 pb-3 px-4 bg-white border-b border-warm-neutral-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 md:gap-6">
          <img src="/logos/kredyt-scan-logo.jpg" alt="Kredyt Scan - Profesjonalna Analiza Kredytowa" className="h-16 md:h-24 lg:h-28 flex-shrink-0" />
          <div className="text-right flex-1">
            <h2 className="font-montserrat text-xs md:text-lg lg:text-xl xl:text-2xl font-bold text-navy-900 leading-tight">
              Bank odmówił Ci kredytu?<br />
              <span className="text-prestige-gold-600">Dowiedz się, co Cię blokuje i jak to naprawić.</span>
            </h2>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-4 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Benefit Headline */}
          <div className="text-center mb-6">
            <h1 className="font-montserrat text-2xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-3 leading-tight">
              Dowiedz się, dlaczego bank lub firma pożyczkowa mówi „nie" i co zrobić, żeby następnym razem powiedziała „tak".
            </h1>
          </div>

          {/* Problem Statement */}
          <div className="bg-warm-neutral-100 border-l-4 border-alert-red-500 p-6 rounded-lg mb-8">
            <p className="text-lg font-semibold text-navy-900 mb-3">
              Bank odmówił Ci kredytu?<br />
              Chcesz zamienić pożyczki, aby dostać finansowanie w banku?
            </p>
            <p className="text-warm-neutral-700 leading-relaxed">
              <strong>Nie działaj po omacku</strong> — najpierw dowiedz się, co naprawdę wpływa na Twoją zdolność kredytową i co możesz poprawić, zanim złożysz kolejny wniosek i <strong className="text-alert-red-700">na lata zablokujesz sobie dostęp do korzystnych ofert bankowych</strong>.
            </p>
          </div>

          {/* Expert Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-200">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-prestige-gold-400 mb-4 shadow-xl">
                <AvatarImage src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="object-cover" />
                <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold text-navy-900 text-xl md:text-2xl mb-2">👤 Dariusz Wentrych</p>
                <p className="text-warm-neutral-700 mb-2 text-base md:text-lg font-semibold">
                  Ekspert finansowy z <span className="text-prestige-gold-600">20-letnim doświadczeniem</span>
                </p>
                <p className="text-prestige-gold-600 font-bold text-base md:text-lg mb-3">
                  Autor bestsellera „Nowe życie bez długów"
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm md:text-base text-navy-900 font-semibold">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-green-600" />
                    20 lat doświadczenia
                  </span>
                  <span className="hidden sm:inline text-warm-neutral-400">•</span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success-green-600" />
                    15.000+ klientów
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-warm-neutral-50 border-l-4 border-prestige-gold-400 p-5 rounded-r-lg mb-5">
              <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg">
                „Widziałem setki przypadków, gdzie ludzie mieli złych doradców i popełnili błędy, które kosztowały ich utratę finansowania w banku — bo korzystali z darmowych porad w internecie."
              </p>
            </div>

            <p className="text-warm-neutral-700 leading-relaxed mb-3 text-center">
              Dowiesz się prawdy o swojej sytuacji finansowej i unikniesz błędów, które eliminują Cię z systemu bankowego.
            </p>
            <p className="text-navy-900 font-semibold leading-relaxed text-center">
              Nawet jeśli masz chwilówki — pomożemy Ci uporządkować sytuację. <strong className="text-success-green-700">Jest rozwiązanie. Jest nadzieja.</strong>
            </p>
          </div>

          {/* Micro Summary - Co otrzymasz */}
          <div className="bg-gradient-to-r from-prestige-gold-50 to-business-blue-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              💼 Co otrzymasz:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Analizę swojej sytuacji kredytowej</strong> — zobaczysz, jak oceniają Cię banki
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Wskazanie błędów we wszystkich rejestrach kredytowych</strong> — dowiesz się, co Cię blokuje
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Konkretny plan krok po kroku</strong>, jak poprawić zdolność i zwiększyć szanse na kredyt
                </p>
              </div>
            </div>
          </div>

          {/* Urgency & Scarcity */}
          <div className="bg-gradient-to-r from-alert-red-50 to-prestige-gold-50 border-2 border-alert-red-300 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm md:text-base font-semibold text-navy-900 mb-2">
              ⏰ Oferta ważna przez kolejne: <span className="text-alert-red-700 font-bold text-lg md:text-xl">{Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </p>
            <p className="text-xs md:text-sm text-warm-neutral-700">
              🔥 Dziś zamówiono już <span className="font-bold text-prestige-gold-700">{ordersToday} analiz</span>
            </p>
          </div>

          {/* CTA #1 - Hero Section */}
          <div className="text-center px-2">
            <a href="#formularz-zamowienia" className="block">
              <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-4 py-6 md:px-6 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto min-h-[64px] md:min-h-[72px] flex flex-col items-center gap-1">
                <span className="text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                  💳 Zapłać BLIK - tylko 29 zł
                </span>
              </Button>
            </a>
            <div className="mt-4 space-y-2">
              <p className="text-sm md:text-base font-semibold text-success-green-700">
                💯 Gwarancja zwrotu w 14 dni
              </p>
              <p className="text-sm md:text-base text-navy-900">
                🎁 Zwrot 29 zł przy rozpoczęciu współpracy
              </p>
              <p className="text-xs md:text-sm text-warm-neutral-600">
                💳 Bezpieczna płatność • ⚡ Natychmiastowy dostęp
              </p>
            </div>


            {/* Mini-testimonials Carousel - After Hero CTA */}
            <div className="mt-8 bg-white rounded-xl p-5 md:p-6 shadow-xl border-2 border-prestige-gold-200">
              <p className="text-xs md:text-sm text-warm-neutral-600 text-center mb-5 flex items-center justify-center gap-2">
                <span className="text-prestige-gold-500 text-lg">⭐⭐⭐⭐⭐</span>
                <span className="font-semibold">Prawdziwe historie naszych klientów:</span>
              </p>
              
              <div className="space-y-5">
                {/* Opinia 1: BNPL Problem */}
                <div className="bg-gradient-to-br from-warm-neutral-50 to-prestige-gold-50 rounded-lg p-4 border-l-4 border-prestige-gold-500">
                  <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                    "Korzystałam z odroczonych płatności i nie wiedziałam, że opóźnienia zablokują mi dostęp do banków. <strong>Dzięki Panu Dariuszowi i jego zespołowi udało mi się uzyskać kredyt w banku</strong> mimo wcześniejszych odmów."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-prestige-gold-400 flex items-center justify-center text-white font-bold text-sm">
                      J
                    </div>
                    <p className="text-xs md:text-sm text-warm-neutral-600 font-semibold">Joanna M., Poznań</p>
                  </div>
                </div>

                {/* Opinia 2: Konsolidacja długów */}
                <div className="bg-gradient-to-br from-business-blue-50 to-warm-neutral-50 rounded-lg p-4 border-l-4 border-business-blue-500">
                  <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                    {"Miałam 5 chwilówek i nie wiedziałam jak z tego wyjść. "}<strong className="text-alert-red-600">{"Spłacałam 2000 zł odsetek miesięcznie"}</strong>{". Po analizie Pan Dariusz pokazał mi jak skonsolidować wszystko w jeden kredyt. "}<strong className="text-success-green-700">{"Teraz płacę 600 zł i mam spokój."}</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-business-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <p className="text-xs md:text-sm text-warm-neutral-600 font-semibold">Anna W., Łódź</p>
                  </div>
                </div>

                {/* Opinia 3: Młody klient */}
                <div className="bg-gradient-to-br from-success-green-50 to-warm-neutral-50 rounded-lg p-4 border-l-4 border-success-green-500">
                  <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                    "Bank odmówił mi kredytu na mieszkanie i byłem zdruzgotany. Pan Dariusz pokazał mi konkretnie co poprawić. <strong className="text-success-green-700">Po 4 miesiącach kupiłem swoje pierwsze M.</strong> Najlepsza decyzja!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-success-green-500 flex items-center justify-center text-white font-bold text-sm">
                      T
                    </div>
                    <p className="text-xs md:text-sm text-warm-neutral-600 font-semibold">Tomasz R., 28 lat, Kraków</p>
                  </div>
                </div>

                {/* Opinia 4: Po rozwodzie */}
                <div className="bg-gradient-to-br from-warm-neutral-50 to-prestige-gold-50 rounded-lg p-4 border-l-4 border-prestige-gold-500 hidden lg:block">
                  <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                    "Po rozwodzie zostałam z długami męża w rejestrach. Myślałam, że już nigdy nie dostanę kredytu. <strong>Zespół Kredyt Studio pokazał mi krok po kroku co zrobić.</strong> Dzisiaj mam własne mieszkanie."
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-prestige-gold-400 flex items-center justify-center text-white font-bold text-sm">
                      K
                    </div>
                    <p className="text-xs md:text-sm text-warm-neutral-600 font-semibold">Katarzyna S., Wrocław</p>
                  </div>
                </div>

                {/* Opinia 5: Starszy klient */}
                <div className="bg-gradient-to-br from-business-blue-50 to-warm-neutral-50 rounded-lg p-4 border-l-4 border-business-blue-500 hidden lg:block">
                  <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                    "W wieku 56 lat myślałem, że to koniec z kredytami. Pan Dariusz udowodnił, że się myliłem. <strong className="text-success-green-700">Refinansowałem hipotekę i oszczędzam 800 zł miesięcznie.</strong>"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-business-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <p className="text-xs md:text-sm text-warm-neutral-600 font-semibold">Andrzej P., Warszawa</p>
                  </div>
                </div>
              </div>

              {/* CTA w testimonials */}
              <div className="mt-6 text-center">
                <p className="text-xs text-warm-neutral-600 mb-3">
                  👆 <strong>Dołącz do ponad 15.000 zadowolonych klientów</strong>
                </p>
                <Button 
                  onClick={() => document.getElementById('formularz-zamowienia')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Zamów swoją analizę za 29 zł
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Section - Dariusz */}
      <section className="py-12 px-4 bg-gradient-to-br from-warm-neutral-50 to-prestige-gold-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white to-prestige-gold-50/30 rounded-2xl shadow-2xl p-8 md:p-12 border-2 border-prestige-gold-300">
            
            {/* Expert Header */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6 p-5 rounded-xl bg-gradient-to-br from-business-blue-700 via-business-blue-800 to-navy-900 text-white shadow-xl">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-business-blue-500 shadow-xl ring-4 ring-prestige-gold-200">
                <AvatarImage src="/src/assets/dariusz-expert-portrait-2.jpg" alt="Dariusz Wentrych - Ekspert Finansowy" className="object-cover" />
                <AvatarFallback className="text-xl font-bold bg-business-blue-500 text-white">DW</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h3 className="font-montserrat text-xl md:text-2xl font-bold text-white mb-1">
                  Dariusz Wentrych
                </h3>
                <p className="text-white text-sm md:text-base mb-1">
                  Ekspert finansowy • 20 lat doświadczenia • 15.000+ klientów
                </p>
                <p className="text-white font-semibold text-sm md:text-base">
                  Autor "Nowe życie bez długów"
                </p>
              </div>
            </div>

            {/* Ostrzeżenie - zmodernizowany layout */}
            <div className="space-y-6 mb-8">
              {/* Główne ostrzeżenie */}
              <div className="bg-gradient-to-br from-alert-red-50 via-alert-red-100 to-alert-red-200 p-8 rounded-2xl shadow-2xl text-navy-900">
                <h4 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
                  ⚠️ Jedna błędna decyzja = lata skazania na drogie parabanki
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-warm-neutral-200 shadow-sm">
                    <div className="space-y-3 text-navy-900">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">✘</span>
                        <p className="text-sm md:text-base">Składasz wnioski na ślepo → kolejne odmowy</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">✘</span>
                        <p className="text-sm md:text-base">Każda odmowa obniża scoring kredytowy</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">✘</span>
                        <p className="text-sm md:text-base">Odbudowa trwa lata, nie miesiące</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-warm-neutral-200 shadow-sm">
                    <div className="space-y-3 text-navy-900">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">→</span>
                        <p className="text-sm md:text-base">Banki odrzucają Cię automatycznie</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-xl">→</span>
                        <p className="text-sm md:text-base">Zostają tylko parabanki z odsetkami 10x wyższymi</p>
                      </div>
                      <div className="pt-2 border-t border-warm-neutral-300">
                        <p className="text-sm md:text-base font-bold text-navy-900">💰 Dziesiątki tysięcy złotych przepalonych na odsetkach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cytat Dariusza - elegancki design */}
              <div className="relative bg-gradient-to-br from-prestige-gold-50 to-white rounded-2xl shadow-xl overflow-hidden border-2 border-prestige-gold-300">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-prestige-gold-500 to-prestige-gold-600"></div>
                <div className="p-6 md:p-8 pl-8">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-6xl text-prestige-gold-400 leading-none font-serif">"</span>
                    <p className="text-base md:text-lg text-navy-900 italic leading-relaxed pt-4">
                      Nie popełniaj błędów innych ludzi. Bez analizy zostaniesz skazany tylko na drogie firmy parabankowe — a to kosztuje Cię tysiące złotych rocznie.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pl-12">
                    <Avatar className="w-12 h-12 border-2 border-prestige-gold-400">
                      <AvatarImage src="/src/assets/dariusz-expert-portrait-2.jpg" alt="Dariusz Wentrych" />
                      <AvatarFallback className="bg-prestige-gold-500 text-white">DW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-navy-900">Dariusz Wentrych</p>
                      <p className="text-sm text-warm-neutral-600">20 lat doświadczenia</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Końcowe CTA */}
              <div className="bg-gradient-to-r from-navy-900 to-business-blue-900 p-6 rounded-2xl shadow-xl text-center">
                <p className="text-xl md:text-2xl font-bold text-white mb-2">
                  Pytanie nie brzmi "czy warto za 29 zł"
                </p>
                <p className="text-lg md:text-xl text-prestige-gold-300 font-semibold">
                  Pytanie brzmi: czy stać Cię na kolejne lata w parabankach?
                </p>
              </div>
            </div>

            {/* Social Proof - Media */}
            <div className="border-t border-warm-neutral-200 pt-8 mb-8">
              <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-4 text-center">
                Mówili o mnie:
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                
                <img src="/media-logos/logo-fakt.svg" alt="Fakt" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all" loading="lazy" />
                <img src="/media-logos/logo-tvn.png?v=1" alt="TVN" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all" loading="lazy" />
                <img src="/media-logos/logo-tvp.png" alt="TVP" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all" loading="lazy" />
                <img src="/media-logos/logo-dziennik.png" alt="Dziennik Polski" className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all" loading="lazy" />
              </div>
            </div>

            {/* Opinie klientów - Carousel */}
            <div className="border-t border-warm-neutral-200 pt-8">
              <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-6 text-center">
                Co mówią klienci:
              </h4>
              <Carousel className="w-full max-w-3xl mx-auto" opts={{
              align: "start",
              loop: true
            }}>
                <CarouselContent>
                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Dzięki analizie Dariusza dowiedziałem się, co naprawdę blokuje mi dostęp do kredytu. Uporządkowałem swoje finanse i dostałem kredyt na mieszkanie!"
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Tomasz K., Warszawa</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Otrzymałam więcej informacji niż z trzech wizyt w banku. Profesjonalnie, konkretnie i skutecznie."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Anna M., Kraków</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Myślałem, że mam negatywną historię i już nigdy nie dostanę kredytu. Po analizie i czyszczeniu rejestrów dostałem finansowanie na rozwój firmy."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Marcin P., Gdańsk</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Najlepsza inwestycja w swoje finanse! Dariusz pokazał mi błędy, których sam bym nigdy nie zauważył."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Katarzyna S., Wrocław</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-prestige-gold-50 to-white p-6 md:p-8 rounded-lg border-2 border-prestige-gold-300 shadow-md mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Miałem chwilówki i myślałem, że to koniec. Pan Dariusz pokazał mi plan wyjścia z długów. Dziś mam kredyt konsolidacyjny z banku i oddycham z ulgą."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Robert D., Poznań</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-business-blue-50 to-white p-6 md:p-8 rounded-lg border-2 border-business-blue-400 shadow-md mx-2">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-prestige-gold-500 text-lg">★</span>)}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Byłam w różnych firmach doradczych, ale słabo się zajęli moją sprawą. <strong className="text-business-blue-700">Pan Dariusz i Pani Ania zajęli się mną tak jak nikt inny</strong> — odpowiadali na każde pytanie i prowadzili mnie krok po kroku."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Magdalena W., Katowice</p>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-0 md:left-2" />
                <CarouselNext className="right-0 md:right-2" />
              </Carousel>
              
              {/* Wskaźnik - przewiń dla więcej */}
              <p className="text-center text-sm text-warm-neutral-500 mt-4 md:hidden">
                ← Przesuń palcem, aby zobaczyć więcej opinii →
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-3 text-center">
            Co zrobimy dla Ciebie w ramach analizy
          </h2>
          <p className="text-center text-warm-neutral-600 text-lg mb-12">
            Zobacz, co sprawdzimy i poprawimy w Twojej sytuacji
          </p>

          {/* Sekcja 1: Analiza Twojej sytuacji */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border-l-4 border-business-blue-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🧩</span>
              <h3 className="font-montserrat text-2xl font-bold text-navy-900">
                1. Analiza Twojej sytuacji
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-business-blue-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Ocenimy Twoje możliwości kredytowania na podstawie danych i historii płatniczej
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-business-blue-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Wskażemy błędy i czynniki ryzyka, które obniżają Twoją wiarygodność
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-business-blue-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Przeanalizujemy informacje ze wszystkich rejestrów kredytowych i baz danych
                </p>
              </div>
            </div>
          </div>

          {/* Sekcja 2: Poprawa i działania naprawcze */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6 border-l-4 border-prestige-gold-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💡</span>
              <h3 className="font-montserrat text-2xl font-bold text-navy-900">
                2. Poprawa i działania naprawcze
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Zaproponujemy czyszczenie rejestrów — największe know-how w Polsce w tej dziedzinie
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Pokażemy, co można poprawić, by zwiększyć szanse na kredyt w banku
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-prestige-gold-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Zaproponujemy najlepszy kierunek działania dopasowany do Twojej sytuacji
                </p>
              </div>
            </div>
          </div>

          {/* Sekcja 3: Dodatkowe możliwości finansowania */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 border-l-4 border-success-green-500">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💰</span>
              <h3 className="font-montserrat text-2xl font-bold text-navy-900">
                3. Dodatkowe możliwości finansowania
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Jeśli będzie to możliwe, skontaktujemy Cię z naszą bazą prywatnych inwestorów
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Dostęp do prywatnego finansowania do poziomu 200 000 zł na najlepszych warunkach
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  Pomożemy Ci uzyskać dostęp do rozwiązań, które wspierają drogę do finansowej stabilności
                </p>
              </div>
            </div>
          </div>

          {/* Emocjonalne zakończenie z CTA */}
          <div className="bg-gradient-to-br from-navy-900 to-business-blue-900 rounded-2xl shadow-2xl p-8 md:p-10 text-center">
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
              🔎 Poznaj prawdę o swojej zdolności kredytowej
            </h3>
            <p className="text-warm-neutral-100 text-lg md:text-xl mb-8 leading-relaxed">
              Dowiedz się, co widzą o Tobie banki — <strong className="text-prestige-gold-400">zanim złożysz kolejny wniosek</strong>
            </p>

            {/* CTA #2 - Po sekcji co otrzymasz */}
            <div className="px-2">
              <a href="#formularz-zamowienia" className="block">
                <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-4 py-5 md:px-6 md:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto flex flex-col items-center gap-1">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                    Zobacz, co widzi o Tobie bank
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-normal opacity-90">
                    wynik w 24h
                  </span>
                </Button>
              </a>
              <p className="mt-4 text-xs md:text-sm text-warm-neutral-300">
                ✅ Bezpieczna płatność • ⚡ Natychmiastowy dostęp
              </p>
            </div>
          </div>

          {/* Premium Benefits - What You GET */}
          <div className="bg-gradient-to-br from-success-green-50 to-prestige-gold-50 rounded-2xl shadow-lg p-8 border-2 border-success-green-200 mb-8">
            <h3 className="font-montserrat text-2xl font-bold text-navy-900 mb-6 text-center">
              ✅ Co otrzymujesz za 29 zł:
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {premiumAdvantages.map((advantage, index) => <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <advantage.icon className="w-5 h-5 text-success-green-600 flex-shrink-0" />
                  <span className="text-navy-900 font-semibold">{advantage.label}</span>
                </div>)}
            </div>

            <p className="text-center text-warm-neutral-700 text-lg leading-relaxed">
              Otrzymujesz profesjonalną analizę PLUS dostęp do ekskluzywnej sieci prywatnych inwestorów i finansowania, które uporządkują Twoje finanse na najlepszych warunkach.
            </p>
          </div>

          {/* Warning - What You MISS with Free Services */}
          <div className="bg-gradient-to-br from-alert-red-50 to-warm-neutral-50 rounded-2xl shadow-lg p-4 md:p-8 border-2 border-alert-red-300">
            <h3 className="font-montserrat text-2xl font-bold text-alert-red-700 mb-6 text-center">
              ⚠️ Czego NIE DOSTANIESZ korzystając z darmowych usług:
            </h3>
            
            {/* Tabela porównawcza */}
            <div className="mb-8 overflow-hidden rounded-xl border-2 border-warm-neutral-300 bg-white">
              <div className="grid grid-cols-2">
                {/* Nagłówki */}
                <div className="bg-alert-red-100 p-4 md:p-5 border-r border-warm-neutral-300">
                  <h4 className="font-montserrat font-bold text-center text-alert-red-700 text-sm md:text-base">
                    ❌ Darmowe usługi
                  </h4>
                </div>
                <div className="bg-success-green-100 p-4 md:p-5">
                  <h4 className="font-montserrat font-bold text-center text-success-green-700 text-sm md:text-base">
                    ✅ Kredyt Scan
                  </h4>
                </div>

                {/* Wiersz 1 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Ogólnikowe porady
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ Indywidualna analiza
                  </p>
                </div>

                {/* Wiersz 2 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Brak analizy rejestrów
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ Pełna analiza wszystkich rejestrów kredytowych
                  </p>
                </div>

                {/* Wiersz 3 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Ryzyko złych rad
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ 20 lat doświadczenia
                  </p>
                </div>

                {/* Wiersz 4 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Brak dostępu do inwestorów
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ Dostęp do prywatnych inwestorów
                  </p>
                </div>

                {/* Wiersz 5 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Ukryte koszty prowizji
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ Transparentna cena
                  </p>
                </div>

                {/* Wiersz 6 */}
                <div className="p-4 md:p-5 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700 leading-relaxed">
                    ❌ Brak konkretnego planu
                  </p>
                </div>
                <div className="p-4 md:p-5 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900 leading-relaxed">
                    ✅ Krok po kroku plan działania
                  </p>
                </div>
              </div>
            </div>

            {/* Sekcja rozszerzonej interpretacji */}
            <div className="mt-8 space-y-4">
              <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-6 text-center">
                🔍 Co to oznacza w praktyce:
              </h4>

              {/* Punkt 1 */}
              <div className="bg-white p-4 md:p-5 rounded-lg border-l-4 border-alert-red-400 shadow-sm">
                <h5 className="font-bold text-navy-900 mb-2 text-sm md:text-base">
                  ❌ Darmowe usługi — brzmi dobrze, ale...
                </h5>
                <p className="text-warm-neutral-700 text-sm leading-relaxed mb-1">
                  Po zebraniu danych dostajesz reklamy zamiast pomocy.
                </p>
                <p className="text-warm-neutral-700 text-sm leading-relaxed font-semibold">
                  U nas płacisz raz – i masz konkretną analizę.
                </p>
              </div>

              {/* Punkt 2 */}
              <div className="bg-white p-4 md:p-5 rounded-lg border-l-4 border-prestige-gold-400 shadow-sm">
                <h5 className="font-bold text-navy-900 mb-2 text-sm md:text-base">
                  ❌ Ogólnikowe porady vs ✅ Indywidualna analiza
                </h5>
                <p className="text-warm-neutral-700 text-sm leading-relaxed mb-1">
                  Porady z internetu nie dotyczą Ciebie.
                </p>
                <p className="text-warm-neutral-700 text-sm leading-relaxed font-semibold">
                  My analizujemy Twoją faktyczną sytuację.
                </p>
              </div>

              {/* Punkt 3 */}
              <div className="bg-white p-4 md:p-5 rounded-lg border-l-4 border-business-blue-400 shadow-sm">
                <h5 className="font-bold text-navy-900 mb-2 text-sm md:text-base">
                  ❌ Brak analizy rejestrów vs ✅ Pełna analiza wszystkich rejestrów kredytowych
                </h5>
                <p className="text-warm-neutral-700 text-sm leading-relaxed mb-1">
                  Darmowe firmy tego nie robią.
                </p>
                <p className="text-warm-neutral-700 text-sm leading-relaxed font-semibold">
                  My pokażemy Ci, jak widzi Cię bank.
                </p>
              </div>

              {/* Punkt 4 */}
              <div className="bg-white p-4 md:p-5 rounded-lg border-l-4 border-alert-red-400 shadow-sm">
                <h5 className="font-bold text-navy-900 mb-2 text-sm md:text-base">
                  ❌ Ryzyko złych rad vs ✅ 20 lat doświadczenia
                </h5>
                <p className="text-warm-neutral-700 text-sm leading-relaxed mb-1">
                  Złe decyzje mogą Cię kosztować lata.
                </p>
                <p className="text-warm-neutral-700 text-sm leading-relaxed font-semibold">
                  U nas analizę wykonują eksperci.
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-8">
              
            </div>

            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-alert-red-100 rounded-xl border-2 border-alert-red-300">
              <p className="text-center text-navy-900 font-bold text-lg leading-relaxed">
                <strong className="text-alert-red-700">Nie ryzykuj swojej przyszłości finansowej.</strong><br />
                Otrzymujesz pewność, profesjonalizm i dostęp do prawdziwych rozwiązań.
              </p>
            </div>

            {/* CTA #3 - Po sekcji co NIE dostaniesz za darmo */}
            <div className="text-center mt-8 px-2">
              <a href="#formularz-zamowienia" className="block">
                <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-4 py-5 md:px-6 md:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto flex flex-col items-center gap-1">
                  <span className="text-base sm:text-lg md:text-xl lg:text-2xl leading-tight">
                    Sprawdź bez ryzyka
                  </span>
                  <span className="text-sm sm:text-base md:text-lg font-normal opacity-90">
                    analiza tylko <span className="text-success-green-400 font-extrabold">29 zł</span>
                  </span>
                </Button>
              </a>
              <p className="mt-4 text-xs md:text-sm text-warm-neutral-600">
                💬 To tylko 29 zł – bez ukrytych kosztów
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="formularz-zamowienia" className="py-16 px-4 bg-gradient-to-br from-navy-900 via-business-blue-900 to-navy-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="inline-block bg-alert-red-100 text-alert-red-700 px-4 py-2 rounded-full mb-4">
                <span className="font-bold text-sm">ZRÓB PIERWSZY KROK TERAZ</span>
              </div>
              <h2 className="font-montserrat text-3xl font-bold text-navy-900 mb-3">
                Zamów swoją analizę
              </h2>
              <p className="text-warm-neutral-600">
                Wypełnij formularz i opłać — analiza w ciągu 24h
              </p>
            </div>

            {/* Social Proof Above Form */}
            <div className="bg-gradient-to-r from-success-green-600 to-business-blue-600 border-2 border-success-green-300 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm md:text-base font-bold text-white flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                Zaufało nam już <span className="text-white text-lg md:text-xl font-extrabold">15 247 klientów</span>
              </p>
            </div>

            {/* Micro-Incentive */}
            <div className="bg-gradient-to-r from-prestige-gold-50 to-success-green-50 border-2 border-prestige-gold-400 rounded-xl p-4 mb-6 text-center">
              <p className="text-sm md:text-base font-bold text-navy-900 mb-1">
                🎁 BONUS: Dostęp do prywatnego klubu inwestorów Dariusz Wentrycha z Kredyt Studio
              </p>
              <p className="text-xs md:text-sm text-warm-neutral-700">
                i dostęp do prywatnego finansowania na najlepszych warunkach
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-warm-neutral-600 mb-2">
                  <span>Krok {filledFields} z 3</span>
                  <span>{Math.round((filledFields / 3) * 100)}% ukończono</span>
                </div>
                <div className="w-full bg-warm-neutral-200 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-prestige-gold-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{width: `${(filledFields / 3) * 100}%`}}
                  />
                </div>
              </div>
              {/* Email - PIERWSZE (łatwe, autofill, auto-focus) */}
              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold mb-2 block text-base">
                  Email *
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  autoFocus
                  autoComplete="email"
                  required 
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                  placeholder="twoj@email.pl" 
                  className="h-14 text-lg" 
                />
                {/* Inline Validation - Email */}
                {formData.email && (
                  <p className={`text-xs mt-1 flex items-center gap-1 transition-all ${
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? 'text-success-green-600'
                      : 'text-alert-red-600'
                  }`}>
                    {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? (
                      <><CheckCircle className="w-3 h-3" /> Poprawny email ✓</>
                    ) : (
                      <><AlertCircle className="w-3 h-3" /> Niepoprawny format email</>
                    )}
                  </p>
                )}
              </div>

              {/* Telefon - DRUGIE (numeric keyboard) */}
              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold mb-2 block text-base">
                  Telefon *
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  inputMode="tel"
                  autoComplete="tel"
                  required 
                  pattern="[0-9]{9,}"
                  value={formData.phone} 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  placeholder="123 456 789" 
                  className="h-14 text-lg" 
                />
                {/* Inline Validation - Phone */}
                {formData.phone && (
                  <p className={`text-xs mt-1 flex items-center gap-1 transition-all ${
                    /^[0-9]{9,}$/.test(formData.phone)
                      ? 'text-success-green-600'
                      : 'text-alert-red-600'
                  }`}>
                    {/^[0-9]{9,}$/.test(formData.phone) ? (
                      <><CheckCircle className="w-3 h-3" /> Poprawny numer ✓</>
                    ) : (
                      <><AlertCircle className="w-3 h-3" /> Minimum 9 cyfr</>
                    )}
                  </p>
                )}
              </div>

              {/* Imię i nazwisko - TRZECIE (ostatnie) */}
              <div>
                <Label htmlFor="name" className="text-navy-900 font-semibold mb-2 block text-base">
                  Imię i nazwisko *
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  autoComplete="name"
                  required 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  placeholder="Jan Kowalski" 
                  className="h-14 text-lg" 
                />
              </div>

              {/* Submit Button with A/B Test and Animation */}
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 mt-6 mb-4 min-h-[64px] md:min-h-[72px] text-base md:text-2xl leading-tight whitespace-normal"
              >
                {isSubmitting ? '💳 Przekierowuję...' : ctaText}
              </Button>

              {/* Trust Badges Below CTA */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-warm-neutral-600">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-success-green-600" />
                  <span>Bezpieczna płatność</span>
                </div>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-success-green-600" />
                  <span>Dane zaszyfrowane SSL</span>
                </div>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-success-green-600" />
                  <span>RODO zgodność</span>
                </div>
              </div>

              {/* Risk Reversal */}
              <div className="text-center space-y-2 mt-4">
                <p className="text-sm md:text-base font-semibold text-success-green-700">
                  💯 Gwarancja zwrotu w 14 dni
                </p>
                <p className="text-sm md:text-base text-navy-900">
                  🎁 Zwrot 29 zł przy rozpoczęciu współpracy
                </p>
              </div>

              {/* Legal micro-copy (zamiast checkboxa) */}
              <p className="text-xs md:text-sm text-warm-neutral-600 text-center leading-relaxed pt-2">
                Klikając, akceptujesz <a href="/polityka-prywatnosci" className="underline font-medium hover:text-navy-900">Politykę Prywatności</a> i wyrażasz zgodę na kontakt w sprawie analizy kredytowej.
              </p>

              <p className="text-center text-xs md:text-sm text-warm-neutral-600 pt-2">
                🔒 Bezpieczna płatność przez TPay • ⚡ Analiza gotowa w 24h
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-3">
            🔒 Bezpieczna płatność i gwarancja jakości
          </h3>
          <p className="text-warm-neutral-600 text-base md:text-lg mb-6">
            Twoje dane są bezpieczne.
          </p>
          <img 
            src="/logos/tpay-payment-methods.jpg" 
            alt="TPay - Dostępne metody płatności" 
            className="max-w-xs md:max-w-md mx-auto rounded-lg shadow-md"
            loading="lazy"
          />
        </div>
      </section>

      {/* Sticky CTA - Mobile Only (Scroll-Activated) */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t-2 border-prestige-gold-300 p-3 md:hidden z-50 animate-slide-up">
          <a href="#formularz-zamowienia">
            <Button className="w-full h-14 bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold text-base rounded-xl shadow-lg">
              {ctaText}
            </Button>
          </a>
        </div>
      )}

    </div>;
};
export default AnalizaKredytowa;