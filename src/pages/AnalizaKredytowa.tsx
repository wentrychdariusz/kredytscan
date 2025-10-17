import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Shield, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const AnalizaKredytowa = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Wymagana zgoda",
        description: "Musisz zaakceptować zgodę na przetwarzanie danych",
        variant: "destructive"
      });
      return;
    }
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
  const benefits = ["Ocenimy Twoje możliwości kredytowania na podstawie danych i historii płatniczej", "Wskażemy błędy i czynniki ryzyka, które obniżają Twoją wiarygodność", "Przeanalizujemy informacje z BIK, BIG i InfoMonitora", "Zaproponujemy czyszczenie BIK — największe know-how w Polsce w tej dziedzinie", "Pokażemy, co można poprawić, by zwiększyć szanse na kredyt w banku", "Jeśli będzie to możliwe, skontaktujemy Cię z naszą bazą prywatnych inwestorów", "Dostęp do prywatnego finansowania do poziomu 200 000 zł na najlepszych warunkach", "Zaproponujemy najlepszy kierunek działania dopasowany do Twojej sytuacji"];
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
    label: "Zaufanie ponad 15 000 osób",
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
          
          {/* Main Headline */}
          <h1 className="font-montserrat text-3xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight text-center">
            Profesjonalna Analiza Kredytowa<br />
            <span className="text-prestige-gold-600">— tylko 29 zł</span>
          </h1>

          {/* Problem Statement */}
          <div className="bg-warm-neutral-100 border-l-4 border-alert-red-500 p-6 rounded-lg mb-8">
            <p className="text-lg font-semibold text-navy-900 mb-3">
              Bank odmówił Ci kredyt? Chcesz zamienić pożyczki, aby dostać finansowanie w banku?
            </p>
            <p className="text-warm-neutral-700 leading-relaxed">
              <strong>Nie działaj po omacku</strong> — najpierw dowiedz się, co naprawdę wpływa na Twoją zdolność kredytową i co możesz poprawić, zanim złożysz kolejny wniosek i <strong className="text-alert-red-700">na wiele lat popsujesz sobie finansowanie</strong>. A to odcina Cię od taniej gotówki.
            </p>
          </div>

          {/* Warning from Dariusz */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-alert-red-200">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-3 border-alert-red-400 flex-shrink-0">
                <AvatarImage src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych" className="object-cover" />
                <AvatarFallback className="text-xl font-bold">DW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-warm-neutral-700 leading-relaxed mb-3">
                  <strong className="text-navy-900">Widziałem setki przypadków</strong>, gdzie ludzie mieli złych doradców i popełnili błędy, które kosztowały ich <strong className="text-alert-red-700">utratę taniego finansowania w banku</strong> — bo korzystali z darmowej pomocy firm z internetu.
                </p>
                <p className="text-warm-neutral-700 leading-relaxed mb-3">
                  Za 29 zł dowiesz się prawdy o swojej sytuacji i unikniesz kosztownych błędów, które <strong className="text-alert-red-700">eliminują Cię z systemu bankowego</strong>.
                </p>
                <p className="text-navy-900 font-semibold leading-relaxed">
                  Nawet jeśli masz tzw. chwilówki czy pożyczki — <strong className="text-success-green-700">potrafimy uporządkować Twoją sytuację</strong>. Jest nadzieja i jest rozwiązanie. Pomożemy Ci.
                </p>
                <p className="text-sm text-warm-neutral-500 mt-3 italic">— Dariusz Wentrych, ekspert finansowy</p>
              </div>
            </div>
          </div>

          {/* Value Proposition */}
          <p className="text-xl text-center text-warm-neutral-700 mb-8">
            Za jedyne <span className="font-bold text-prestige-gold-600 text-2xl">29 zł</span> otrzymasz pełną analizę swojej sytuacji kredytowej, przygotowaną przez <strong>ekspertów z wieloletnim doświadczeniem</strong> w finansach bankowych.
          </p>
        </div>
      </section>

      {/* Expert Section - Dariusz */}
      <section className="py-12 px-4 bg-gradient-to-br from-navy-900 to-business-blue-900">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            
            {/* Expert Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-prestige-gold-400 shadow-xl">
                <AvatarImage src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" alt="Dariusz Wentrych - Ekspert Finansowy" className="object-cover" />
                <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                  Dariusz Wentrych
                </h3>
                <p className="text-warm-neutral-600 text-lg mb-1">
                  Ekspert finansowy z 15-letnim doświadczeniem
                </p>
                <p className="text-prestige-gold-600 font-semibold text-base mb-3">
                  Autor bestsellerowej książki "Nowe życie bez długów"
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-warm-neutral-600">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-success-green-600" />
                    15 lat doświadczenia
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-success-green-600" />
                    15 000+ klientów
                  </span>
                </div>
              </div>
            </div>

            {/* Expert Message */}
            <div className="space-y-4 text-warm-neutral-700 mb-8">
              <p className="text-lg leading-relaxed">
                <strong className="text-navy-900">Ponad 15 000 osób</strong> już skorzystało z mojej pomocy i odzyskało kontrolę nad swoimi finansami. Pomogłem tysiącom rodzin wyjść z długów i zbudować stabilną przyszłość finansową.
              </p>
              <p className="text-lg leading-relaxed">
                Czy wyobrażasz sobie życie, w którym <strong className="text-navy-900">nie musisz bać się kolejnego telefonu od wierzycieli?</strong> Życie, w którym Twoje pieniądze należą do Ciebie, a nie do banku?
              </p>
              <div className="bg-prestige-gold-50 border-l-4 border-prestige-gold-500 p-6 rounded-lg mt-6">
                <p className="text-xl font-semibold text-navy-900 italic">
                  "Jeśli nigdy nie miałeś wsparcia i pomocy od nikogo, to ja Ci pomogę. Nie czekaj, aż sytuacja wymknie się spod kontroli."
                </p>
              </div>
            </div>

            {/* Social Proof - Zaufali mi */}
            <div className="border-t border-warm-neutral-200 pt-8 mb-8">
              <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-4 text-center">
                Zaufali mi i współpracują ze mną:
              </h4>
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-6">
                <div className="bg-warm-neutral-50 px-6 py-3 rounded-lg border border-warm-neutral-200">
                  <p className="text-sm font-semibold text-warm-neutral-700">Biura Informacji Kredytowej</p>
                </div>
                <div className="bg-warm-neutral-50 px-6 py-3 rounded-lg border border-warm-neutral-200">
                  <p className="text-sm font-semibold text-warm-neutral-700">Biura Informacji Gospodarczej</p>
                </div>
                <div className="bg-warm-neutral-50 px-6 py-3 rounded-lg border border-warm-neutral-200">
                  <p className="text-sm font-semibold text-warm-neutral-700">InfoMonitor</p>
                </div>
                <div className="bg-warm-neutral-50 px-6 py-3 rounded-lg border border-warm-neutral-200">
                  <p className="text-sm font-semibold text-warm-neutral-700">Prywatni Inwestorzy</p>
                </div>
              </div>
            </div>

            {/* Opinie klientów - Carousel */}
            <div className="border-t border-warm-neutral-200 pt-8">
              <h4 className="font-montserrat text-xl font-bold text-navy-900 mb-6 text-center">
                Co mówią klienci:
              </h4>
              <Carousel className="w-full max-w-3xl mx-auto">
                <CarouselContent>
                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-prestige-gold-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Dzięki analizie Dariusza dowiedziałem się, co naprawdę blokuje mi dostęp do kredytu. Uporządkowałem swoje finanse i dostałem kredyt na mieszkanie!"
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Tomasz K., Warszawa</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-prestige-gold-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Za 29 zł otrzymałam więcej informacji niż z trzech wizyt w banku. Profesjonalnie, konkretnie i skutecznie."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Anna M., Kraków</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-prestige-gold-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Myślałem, że mam brudny BIK i już nigdy nie dostanę kredytu. Po analizie i czyszczeniu BIK dostałem finansowanie na rozwój firmy."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Marcin P., Gdańsk</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-warm-neutral-50 to-white p-6 md:p-8 rounded-lg border border-warm-neutral-200 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-prestige-gold-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Najlepsza inwestycja w swoje finanse! Dariusz pokazał mi błędy, których sam bym nigdy nie zauważył."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Katarzyna S., Wrocław</p>
                    </div>
                  </CarouselItem>

                  <CarouselItem>
                    <div className="bg-gradient-to-br from-prestige-gold-50 to-white p-6 md:p-8 rounded-lg border-2 border-prestige-gold-300 shadow-md">
                      <div className="flex gap-1 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-prestige-gold-500 text-lg">★</span>
                        ))}
                      </div>
                      <p className="text-warm-neutral-700 mb-3 italic text-lg leading-relaxed">
                        "Miałem chwilówki i myślałem, że to koniec. Pan Dariusz pokazał mi plan wyjścia z długów. Dziś mam kredyt konsolidacyjny z banku i oddycham z ulgą."
                      </p>
                      <p className="text-sm font-semibold text-navy-900">— Robert D., Poznań</p>
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-navy-900 mb-8 text-center">
            Co otrzymasz w ramach analizy?
          </h2>

          {/* Secret Knowledge Section */}
          <div className="bg-gradient-to-br from-prestige-gold-50 to-business-blue-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <div className="text-center mb-6">
              <h3 className="font-montserrat text-2xl font-bold text-navy-900 mb-3">
                🔐 Odkryj tajemnice, które znają tylko nieliczni
              </h3>
              <p className="text-warm-neutral-700 text-lg">
                Jako jedni z niewielu w Polsce pokażemy Ci <strong className="text-navy-900">dokładnie, jak naprawić swoją sytuację</strong> — nawet jeśli masz złą historię w BIK
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-prestige-gold-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Co o Tobie zapisano w BIK, BIG i InfoMonitorze</h4>
                    <p className="text-warm-neutral-700">Dokładnie przeanalizujemy wszystkie wpisy i pokażemy, co widzą banki, zanim podejmą decyzję</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-business-blue-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Jak wygląda Twoja zdolność kredytowa w oczach banku</h4>
                    <p className="text-warm-neutral-700">Zobaczyjesz swoją sytuację oczami kredytodawców i zrozumiesz, dlaczego dostajesz odmowy</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-alert-red-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Jakie błędy i zaległości blokują decyzję</h4>
                    <p className="text-warm-neutral-700">Wskażemy konkretne punkty, które eliminują Cię z możliwości kredytu bankowego</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-success-green-500">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧩</span>
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Jak możesz to naprawić i poprawić ocenę kredytową</h4>
                    <p className="text-warm-neutral-700"><strong className="text-success-green-700">To jest kluczowa wiedza</strong>, której nie dostaniesz nigdzie indziej — pokażemy Ci krok po kroku, co zrobić, aby banki zaczęły mówić "TAK"</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 bg-navy-900 rounded-xl text-center">
              <p className="text-white text-lg font-semibold">
                💎 <strong className="text-prestige-gold-400">To wiedza warta znacznie więcej niż 29 zł</strong> — ale chcemy, aby była dostępna dla każdego, kto potrzebuje prawdziwej pomocy
              </p>
            </div>
          </div>

          {/* Bank Secrets Section */}
          <div className="bg-gradient-to-br from-navy-900 to-business-blue-900 rounded-2xl shadow-2xl p-6 md:p-10 mb-8 border border-prestige-gold-400">
            <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              🔓 To, czego bank Ci nie powie
            </h3>
            
            <div className="space-y-4 text-warm-neutral-100">
              <p className="text-lg leading-relaxed">
                <strong className="text-prestige-gold-400">Każdy wniosek o kredyt to więcej niż cyferki.</strong>
              </p>
              <p className="text-lg leading-relaxed">
                Banki korzystają z <strong className="text-white">algorytmów i scoringów</strong>, które oceniają Cię zanim ktokolwiek z Tobą porozmawia.
              </p>
              <p className="text-lg leading-relaxed">
                My pomagamy Ci <strong className="text-prestige-gold-400">zobaczyć tę drugą stronę lustra</strong> — i zrozumieć, dlaczego decyzja była taka, a nie inna.
              </p>
              <p className="text-lg leading-relaxed border-t border-white/20 pt-4 mt-4">
                <strong className="text-alert-red-300">A najgorsze w co możesz brnąć bez tej wiedzy, którą Ci powiemy?</strong> To iść do innego banku lub firmy po pożyczkę! <span className="text-white">Każda kolejna odmowa pogarsza Twoją sytuację i zamyka drzwi do taniego finansowania.</span>
              </p>
            </div>

            <div className="mt-6 p-5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-white text-center text-lg font-semibold">
                Poznaj zasady gry, które znają tylko wtajemniczeni — <span className="text-prestige-gold-400">za jedyne 29 zł</span>
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4">
              {benefits.map((benefit, index) => <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                  <p className="text-warm-neutral-700 text-lg">{benefit}</p>
                </div>)}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-prestige-gold-50 to-business-blue-50 rounded-xl border border-prestige-gold-200">
              <p className="text-navy-900 font-bold text-center text-lg mb-3">
                Zrozumiesz, jak widzą Cię banki – i co zrobić, by wreszcie usłyszeć „tak"
              </p>
              <p className="text-warm-neutral-700 text-center">
                A jeśli sytuacja pozwoli, pomożemy Ci uzyskać dostęp do prywatnych inwestorów, którzy mogą wspomóc Twoją drogę do finansowej stabilności.
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
              <strong className="text-navy-900">Za 29 zł</strong> otrzymujesz profesjonalną analizę PLUS dostęp do ekskluzywnej sieci prywatnych inwestorów i finansowania, które uporządkują Twoje finanse na najlepszych warunkach.
            </p>
          </div>

          {/* Warning - What You MISS with Free Services */}
          <div className="bg-gradient-to-br from-alert-red-50 to-warm-neutral-50 rounded-2xl shadow-lg p-4 md:p-8 border-2 border-alert-red-300">
            <h3 className="font-montserrat text-2xl font-bold text-alert-red-700 mb-6 text-center">
              ⚠️ Czego NIE DOSTANIESZ korzystając z darmowych usług:
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2 bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-alert-red-400">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-alert-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-navy-900 font-bold mb-1 text-sm md:text-base">Zostajesz sam — bez indywidualnej opieki</p>
                  <p className="text-warm-neutral-600 text-xs md:text-sm">Nikt nie zadba o Twoją sytuację. Otrzymasz ogólnikowe porady, które mogą NIE pasować do Twojego przypadku.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-alert-red-400">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-alert-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-navy-900 font-bold mb-1 text-sm md:text-base">Brak dostępu do prywatnych inwestorów i taniego finansowania</p>
                  <p className="text-warm-neutral-600 text-xs md:text-sm">Nie otrzymasz dostępu do ekskluzywnej sieci finansowania do 200 000 zł na najlepszych warunkach.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-alert-red-400">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-alert-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-navy-900 font-bold mb-1 text-sm md:text-base">Ryzyko amatorskich porad — możesz stracić dostęp do banku na lata</p>
                  <p className="text-warm-neutral-600 text-xs md:text-sm">Złe decyzje mogą <strong className="text-alert-red-700">na zawsze wykluczyć Cię z systemu bankowego</strong> i taniego kredytu.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white p-3 md:p-4 rounded-lg shadow-sm border-l-4 border-alert-red-400">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-alert-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-navy-900 font-bold mb-1 text-sm md:text-base">Nie masz pewności, czy to naprawdę „za darmo"</p>
                  <p className="text-warm-neutral-600 text-xs md:text-sm">Jeśli ktoś pracuje „za darmo", zastanów się — na czym zarobi? Często kończy się droższymi produktami i przekierowaniem do prowizyjnych partnerów.</p>
                </div>
              </div>

              
            </div>

            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-alert-red-100 rounded-xl border-2 border-alert-red-300">
              <p className="text-center text-navy-900 font-bold text-lg leading-relaxed">
                <strong className="text-alert-red-700">Nie ryzykuj swojej przyszłości finansowej.</strong><br />
                Za 29 zł otrzymujesz pewność, profesjonalizm i dostęp do prawdziwych rozwiązań.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-navy-900 via-business-blue-900 to-navy-900">
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-navy-900 font-semibold mb-2 block">
                  Imię i nazwisko *
                </Label>
                <Input id="name" type="text" required value={formData.name} onChange={e => setFormData({
                ...formData,
                name: e.target.value
              })} placeholder="Jan Kowalski" className="h-12" />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold mb-2 block">
                  Email *
                </Label>
                <Input id="email" type="email" required value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} placeholder="jan.kowalski@example.com" className="h-12" />
              </div>

              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold mb-2 block">
                  Numer telefonu *
                </Label>
                <Input id="phone" type="tel" required value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} placeholder="+48 123 456 789" className="h-12" />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox id="consent" checked={formData.consent} onCheckedChange={checked => setFormData({
                ...formData,
                consent: checked as boolean
              })} className="mt-1" />
                <Label htmlFor="consent" className="text-sm text-warm-neutral-700 cursor-pointer leading-relaxed">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji usługi analizy kredytowej *
                </Label>
              </div>

              {/* Price Box */}
              <div className="bg-prestige-gold-50 border-2 border-prestige-gold-300 rounded-xl p-6 text-center">
                <div className="text-sm text-warm-neutral-600 mb-1">Koszt analizy:</div>
                <div className="text-5xl font-bold text-prestige-gold-600 mb-2">29 zł</div>
                <div className="text-sm text-warm-neutral-600">Płatność BLIK • Błyskawiczna realizacja</div>
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-8 text-xl rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 mt-6 mb-4">
                {isSubmitting ? 'Przechodzę do płatności...' : <>
                    Zamawiam analizę — 29 zł
                    <ArrowRight className="inline-block ml-2 w-6 h-6" />
                  </>}
              </Button>

              <p className="text-center text-sm text-warm-neutral-600 pt-2">
                🔒 Bezpieczna płatność przez TPay • ⚡ Analiza gotowa w 24h
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="w-16 h-16 text-prestige-gold-500 mx-auto mb-4" />
          <h3 className="font-montserrat text-2xl font-bold text-navy-900 mb-4">
            Bezpieczna płatność i gwarancja jakości
          </h3>
          <p className="text-warm-neutral-600 text-lg leading-relaxed">
            Twoje dane są bezpieczne. Płatność realizowana przez <strong>TPay</strong> — jednego z największych operatorów płatności w Polsce. Gwarantujemy profesjonalną analizę przez ekspertów z <strong>wieloletnim doświadczeniem</strong>.
          </p>
        </div>
      </section>

    </div>;
};
export default AnalizaKredytowa;