import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Shield, CheckCircle, AlertCircle, Clock, TrendingUp, Award, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCountdown } from '@/hooks/useCountdown';
import { supabase } from '@/integrations/supabase/client';

const OfertaB = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer (12 hours)
  const { formattedTime, timeLeft } = useCountdown({
    initialTime: 12 * 60 * 60,
    storageKey: 'ofertab_timer'
  });

  const scrollToForm = () => {
    const formElement = document.getElementById('zamow-teraz');
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
        service: 'Profesjonalna Analiza Kredytowa - Oferta B'
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
      
      {/* Urgent Timer Bar */}
      <div className="bg-gradient-to-r from-alert-red-600 to-alert-red-700 text-white py-3 px-4 text-center sticky top-0 z-50 shadow-lg">
        <p className="font-bold text-sm md:text-base">
          ⏰ OFERTA WYGASA ZA: <span className="text-xl md:text-2xl mx-2 font-mono">{Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
        </p>
      </div>

      {/* Logo Header */}
      <header className="pt-6 pb-4 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <img 
            src="/logos/skan-kredytowy-logo.png" 
            alt="Skan Kredytowy" 
            className="h-20 md:h-28 mx-auto mb-4" 
          />
        </div>
      </header>

      {/* Hook - Big Promise Headline */}
      <section className="py-8 px-4 bg-gradient-to-br from-navy-900 to-business-blue-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-montserrat text-3xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            JAK ZAMIENIĆ<br />
            <span className="text-alert-red-400">„NIE"</span> OD BANKU<br />
            NA<br />
            <span className="text-success-green-400">„TAK, DAJEMY CI KREDYT"</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-6 text-warm-neutral-100 leading-relaxed max-w-3xl mx-auto">
            ...nawet jeśli masz chwilówki, złą historię kredytową i myślisz, że już NIE MA DLA CIEBIE RATUNKU
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto mb-6">
            <p className="text-lg md:text-xl leading-relaxed">
              <span className="text-prestige-gold-400 font-bold">UWAGA:</span> Jeśli kiedykolwiek myślałeś „to już koniec, żaden bank mi nie pomoże" – 
              <strong className="text-white"> przeczytaj każde słowo tej strony.</strong> Bo to, co za chwilę przeczytasz, może całkowicie odmienić Twoją sytuację finansową.
            </p>
          </div>

          <Button 
            onClick={scrollToForm}
            size="lg"
            className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-8 py-6 md:px-12 md:py-8 text-xl md:text-2xl rounded-xl shadow-2xl hover:scale-105 transition-all"
          >
            TAK! Chcę poznać prawdę o mojej sytuacji
          </Button>
        </div>
      </section>

      {/* The Story - Personal Connection */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
              Pozwól, że opowiem Ci historię...
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-prestige-gold-400 flex-shrink-0">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych" 
                  className="object-cover" 
                />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              
              <div>
                <p className="font-bold text-2xl text-navy-900 mb-2">Dariusz Wentrych</p>
                <p className="text-warm-neutral-600 text-lg mb-3">
                  Ekspert finansowy • 20 lat doświadczenia • Autor bestsellera
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-2 text-success-green-700 font-semibold">
                    <Users className="w-4 h-4" />
                    15 000+ klientów
                  </span>
                  <span className="flex items-center gap-2 text-prestige-gold-600 font-semibold">
                    <Award className="w-4 h-4" />
                    Bestseller „Nowe życie bez długów"
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-warm-neutral-700 space-y-6">
              <p className="text-lg leading-relaxed">
                <span className="text-2xl font-bold text-navy-900">20 lat temu</span> zacząłem pomagać ludziom w trudnej sytuacji finansowej. 
                Ludzie, którzy przychodzili do mnie, często mówili to samo:
              </p>

              <div className="bg-alert-red-50 border-l-4 border-alert-red-500 p-6 my-6 italic text-xl">
                „Dariusz, mam chwilówki... Bank odmówił mi kredytu... Próbowałem w 5 miejscach i wszędzie NIE... 
                Chyba już nie ma dla mnie ratunku..."
              </div>

              <p className="text-lg leading-relaxed">
                I wiesz co? <strong className="text-navy-900">95% z tych osób MYLIŁO SIĘ.</strong>
              </p>

              <p className="text-lg leading-relaxed">
                Nie dlatego, że ich sytuacja była dobra. Nie dlatego, że nie mieli długów. 
                <strong className="text-navy-900 text-xl"> Mylili się, bo NIE WIEDZIELI, CO NAPRAWDĘ BLOKUJE IM DOSTĘP DO KREDYTU.</strong>
              </p>

              <p className="text-lg leading-relaxed">
                Przez 20 lat pracy zauważyłem pewien WZORZEC:
              </p>

              <div className="bg-prestige-gold-50 border-l-4 border-prestige-gold-500 p-6 my-6">
                <p className="font-bold text-xl text-navy-900 mb-4">Większość ludzi popełnia TĘ SAMĄ błędną sekwencję:</p>
                <ul className="space-y-3 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-alert-red-600 font-bold flex-shrink-0">1.</span>
                    <span>Bank odmawia kredytu (często bez podania konkretnego powodu)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-alert-red-600 font-bold flex-shrink-0">2.</span>
                    <span>Próbujesz w kolejnym banku → kolejna odmowa (scoring spada!)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-alert-red-600 font-bold flex-shrink-0">3.</span>
                    <span>W desperacji idziesz do parabanku → zgadzasz się na DRAMATYCZNIE wyższe odsetki</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-alert-red-600 font-bold flex-shrink-0">4.</span>
                    <span>Przez lata płacisz 3-5x więcej niż musiałbyś płacić w banku</span>
                  </li>
                </ul>
              </div>

              <p className="text-xl leading-relaxed font-bold text-navy-900">
                A teraz najgorsze...
              </p>

              <p className="text-lg leading-relaxed">
                <strong className="text-alert-red-700">W 80% przypadków powód odmowy był MOŻLIWY DO NAPRAWY</strong> – 
                gdyby tylko ta osoba WIEDZIAŁA, CO KONKRETNIE NAPRAWIĆ.
              </p>

              <div className="bg-gradient-to-br from-success-green-50 to-business-blue-50 rounded-xl p-8 my-8 border-2 border-success-green-300">
                <p className="text-xl font-bold text-navy-900 mb-4 text-center">
                  💡 Oto prawda, której nikt Ci nie powie:
                </p>
                <p className="text-lg leading-relaxed text-center">
                  Nie potrzebujesz „cudu", żeby dostać kredyt w banku.<br />
                  <strong className="text-success-green-700 text-xl">Potrzebujesz WIEDZY – co konkretnie blokuje Twoją zdolność kredytową i jak to naprawić.</strong>
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                Dlatego stworzyłem tę analizę. Żeby pokazać Ci DOKŁADNIE:
              </p>

              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                  <span>Co widzą o Tobie banki w rejestrach kredytowych</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                  <span>Jakie błędy obniżają Twój scoring (i jak je naprawić)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                  <span>Krok po kroku plan – co zrobić, żeby bank powiedział TAK</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Big Problem - What Happens If You Don't Act */}
      <section className="py-16 px-4 bg-gradient-to-br from-alert-red-50 to-warm-neutral-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-8 text-center">
            ⚠️ Co się stanie, jeśli NIE dowiesz się, co Cię blokuje?
          </h2>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
            <div className="border-l-4 border-alert-red-500 bg-alert-red-50 p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">Scenariusz 1: „Spróbuję w kolejnym banku..."</h3>
              <p className="text-warm-neutral-700 leading-relaxed mb-3">
                Każdy odrzucony wniosek obniża Twój scoring kredytowy. Po 3-4 odmowach Twój scoring jest NA TYLE NISKI, 
                że banki odrzucają Cię automatycznie – nawet nie patrząc na Twoją sytuację.
              </p>
              <p className="font-bold text-alert-red-700">
                ❌ Rezultat: Minimum 2-3 lata czekania na odbudowę scoringu.
              </p>
            </div>

            <div className="border-l-4 border-alert-red-500 bg-alert-red-50 p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">Scenariusz 2: „Pójdę do firmy pożyczkowej..."</h3>
              <p className="text-warm-neutral-700 leading-relaxed mb-3">
                Parabanki mają oprocentowanie 3-5x wyższe niż banki. Na kredycie 50 000 zł przez 5 lat 
                <strong className="text-alert-red-700"> przepalisz dodatkowo 40 000 - 80 000 zł w odsetkach.</strong>
              </p>
              <p className="font-bold text-alert-red-700">
                ❌ Rezultat: Dziesiątki tysięcy złotych przepalone na odsetkach.
              </p>
            </div>

            <div className="border-l-4 border-alert-red-500 bg-alert-red-50 p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">Scenariusz 3: „Wezmę chwilówkę na chwilę..."</h3>
              <p className="text-warm-neutral-700 leading-relaxed mb-3">
                Chwilówki mają RRSO sięgające 500-1000%. Widziałem ludzi, którzy wzięli 2000 zł „na chwilę" 
                i po roku musieli spłacić 8000 zł. A co gorsza – <strong>chwilówki całkowicie blokują dostęp do banków.</strong>
              </p>
              <p className="font-bold text-alert-red-700">
                ❌ Rezultat: Spirala zadłużenia + brak dostępu do banków na lata.
              </p>
            </div>

            <div className="bg-gradient-to-r from-navy-900 to-business-blue-900 text-white p-8 rounded-xl mt-8">
              <p className="text-2xl font-bold text-center mb-4">
                Pytanie NIE brzmi „czy warto za 29 zł"
              </p>
              <p className="text-xl text-center text-prestige-gold-300">
                Pytanie brzmi: <strong>czy stać Cię na przepalenie dziesiątek tysięcy złotych, 
                bo NIE WIEDZIAŁEŚ, co konkretnie naprawić?</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution - Value Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">
            Oto dokładnie, co otrzymasz
          </h2>
          <p className="text-center text-xl text-warm-neutral-600 mb-12">
            (i dlaczego to jest warte WIELOKROTNIE więcej niż 29 zł)
          </p>

          {/* Value Stack Items */}
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-prestige-gold-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  📊 Pełna Analiza Twojej Zdolności Kredytowej
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 299 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Sprawdzimy Twoją sytuację we WSZYSTKICH rejestrach kredytowych (BIK, KRD, ERIF, BIG InfoMonitor) 
                i pokażemy Ci dokładnie, jak widzą Cię banki.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-business-blue-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  🔍 Identyfikacja Błędów i Blokerów
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 399 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Wskażemy DOKŁADNIE, które czynniki obniżają Twój scoring i blokują dostęp do kredytów. 
                Bez zgadywania – konkretne fakty z rejestrów.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-success-green-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  📋 Plan Krok Po Kroku – Jak Naprawić Sytuację
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 499 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Otrzymasz konkretny plan działania dopasowany do TWOJEJ sytuacji. 
                Co zrobić najpierw, co potem, czego unikać – wszystko krok po kroku.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-prestige-gold-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  🧹 Wskazówki Dotyczące Czyszczenia Rejestrów
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 699 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Nasze największe know-how w Polsce! Pokażemy Ci, które wpisy można usunąć legalnie 
                i jak to zrobić (oszczędzając Ci miesięcy lub LAT czekania).
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-success-green-500">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  💰 Dostęp do Prywatnych Inwestorów
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 1 499 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Jeśli będzie to możliwe w Twojej sytuacji, damy Ci dostęp do naszej ekskluzywnej bazy 
                prywatnych inwestorów oferujących finansowanie do 200 000 zł na najlepszych warunkach.
              </p>
            </div>

            {/* Item 6 - BONUS */}
            <div className="bg-gradient-to-br from-prestige-gold-50 to-success-green-50 rounded-xl shadow-lg p-6 border-2 border-prestige-gold-400">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl text-navy-900">
                  🎁 BONUS: Konsultacja z Ekspertem
                </h3>
                <span className="text-prestige-gold-600 font-bold text-lg whitespace-nowrap ml-4">
                  Wartość: 399 zł
                </span>
              </div>
              <p className="text-warm-neutral-700 leading-relaxed">
                Po otrzymaniu analizy możesz umówić się na bezpłatną konsultację, 
                podczas której odpowiemy na wszystkie Twoje pytania.
              </p>
            </div>

            {/* Total Value */}
            <div className="bg-gradient-to-r from-navy-900 to-business-blue-900 rounded-xl p-8 text-white">
              <div className="text-center">
                <p className="text-lg mb-2 opacity-90">Łączna wartość:</p>
                <p className="text-4xl md:text-5xl font-black mb-4 line-through opacity-75">
                  3 794 zł
                </p>
                <p className="text-2xl mb-4">Twoja cena dzisiaj:</p>
                <p className="text-6xl md:text-7xl font-black text-prestige-gold-400 mb-4">
                  29 zł
                </p>
                <p className="text-xl">
                  To <strong className="text-prestige-gold-400">99,2% TANIEJ</strong> niż normalna cena!
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-12 py-8 text-2xl rounded-xl shadow-2xl hover:scale-105 transition-all w-full md:w-auto"
            >
              TAK! Chcę tę analizę za 29 zł
            </Button>
            <p className="mt-4 text-warm-neutral-600">
              ⏰ Oferta ważna tylko przez: <span className="font-bold text-alert-red-600">{Math.floor(timeLeft / 3600)}h {Math.floor((timeLeft % 3600) / 60)}m</span>
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="py-16 px-4 bg-warm-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-4 text-center">
            Nie wierz mi na słowo...
          </h2>
          <p className="text-center text-xl text-warm-neutral-600 mb-12">
            Zobacz, co mówią osoby, które przeszły przez ten proces
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-success-green-500">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-prestige-gold-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-warm-neutral-700 leading-relaxed mb-4 text-lg italic">
                "Miałem 4 chwilówki i byłem przekonany, że żaden bank mnie nie chce. 
                <strong className="text-navy-900"> Pan Dariusz pokazał mi dokładnie, co zrobić.</strong> 
                Po 6 miesiącach dostałem kredyt konsolidacyjny w banku i płacę teraz 5x mniej miesięcznie!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success-green-500 flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="font-bold text-navy-900">Robert D.</p>
                  <p className="text-sm text-warm-neutral-600">Poznań</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-prestige-gold-500">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-prestige-gold-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-warm-neutral-700 leading-relaxed mb-4 text-lg italic">
                "Korzystałam z odroczonych płatności typu 'kup teraz, zapłać później' i nie wiedziałam, 
                że to blokuje kredyty. <strong className="text-navy-900">Po analizie wiedziałam dokładnie, co naprawić.</strong> 
                Dzisiaj mam kredyt hipoteczny!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-prestige-gold-500 flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div>
                  <p className="font-bold text-navy-900">Joanna M.</p>
                  <p className="text-sm text-warm-neutral-600">Poznań</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-business-blue-500">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-prestige-gold-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-warm-neutral-700 leading-relaxed mb-4 text-lg italic">
                "Dostałem odmowę z banku bez żadnego wyjaśnienia. Byłem zdruzgotany. 
                <strong className="text-navy-900"> Analiza pokazała mi 3 błędy w rejestrach,</strong> 
                o których nie miałem pojęcia. Po ich usunięciu bank zgodził się na kredyt!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-business-blue-500 flex items-center justify-center text-white font-bold">
                  T
                </div>
                <div>
                  <p className="font-bold text-navy-900">Tomasz K.</p>
                  <p className="text-sm text-warm-neutral-600">Warszawa</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-success-green-500">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(star => (
                  <span key={star} className="text-prestige-gold-500 text-xl">★</span>
                ))}
              </div>
              <p className="text-warm-neutral-700 leading-relaxed mb-4 text-lg italic">
                "Po rozwodzie zostałam z długami męża w systemie. Myślałam, że to koniec. 
                <strong className="text-navy-900"> Zespół pokazał mi krok po kroku, jak oczyścić rejestry.</strong> 
                Dzisiaj mam swoje mieszkanie i spokój finansowy."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success-green-500 flex items-center justify-center text-white font-bold">
                  K
                </div>
                <div>
                  <p className="font-bold text-navy-900">Katarzyna S.</p>
                  <p className="text-sm text-warm-neutral-600">Wrocław</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Numbers */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-prestige-gold-50 to-white rounded-xl p-6 text-center border-2 border-prestige-gold-200">
              <p className="text-5xl font-black text-prestige-gold-600 mb-2">15 247</p>
              <p className="text-navy-900 font-semibold">Zadowolonych klientów</p>
            </div>
            <div className="bg-gradient-to-br from-success-green-50 to-white rounded-xl p-6 text-center border-2 border-success-green-200">
              <p className="text-5xl font-black text-success-green-600 mb-2">20</p>
              <p className="text-navy-900 font-semibold">Lat doświadczenia</p>
            </div>
            <div className="bg-gradient-to-br from-business-blue-50 to-white rounded-xl p-6 text-center border-2 border-business-blue-200">
              <p className="text-5xl font-black text-business-blue-600 mb-2">98%</p>
              <p className="text-navy-900 font-semibold">Pozytywnych opinii</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-12 text-center">
            Najczęściej zadawane pytania
          </h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">
                ❓ Czy to naprawdę zadziała w mojej sytuacji?
              </h3>
              <p className="text-warm-neutral-700 leading-relaxed">
                Pracowaliśmy z osobami w NAJGORSZYCH możliwych sytuacjach – po rozwodach, z wieloma chwilówkami, 
                po upadłości firm. Jeśli my nie możemy pomóc, to znaczy, że NAPRAWDĘ nie ma rozwiązania. 
                Ale w 95% przypadków jest wyjście – musisz tylko wiedzieć, KTÓRE kroki podjąć.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">
                ❓ Co jeśli mam chwilówki?
              </h3>
              <p className="text-warm-neutral-700 leading-relaxed">
                To jeden z NAJCZĘSTSZYCH przypadków, z którymi pracujemy. Chwilówki blokują dostęp do banków, 
                ALE istnieją sprawdzone strategie, jak z nich wyjść i odzyskać dostęp do finansowania bankowego. 
                Pokażemy Ci dokładnie, jak to zrobić.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">
                ❓ Ile czasu zajmie poprawa mojej sytuacji?
              </h3>
              <p className="text-warm-neutral-700 leading-relaxed">
                To zależy od Twojej konkretnej sytuacji. Niektórzy klienci dostają zgodę na kredyt już po 2-3 miesiącach, 
                inni potrzebują 6-12 miesięcy. ALE: bez analizy nie będziesz w ogóle wiedział, OD CZEGO zacząć – 
                co może oznaczać LATA w drożych parabankach.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">
                ❓ Czy to naprawdę kosztuje tylko 29 zł?
              </h3>
              <p className="text-warm-neutral-700 leading-relaxed">
                TAK. To cena promocyjna dostępna TYLKO przez ograniczony czas. Normalna cena tej analizy to 299 zł. 
                Robimy tę ofertę, bo wiemy, że jeśli pomożemy Ci, a Ty będziesz zadowolony – 
                <strong className="text-navy-900"> będziesz polecał nas innym.</strong>
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-xl text-navy-900 mb-3">
                ❓ Co jeśli analiza mi nie pomoże?
              </h3>
              <p className="text-warm-neutral-700 leading-relaxed">
                Masz <strong className="text-success-green-700">14 dni gwarancji zwrotu pieniędzy.</strong> 
                Jeśli uznasz, że analiza nie była pomocna – po prostu napisz do nas, a zwrócimy Ci każdą złotówkę. 
                Bez pytań, bez problemów.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-success-green-50 to-prestige-gold-50">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-20 h-20 mx-auto text-success-green-600 mb-6" />
          <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-6">
            Gwarancja 100% satysfakcji
          </h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-xl leading-relaxed text-warm-neutral-700 mb-6">
              Zamów analizę. Otrzymaj ją w ciągu 24h. Jeśli z JAKIEGOKOLWIEK powodu nie będziesz zadowolony – 
              <strong className="text-navy-900"> masz 14 dni na zwrot i dostaniesz każdą złotówkę z powrotem.</strong>
            </p>
            <p className="text-2xl font-bold text-navy-900 mb-4">
              Czyli ZERO ryzyka dla Ciebie.
            </p>
            <p className="text-lg text-warm-neutral-700">
              Jedyne ryzyko, jakie podejmujesz, to NIE zamawiając tej analizy – 
              i pozostając w niewiedzy, <strong className="text-alert-red-700">co blokuje Ci dostęp do tanich kredytów bankowych.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Final Order Form */}
      <section id="zamow-teraz" className="py-16 px-4 bg-gradient-to-br from-navy-900 via-business-blue-900 to-navy-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                Zamów swoją analizę teraz
              </h2>
              <p className="text-warm-neutral-600 text-lg mb-6">
                Wynik w ciągu 24h • Gwarancja zwrotu przez 14 dni
              </p>

              {/* Timer */}
              <div className="bg-gradient-to-r from-alert-red-50 to-prestige-gold-50 border-2 border-alert-red-300 rounded-xl p-4 mb-6">
                <p className="text-sm md:text-base font-semibold text-navy-900 mb-2">
                  ⏰ Oferta ważna przez: <span className="text-alert-red-700 font-bold text-xl">{Math.floor(timeLeft / 3600)}:{Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                </p>
              </div>

              {/* Social Proof */}
              <div className="bg-gradient-to-r from-success-green-600 to-business-blue-600 rounded-xl p-4 mb-6">
                <p className="text-white font-bold flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Dołącz do 15 247 zadowolonych klientów
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold mb-2 block text-base">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="twoj@email.pl"
                  className="h-14 text-lg"
                />
              </div>

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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="600 123 456"
                  className="h-14 text-lg"
                />
              </div>

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
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jan Kowalski"
                  className="h-14 text-lg"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-6 px-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 min-h-[72px] text-xl"
              >
                {isSubmitting ? '💳 Przekierowuję...' : 'ZAMAWIAM ANALIZĘ ZA 29 ZŁ'}
              </Button>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-warm-neutral-600 pt-4">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4 text-success-green-600" />
                  <span>Bezpieczna płatność</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-success-green-600" />
                  <span>SSL szyfrowanie</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-success-green-600" />
                  <span>Wynik w 24h</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="text-center space-y-2 pt-4">
                <p className="text-base font-semibold text-success-green-700">
                  💯 Gwarancja zwrotu w 14 dni
                </p>
                <p className="text-sm text-warm-neutral-600">
                  🔒 Bezpieczna płatność przez TPay
                </p>
              </div>

              <p className="text-xs text-warm-neutral-600 text-center leading-relaxed pt-2">
                Klikając, akceptujesz Politykę Prywatności i wyrażasz zgodę na kontakt w sprawie analizy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Final Urgency Push */}
      <section className="py-12 px-4 bg-gradient-to-r from-alert-red-600 to-alert-red-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold mb-4">
            Pamiętaj: Za każdy dzień zwłoki płacisz DUŻO więcej niż 29 zł
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            Jeśli teraz płacisz RRSO 50% w parabankach zamiast 8% w banku,<br />
            <strong className="text-2xl">tracisz SETKI złotych MIESIĘCZNIE.</strong>
          </p>
          <p className="text-xl font-bold">
            To NIE jest wydatek – to INWESTYCJA, która może zaoszczędzić Ci dziesiątki tysięcy złotych.
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="font-montserrat text-xl font-bold text-navy-900 mb-4">
            Mówili o nas:
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <img src="/media-logos/logo-fakt.svg" alt="Fakt" className="h-12 object-contain grayscale" />
            <img src="/media-logos/logo-tvn.png" alt="TVN" className="h-12 object-contain grayscale" />
            <img src="/media-logos/logo-tvp.png" alt="TVP" className="h-12 object-contain grayscale" />
            <img src="/media-logos/logo-dziennik.png" alt="Dziennik" className="h-12 object-contain grayscale" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default OfertaB;
