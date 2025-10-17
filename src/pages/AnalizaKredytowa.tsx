import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Shield, CheckCircle, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AnalizaKredytowa = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const benefits = [
    "Ocenimy Twoje możliwości kredytowania na podstawie danych i historii płatniczej",
    "Wskażemy błędy i czynniki ryzyka, które obniżają Twoją wiarygodność",
    "Przeanalizujemy informacje z BIK, BIG i InfoMonitora",
    "Zaproponujemy czyszczenie BIK — największe know-how w Polsce w tej dziedzinie",
    "Pokażemy, co można poprawić, by zwiększyć szanse na kredyt w banku",
    "Jeśli będzie to możliwe, skontaktujemy Cię z naszą bazą prywatnych inwestorów",
    "Zaproponujemy najlepszy kierunek działania dopasowany do Twojej sytuacji"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-warm-neutral-50 to-business-blue-50">
      
      {/* Hero Section */}
      <section className="pt-8 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Alert Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-alert-red-100 text-alert-red-700 px-5 py-2 rounded-full animate-pulse">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-bold">BANK ODMÓWIŁ CI KREDYTU?</span>
            </div>
          </div>

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
              <strong>Nie działaj po omacku</strong> — najpierw dowiedz się, co naprawdę wpływa na Twoją zdolność kredytową i co możesz poprawić, zanim złożysz kolejny wniosek.
            </p>
          </div>

          {/* Warning from Dariusz */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-alert-red-200">
            <div className="flex flex-col md:flex-row items-start gap-5">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-3 border-alert-red-400 flex-shrink-0">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych"
                  className="object-cover"
                />
                <AvatarFallback className="text-xl font-bold">DW</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-warm-neutral-700 leading-relaxed mb-3">
                  <strong className="text-navy-900">Widziałem setki przypadków</strong>, gdzie ludzie mieli złych doradców i popełnili błędy, które kosztowały ich <strong className="text-alert-red-700">utratę taniego finansowania w banku</strong> — bo korzystali z darmowej pomocy firm z internetu.
                </p>
                <p className="text-warm-neutral-700 leading-relaxed">
                  Za 29 zł dowiesz się prawdy o swojej sytuacji i unikniesz kosztownych błędów.
                </p>
                <p className="text-sm text-warm-neutral-500 mt-2 italic">— Dariusz Wentrych, ekspert finansowy</p>
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
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-prestige-gold-400">
                <AvatarImage 
                  src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
                  alt="Dariusz Wentrych"
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl font-bold">DW</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-navy-900 mb-2">
                  Dariusz Wentrych
                </h3>
                <p className="text-warm-neutral-600 text-lg">
                  Ekspert finansowy z 15-letnim doświadczeniem
                </p>
              </div>
            </div>

            {/* Expert Message */}
            <div className="space-y-4 text-warm-neutral-700">
              <p className="text-lg leading-relaxed">
                <strong className="text-navy-900">Tysiące osób</strong> już skorzystało z mojej pomocy i odzyskało kontrolę nad swoimi finansami. Teraz czas na Ciebie!
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
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-navy-900 mb-8 text-center">
            Co otrzymasz w ramach analizy?
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-success-green-600 flex-shrink-0 mt-1" />
                  <p className="text-warm-neutral-700 text-lg">{benefit}</p>
                </div>
              ))}
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
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jan Kowalski"
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold mb-2 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jan.kowalski@example.com"
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-navy-900 font-semibold mb-2 block">
                  Numer telefonu *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+48 123 456 789"
                  className="h-12"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  className="mt-1"
                />
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
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                {isSubmitting ? (
                  'Przechodzę do płatności...'
                ) : (
                  <>
                    Zamawiam analizę — 29 zł
                    <ArrowRight className="inline-block ml-2 w-5 h-5" />
                  </>
                )}
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

    </div>
  );
};

export default AnalizaKredytowa;