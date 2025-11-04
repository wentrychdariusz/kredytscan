import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Shield, CheckCircle, AlertCircle, TrendingUp, Users, Heart, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
import { supabase } from '@/integrations/supabase/client';

const OfertaC = () => {
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
    storageKey: 'oferta_c_timer'
  });

  // Live social proof simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setOrdersToday(prev => Math.min(prev + 1, 99));
    }, Math.random() * 180000 + 120000);
    return () => clearInterval(interval);
  }, []);

  // Track filled fields
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
              Jak wyjść z<br />
              <span className="text-prestige-gold-600">„finansowej pułapki"</span>
            </h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* HOOK - Opening Story */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-black text-navy-900 mb-6 leading-tight">
              „Proszę Pana, ja już <span className="text-alert-red-600">NIGDZIE</span> nie dostanę kredytu..."
            </h1>
            <p className="text-lg md:text-xl text-warm-neutral-700 font-medium italic">
              To były pierwsze słowa Joanny, gdy zadzwoniła do mojego biura
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border-2 border-prestige-gold-200">
            <div className="prose max-w-none">
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                <strong>Joanna płakała przez telefon.</strong>
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                30 lat. Młoda mama. Pracuje, płaci wszystkie rachunki na czas. Wydawałoby się — <em>wzorowy klient</em>.
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                Ale każdy bank mówił jej <span className="text-alert-red-600 font-bold">„NIE"</span>.
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                Problem? <strong>Kilka opóźnionych płatności za zakupy przez BNPL</strong> (te „kup teraz, zapłać później"). 
                Wydawało się niewinne — „przecież to tylko 200 zł opóźnienia".
              </p>
              <p className="text-base md:text-lg text-navy-900 leading-relaxed font-semibold mb-4">
                Ale dla banków? To była czerwona flaga. <span className="text-alert-red-600">Automatyczna odmowa.</span>
              </p>
              
              <div className="bg-prestige-gold-50 border-l-4 border-prestige-gold-500 p-5 rounded-r-lg my-6">
                <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg">
                  „Myślałam, że to koniec. Że nigdy nie będę mogła wziąć kredytu na mieszkanie dla siebie i dziecka..."
                </p>
                <p className="text-sm text-warm-neutral-600 mt-2">— Joanna M., Poznań</p>
              </div>

              <p className="text-base md:text-lg text-navy-900 leading-relaxed font-semibold mb-4">
                Ale wtedy trafiła do nas.
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                Po dogłębnej analizie <strong>pokazaliśmy jej dokładnie</strong>, co widzi bank, gdy patrzy na jej profil. 
                Wytłumaczyliśmy, które rejestry ją blokują i <strong className="text-success-green-700">jak to naprawić</strong>.
              </p>
              <p className="text-base md:text-lg text-success-green-700 leading-relaxed font-bold mb-4">
                4 miesiące później Joanna dostała kredyt hipoteczny w banku. Kupiła mieszkanie dla siebie i córki.
              </p>
            </div>
          </div>
        </section>

        {/* AGITATE - The Problem */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-alert-red-50 to-warm-neutral-50 rounded-xl shadow-lg p-6 md:p-8 border-2 border-alert-red-300">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
              Czy Ty też czujesz się <span className="text-alert-red-600">uwięziony</span>?
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-alert-red-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Każdy bank odmawia</strong> — nawet nie wiesz dlaczego
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-alert-red-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Toniesz w chwilówkach</strong> — wysokie odsetki, brak wyjścia
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-alert-red-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Marzenia odkładasz na później</strong> — mieszkanie, samochód, spokój
                </p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-alert-red-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Czujesz wstyd</strong> — gdy rodzina pyta „dlaczego nie bierzesz kredytu?"
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-5 border-l-4 border-alert-red-600">
              <p className="text-navy-900 font-bold text-lg md:text-xl mb-3">
                Prawda jest taka:
              </p>
              <p className="text-warm-neutral-700 leading-relaxed">
                <strong>To nie jest Twoja wina.</strong> System bankowy jest skomplikowany. 
                Jeden błąd, jedno opóźnienie, jeden zły ruch — i jesteś <em>„spalony"</em> na lata.
              </p>
            </div>
          </div>
        </section>

        {/* STORY - Dariusz Introduction */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border-2 border-prestige-gold-300">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-prestige-gold-400 mb-4 shadow-xl">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych" 
                  className="object-cover" 
                />
                <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
              </Avatar>
              <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                Dariusz Wentrych
              </h3>
              <p className="text-prestige-gold-600 font-bold text-lg md:text-xl mb-3">
                Autor bestsellera „Nowe życie bez długów"
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-navy-900 font-semibold mb-4">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success-green-600" />
                  20 lat doświadczenia
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-success-green-600" />
                  15.000+ zadowolonych klientów
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-prestige-gold-500" />
                  Ekspert TVN i TVP
                </span>
              </div>
            </div>

            <div className="prose max-w-none">
              <div className="bg-prestige-gold-50 border-l-4 border-prestige-gold-500 p-5 rounded-r-lg mb-5">
                <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg mb-3">
                  „Przez 20 lat widziałem <strong>setki beznadziejnych przypadków</strong>. 
                  Ludzie z windykacjami, chwilówkami, zajęciami komorniczymi..."
                </p>
                <p className="text-navy-900 leading-relaxed font-semibold text-base md:text-lg">
                  <span className="text-success-green-700">Dziś ci ludzie mają kredyty w bankach.</span> Mają swoje mieszkania. Mają spokój.
                </p>
              </div>

              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                Jak to możliwe?
              </p>
              <p className="text-base md:text-lg text-navy-900 leading-relaxed font-semibold mb-4">
                Bo znam <strong className="text-prestige-gold-600">system od środka</strong>.
              </p>
              <p className="text-base md:text-lg text-warm-neutral-700 leading-relaxed mb-4">
                W moim zespole mam <strong>ludzi, którzy pracowali w bankach</strong>. 
                Wiemy dokładnie, jak banki oceniają klientów. Wiemy, co ich blokuje. I wiemy, <strong className="text-success-green-700">jak to naprawić</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* SUCCESS PHOTOS */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-2xl shadow-2xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-prestige-gold-500 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-prestige-gold-600 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-prestige-gold-500/20 border border-prestige-gold-500/30 rounded-full px-4 py-2 mb-4">
                  <Heart className="w-5 h-5 text-prestige-gold-400" />
                  <span className="text-prestige-gold-300 font-semibold text-sm md:text-base">
                    Prawdziwe historie, prawdziwi ludzie
                  </span>
                </div>
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-3">
                  To mogłeś <span className="text-prestige-gold-400">być Ty</span>
                </h3>
              </div>

              <div className="grid grid-cols-4 gap-2 md:gap-3 mb-6">
                {[
                  "/lovable-uploads/client-success-1.jpg",
                  "/lovable-uploads/client-success-2.jpg",
                  "/lovable-uploads/client-success-3.jpg",
                  "/lovable-uploads/client-success-4.jpg"
                ].map((photo, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={photo}
                      alt="Zadowolony klient"
                      className="w-full h-24 md:h-32 object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <p className="text-center text-white text-base md:text-lg font-semibold mb-2">
                Każda z tych osób myślała, że <span className="text-alert-red-400">„to koniec"</span>
              </p>
              <p className="text-center text-prestige-gold-200 text-sm md:text-base leading-relaxed">
                Dziś mają kredyty. Mieszkania. Spokój. <strong className="text-white">Ty też tak możesz.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* THE OFFER - What You Get */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-prestige-gold-50 to-business-blue-50 rounded-xl shadow-xl p-6 md:p-8 border-2 border-prestige-gold-300">
            <h2 className="font-montserrat text-2xl md:text-4xl font-bold text-navy-900 mb-6 text-center">
              Co dokładnie <span className="text-prestige-gold-600">otrzymasz</span>?
            </h2>

            <div className="space-y-4 mb-8">
              <div className="bg-white rounded-lg p-5 shadow-md border-l-4 border-success-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-7 h-7 text-success-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg md:text-xl mb-2">
                      Dogłębną analizę Twojej sytuacji kredytowej
                    </h4>
                    <p className="text-warm-neutral-700 leading-relaxed">
                      Sprawdzimy wszystkie rejestry kredytowe (BIK, KRD, ERIF, BIG) i pokażemy Ci dokładnie, 
                      <strong> jak widzą Cię banki</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-md border-l-4 border-business-blue-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-7 h-7 text-success-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg md:text-xl mb-2">
                      Wskazanie wszystkich błędów i „czerwonych flag"
                    </h4>
                    <p className="text-warm-neutral-700 leading-relaxed">
                      Dowiesz się <strong>co dokładnie Cię blokuje</strong> i dlaczego banki odmawiają
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 shadow-md border-l-4 border-prestige-gold-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-7 h-7 text-success-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg md:text-xl mb-2">
                      Konkretny plan działania krok po kroku
                    </h4>
                    <p className="text-warm-neutral-700 leading-relaxed">
                      Nie ogólniki. <strong className="text-success-green-700">Konkretne kroki</strong>, 
                      co możesz zrobić, aby zwiększyć swoje szanse
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-prestige-gold-100 to-prestige-gold-50 rounded-lg p-5 shadow-md border-2 border-prestige-gold-400">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-7 h-7 text-prestige-gold-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-900 text-lg md:text-xl mb-2">
                      BONUS: Dostęp do prywatnego finansowania
                    </h4>
                    <p className="text-warm-neutral-700 leading-relaxed">
                      Jeśli banki nadal odmawiają, skontaktujemy Cię z naszą <strong>bazą prywatnych inwestorów</strong> 
                      (finansowanie do 200 000 zł)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Value Comparison */}
            <div className="bg-navy-900 rounded-xl p-6 text-center mb-6">
              <p className="text-prestige-gold-300 text-sm md:text-base font-semibold mb-2">
                Prawdziwa wartość tej analizy
              </p>
              <p className="text-white font-bold text-3xl md:text-5xl mb-3">
                ~1000 zł
              </p>
              <div className="h-px bg-prestige-gold-500/30 my-4"></div>
              <p className="text-warm-neutral-300 text-sm md:text-base mb-2">
                Twoja cena dzisiaj
              </p>
              <p className="text-prestige-gold-400 font-black text-4xl md:text-6xl mb-3">
                29 zł
              </p>
              <p className="text-warm-neutral-400 text-xs md:text-sm leading-relaxed">
                Dlaczego tak tanio? Bo chcemy zacząć współpracę z nowymi, fajnymi klientami. 
                <strong className="text-white"> To Twoja szansa.</strong>
              </p>
            </div>

            <div className="bg-business-blue-50 border-l-4 border-business-blue-500 rounded-r-lg p-5">
              <p className="text-warm-neutral-700 text-sm md:text-base leading-relaxed">
                <strong className="text-navy-900">Ważne:</strong> Aby stać się naszym klientem jest tylko jedna droga — 
                <strong> zamówienie tej analizy</strong>. Dopiero potem proponujemy dopasowane rozwiązania.
              </p>
            </div>
          </div>
        </section>

        {/* URGENCY & SCARCITY */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-alert-red-50 to-prestige-gold-50 border-2 border-alert-red-400 rounded-xl p-6 text-center shadow-xl">
            <p className="text-sm md:text-base font-semibold text-navy-900 mb-3">
              ⏰ <strong>Ta oferta znika za:</strong>
            </p>
            <p className="text-alert-red-700 font-black text-3xl md:text-5xl mb-4">
              {Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
            </p>
            <p className="text-xs md:text-sm text-warm-neutral-700 mb-3">
              🔥 Dziś zamówiono już <span className="font-bold text-prestige-gold-700">{ordersToday} analiz</span>
            </p>
            <p className="text-xs md:text-sm text-navy-900 font-semibold">
              Cena 29 zł jest <strong className="text-alert-red-600">TESTOWA</strong>. Wkrótce wróci do normalnej.
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-12">
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
            Oni też <span className="text-success-green-600">nie wierzyli</span>...
          </h3>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-warm-neutral-50 to-prestige-gold-50 rounded-lg p-5 border-l-4 border-prestige-gold-500 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-prestige-gold-500 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                "Byłam pewna, że z moimi chwilówkami to już koniec. Pan Dariusz pokazał mi konkretnie co zrobić. 
                <strong className="text-success-green-700"> Po 4 miesiącach skonsolidowałam wszystko w jeden kredyt bankowy.</strong> 
                Płacę teraz 3 razy mniej. To uczucie wolności jest bezcenne."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-prestige-gold-400 flex items-center justify-center text-white font-bold">
                  A
                </div>
                <p className="text-sm text-warm-neutral-600 font-semibold">Anna W., 34 lata, Łódź</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-business-blue-50 to-warm-neutral-50 rounded-lg p-5 border-l-4 border-business-blue-500 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-prestige-gold-500 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                "Bank odmówił mi kredytu na mieszkanie. Byłem zdruzgotany. 
                <strong> Pan Dariusz pokazał mi błędy w rejestrach, o których nie miałem pojęcia.</strong> 
                Naprawiliśmy to. <strong className="text-success-green-700">Po 4 miesiącach kupiłem swoje pierwsze M.</strong>"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-business-blue-500 flex items-center justify-center text-white font-bold">
                  T
                </div>
                <p className="text-sm text-warm-neutral-600 font-semibold">Tomasz R., 28 lat, Kraków</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-success-green-50 to-warm-neutral-50 rounded-lg p-5 border-l-4 border-success-green-500 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="text-prestige-gold-500 text-lg">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-sm md:text-base text-navy-900 leading-relaxed mb-3">
                "Po rozwodzie zostałam z długami męża. Myślałam że to koniec. 
                <strong> Zespół pokazał mi krok po kroku co zrobić.</strong> 
                <strong className="text-success-green-700"> Dzisiaj mam własne mieszkanie i spokojnie śpię.</strong> 
                Najlepsza inwestycja tych 29 zł w moim życiu."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-success-green-500 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <p className="text-sm text-warm-neutral-600 font-semibold">Monika K., 41 lat, Warszawa</p>
              </div>
            </div>
          </div>
        </section>

        {/* GUARANTEE */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-success-green-50 to-business-blue-50 rounded-xl p-6 md:p-8 border-2 border-success-green-400 shadow-xl text-center">
            <Shield className="w-16 h-16 md:w-20 md:h-20 text-success-green-600 mx-auto mb-4" />
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-4">
              Gwarancja <span className="text-success-green-600">100% zadowolenia</span>
            </h3>
            <div className="space-y-3 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>14 dni na zwrot</strong> — jeśli z jakiegokolwiek powodu nie będziesz zadowolony, 
                  zwrócimy Ci pieniądze bez pytań
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                <p className="text-warm-neutral-700 text-base md:text-lg">
                  <strong>Zwrot 29 zł przy współpracy</strong> — jeśli zdecydujesz się na dalszą współpracę z nami, 
                  zwrócimy Ci koszt analizy
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 mt-6 border-2 border-success-green-300">
              <p className="text-navy-900 font-bold text-lg">
                Innymi słowy: <span className="text-success-green-600">nie ryzykujesz NIC</span>
              </p>
            </div>
          </div>
        </section>

        {/* ORDER FORM */}
        <section id="formularz-zamowienia" className="mb-12">
          <div className="bg-gradient-to-br from-prestige-gold-50 to-white rounded-xl shadow-2xl p-6 md:p-8 border-2 border-prestige-gold-400">
            <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-6 text-center">
              Zamów <span className="text-prestige-gold-600">Swoją Analizę</span> już teraz
            </h2>

            {/* Progress Bar */}
            {filledFields > 0 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-warm-neutral-600 mb-2">
                  <span>Postęp wypełnienia</span>
                  <span>{Math.round((filledFields / 3) * 100)}%</span>
                </div>
                <div className="w-full bg-warm-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-prestige-gold-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(filledFields / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-navy-900 font-semibold">Imię i nazwisko</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1"
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1"
                  placeholder="123 456 789"
                />
              </div>

              <div className="bg-prestige-gold-100 rounded-lg p-4 border-2 border-prestige-gold-400">
                <p className="text-center text-navy-900 font-bold text-xl md:text-2xl mb-2">
                  Tylko 29 zł
                </p>
                <p className="text-center text-warm-neutral-700 text-sm">
                  Płatność BLIK • Bezpiecznie • Natychmiastowy dostęp
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold text-lg md:text-xl py-6 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? 'Przekierowywanie...' : '💳 Zamawiam Analizę za 29 zł'}
              </Button>

              <div className="text-center space-y-2 text-sm text-warm-neutral-600">
                <p className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-success-green-600" />
                  Bezpieczna płatność SSL
                </p>
                <p className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success-green-600" />
                  Gwarancja zwrotu 14 dni
                </p>
              </div>
            </form>
          </div>
        </section>

        {/* FINAL PUSH */}
        <section className="mb-12">
          <div className="bg-navy-900 rounded-xl shadow-2xl p-6 md:p-8 text-center">
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-4">
              Pytanie brzmi: <span className="text-prestige-gold-400">Co wybierzesz?</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-alert-red-900/30 border-2 border-alert-red-500 rounded-lg p-5">
                <p className="text-alert-red-400 font-bold text-lg mb-3">❌ Opcja A</p>
                <p className="text-warm-neutral-300 text-sm leading-relaxed">
                  Dalej działasz po omacku. Składasz wnioski w ciemno. 
                  Kolejne odmowy. Kolejne miesiące w finansowej pułapce. 
                  <strong className="text-white"> Nic się nie zmienia.</strong>
                </p>
              </div>

              <div className="bg-success-green-900/30 border-2 border-success-green-500 rounded-lg p-5">
                <p className="text-success-green-400 font-bold text-lg mb-3">✅ Opcja B</p>
                <p className="text-warm-neutral-300 text-sm leading-relaxed">
                  Za 29 zł dowiadujesz się dokładnie, co Cię blokuje i jak to naprawić. 
                  Masz konkretny plan. <strong className="text-white">Zaczynasz działać mądrze.</strong> Za kilka miesięcy — kredyt w banku.
                </p>
              </div>
            </div>

            <p className="text-prestige-gold-300 text-lg md:text-xl font-semibold mb-4">
              Wybór należy do Ciebie.
            </p>
            <p className="text-white text-base md:text-lg">
              Ale pamiętaj: <strong>ta cena nie będzie dostępna długo</strong>.
            </p>
          </div>
        </section>

        {/* Trust Section with TPay */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center border-2 border-warm-neutral-200">
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

        {/* LEGAL & TRUST */}
        <section>
          <div className="bg-warm-neutral-100 rounded-lg p-6 border border-warm-neutral-300">
            <p className="text-xs text-warm-neutral-600 leading-relaxed mb-3">
              <strong>Kredyt Studio sp. z o.o.</strong> | NIP: 6282976329 | KRS: 0000950089 | 
              <a href="mailto:kontakt@kredytstudio.pl" className="text-business-blue-600 hover:underline ml-1">
                kontakt@kredytstudio.pl
              </a>
            </p>
            <p className="text-xs text-warm-neutral-600 leading-relaxed">
              Informujemy, że niniejsza strona ma charakter wyłącznie informacyjny i nie stanowi oferty w rozumieniu art. 66 Kodeksu Cywilnego. 
              Przedstawione informacje nie są porady prawną ani finansową.
            </p>
          </div>
        </section>
      </div>

      {/* STICKY CTA - Mobile */}
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 bg-prestige-gold-600 shadow-2xl p-3 z-50 md:hidden">
          <Button 
            onClick={scrollToForm}
            className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-4 rounded-lg"
          >
            💳 Zamów za 29 zł
          </Button>
        </div>
      )}
    </div>
  );
};

export default OfertaC;