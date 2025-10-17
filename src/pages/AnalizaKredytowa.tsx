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
          
          {/* Benefit Headline */}
          <div className="text-center mb-6">
            <h1 className="font-montserrat text-2xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-3 leading-tight">
              Nie ryzykuj kolejnej odmowy.
            </h1>
            <p className="text-lg md:text-2xl text-warm-neutral-700 leading-relaxed">
              Zobacz, co <span className="text-prestige-gold-600 font-bold">banki i firmy pożyczkowe</span> wiedzą o Tobie<br className="hidden md:block" /> — zanim podejmiesz decyzję.
            </p>
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
                <p className="font-bold text-navy-900 text-xl mb-1">👤 Dariusz Wentrych</p>
                <p className="text-warm-neutral-600 mb-1">Ekspert finansowy z 15-letnim doświadczeniem</p>
                <p className="text-prestige-gold-600 font-semibold">Autor książki „Nowe życie bez długów"</p>
              </div>
            </div>
            
            <div className="bg-warm-neutral-50 border-l-4 border-prestige-gold-400 p-5 rounded-r-lg mb-5">
              <p className="text-warm-neutral-700 leading-relaxed italic text-base md:text-lg">
                „Widziałem setki przypadków, gdzie ludzie mieli złych doradców i popełnili błędy, które kosztowały ich utratę finansowania w banku — bo korzystali z darmowych porad w internecie."
              </p>
            </div>

            <p className="text-warm-neutral-700 leading-relaxed mb-3 text-center">
              Za 29 zł dowiesz się prawdy o swojej sytuacji finansowej i unikniesz błędów, które eliminują Cię z systemu bankowego.
            </p>
            <p className="text-navy-900 font-semibold leading-relaxed text-center">
              Nawet jeśli masz chwilówki — pomożemy Ci uporządkować sytuację. <strong className="text-success-green-700">Jest rozwiązanie. Jest nadzieja.</strong>
            </p>
          </div>

          {/* Micro Summary - Co otrzymasz */}
          <div className="bg-gradient-to-r from-prestige-gold-50 to-business-blue-50 rounded-xl shadow-lg p-6 md:p-8 mb-8 border-2 border-prestige-gold-300">
            <h3 className="font-montserrat text-xl md:text-2xl font-bold text-navy-900 mb-5 text-center">
              💼 Za 29 zł otrzymasz:
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
                  <strong>Wskazanie błędów w BIK, BIG i InfoMonitorze</strong> — dowiesz się, co Cię blokuje
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

          {/* CTA #1 - Hero Section */}
          <div className="text-center px-2">
            <a href="#formularz-zamowienia" className="block">
              <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-6 py-5 md:py-7 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto flex flex-col items-center gap-1">
                <span className="text-lg md:text-2xl leading-tight">Sprawdź swoją zdolność kredytową</span>
                <span className="text-sm md:text-base font-normal opacity-90">Analiza za 29 zł</span>
              </Button>
            </a>
            <p className="mt-4 text-xs md:text-sm text-warm-neutral-600">
              💳 Bezpieczna płatność • ⚡ Natychmiastowy dostęp
            </p>
          </div>
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
                        "Za 29 zł otrzymałam więcej informacji niż z trzech wizyt w banku. Profesjonalnie, konkretnie i skutecznie."
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
                        "Myślałem, że mam brudny BIK i już nigdy nie dostanę kredytu. Po analizie i czyszczeniu BIK dostałem finansowanie na rozwój firmy."
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
                  Przeanalizujemy informacje z BIK, BIG i InfoMonitora
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
                  Zaproponujemy czyszczenie BIK — największe know-how w Polsce w tej dziedzinie
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
                <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-6 py-6 md:py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto flex flex-col items-center gap-1">
                  <span className="text-xl md:text-2xl leading-tight">Zamów analizę — 29 zł</span>
                  <span className="text-sm md:text-base font-normal opacity-90">i poznaj prawdę o swojej zdolności</span>
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
              <strong className="text-navy-900">Za 29 zł</strong> otrzymujesz profesjonalną analizę PLUS dostęp do ekskluzywnej sieci prywatnych inwestorów i finansowania, które uporządkują Twoje finanse na najlepszych warunkach.
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
                <div className="bg-alert-red-100 p-4 border-r border-warm-neutral-300">
                  <h4 className="font-montserrat font-bold text-center text-alert-red-700 text-sm md:text-base">
                    ❌ Darmowe usługi
                  </h4>
                </div>
                <div className="bg-success-green-100 p-4">
                  <h4 className="font-montserrat font-bold text-center text-success-green-700 text-sm md:text-base">
                    ✅ Kredyt Scan
                  </h4>
                </div>

                {/* Wiersz 1 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Ogólnikowe porady
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
                    ✅ Indywidualna analiza
                  </p>
                </div>

                {/* Wiersz 2 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Brak analizy BIK
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
                    ✅ Pełna analiza BIK, BIG, InfoMonitor
                  </p>
                </div>

                {/* Wiersz 3 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Ryzyko złych rad
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
                    ✅ 15 lat doświadczenia
                  </p>
                </div>

                {/* Wiersz 4 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Brak dostępu do inwestorów
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
                    ✅ Dostęp do prywatnych inwestorów
                  </p>
                </div>

                {/* Wiersz 5 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Ukryte koszty prowizji
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
                    ✅ Transparentna cena: tylko 29 zł
                  </p>
                </div>

                {/* Wiersz 6 */}
                <div className="p-3 md:p-4 border-r border-t border-warm-neutral-300 bg-alert-red-50/30">
                  <p className="text-xs md:text-sm text-warm-neutral-700">
                    ❌ Brak konkretnego planu
                  </p>
                </div>
                <div className="p-3 md:p-4 border-t border-warm-neutral-300 bg-success-green-50/30">
                  <p className="text-xs md:text-sm font-semibold text-navy-900">
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
                  ❌ Brak analizy BIK vs ✅ Pełna analiza BIK, BIG, InfoMonitor
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
                Za 29 zł otrzymujesz pewność, profesjonalizm i dostęp do prawdziwych rozwiązań.
              </p>
            </div>

            {/* CTA #3 - Po sekcji co NIE dostaniesz za darmo */}
            <div className="text-center mt-8 px-2">
              <a href="#formularz-zamowienia" className="block">
                <Button size="lg" className="bg-prestige-gold-600 hover:bg-prestige-gold-700 text-white font-bold px-6 py-6 md:py-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 w-full h-auto flex flex-col items-center gap-1">
                  <span className="text-xl md:text-2xl leading-tight">Zamów teraz za 29 zł</span>
                  <span className="text-sm md:text-base font-normal opacity-90">🔍 i sprawdź, co widzi o Tobie bank</span>
                </Button>
              </a>
              <p className="mt-4 text-xs md:text-sm text-warm-neutral-600">
                ⚡ Natychmiastowy dostęp po płatności
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
                Zamów swoją analizę za 29 zł
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
              <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-6 px-4 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 mt-6 mb-4">
                {isSubmitting ? 'Przechodzę do płatności...' : <>
                    Zamawiam analizę — 29 zł
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
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

    </div>;
};
export default AnalizaKredytowa;