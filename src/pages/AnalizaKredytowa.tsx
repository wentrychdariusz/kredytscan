import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, CheckCircle, AlertCircle, TrendingUp, FileText, Users } from 'lucide-react';
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
      // Przekierowanie do płatności z danymi
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
    "Wskażemy błędy i czynniki ryzyka, które obniżają Twoją wiarygodność kredytową",
    "Przeanalizujemy informacje z BIK, BIG i InfoMonitora",
    "Pokażemy, co można poprawić, by zwiększyć szanse na kredyt",
    "Zaproponujemy kierunek działania dopasowany do Twojej sytuacji"
  ];

  const stats = [
    { icon: Users, value: "2500+", label: "Zadowolonych klientów" },
    { icon: FileText, value: "98%", label: "Skuteczność analiz" },
    { icon: TrendingUp, value: "15 lat", label: "Doświadczenia" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-white to-business-blue-50">
      {/* Hero Section */}
      <section className="pt-12 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-prestige-gold-100 text-prestige-gold-700 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Profesjonalna Analiza</span>
          </div>
          
          <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6 leading-tight">
            Profesjonalna Analiza<br />
            <span className="text-prestige-gold-500">Kredytowa — 29 zł</span>
          </h1>

          <div className="bg-warm-neutral-100 border-l-4 border-business-blue-500 p-6 rounded-lg mb-8 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-business-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg font-semibold text-navy-900 mb-2">
                  Masz problem z BIK? Bank odmówił Ci kredytu?
                </p>
                <p className="text-warm-neutral-700">
                  Nie działaj po omacku — najpierw dowiedz się, co naprawdę wpływa na Twoją zdolność kredytową i co możesz poprawić, zanim złożysz kolejny wniosek.
                </p>
              </div>
            </div>
          </div>

          <p className="text-xl text-warm-neutral-600 mb-8 max-w-2xl mx-auto">
            Za jedyne <span className="font-bold text-prestige-gold-600">29 zł</span> otrzymasz pełną analizę swojej sytuacji kredytowej, przygotowaną przez ekspertów z doświadczeniem w finansach bankowych.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-prestige-gold-100 rounded-full mb-3">
                  <stat.icon className="w-6 h-6 text-prestige-gold-600" />
                </div>
                <div className="font-bold text-2xl text-navy-900">{stat.value}</div>
                <div className="text-sm text-warm-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-3xl font-bold text-navy-900 mb-8 text-center">
            Co otrzymasz w ramach analizy?
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-success-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success-green-600" />
                  </div>
                  <p className="text-warm-neutral-700 text-lg">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-prestige-gold-50 to-business-blue-50 rounded-xl">
              <p className="text-navy-900 font-semibold text-center text-lg">
                To profesjonalna analiza, dzięki której zrozumiesz, jak widzą Cię banki – i co zrobić, by wreszcie usłyszeć „tak".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-navy-900 to-business-blue-900">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="font-montserrat text-3xl font-bold text-navy-900 mb-3">
                Zamów swoją analizę już teraz
              </h2>
              <p className="text-warm-neutral-600">
                Wypełnij formularz i przejdź do płatności — analiza zostanie przygotowana w ciągu 24h
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="mt-2"
                  placeholder="Jan Kowalski"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-navy-900 font-semibold">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
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
                  className="mt-2"
                  placeholder="+48 123 456 789"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="consent" className="text-sm text-warm-neutral-700 cursor-pointer">
                  Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji usługi analizy kredytowej *
                </Label>
              </div>

              <div className="bg-prestige-gold-50 border border-prestige-gold-200 rounded-lg p-6 text-center">
                <div className="text-sm text-warm-neutral-600 mb-2">Koszt analizy:</div>
                <div className="text-4xl font-bold text-prestige-gold-600 mb-1">29 zł</div>
                <div className="text-sm text-warm-neutral-600">Płatność BLIK</div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-prestige-gold-500 to-prestige-gold-600 hover:from-prestige-gold-600 hover:to-prestige-gold-700 text-white font-bold py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {isSubmitting ? 'Przechodzę do płatności...' : 'Zamawiam analizę — 29 zł'}
              </Button>

              <p className="text-center text-sm text-warm-neutral-600">
                Po opłaceniu zamówienia skontaktujemy się z Tobą w ciągu 24h z gotową analizą
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 text-prestige-gold-500 mx-auto mb-6" />
          <h3 className="font-montserrat text-2xl font-bold text-navy-900 mb-4">
            Bezpieczna płatność i gwarancja jakości
          </h3>
          <p className="text-warm-neutral-600 max-w-2xl mx-auto">
            Twoje dane są bezpieczne. Płatność realizowana jest przez TPay — jednego z największych operatorów płatności w Polsce. Gwarantujemy profesjonalną analizę przygotowaną przez ekspertów z wieloletnim doświadczeniem.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AnalizaKredytowa;