import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSupabaseTracking } from '@/hooks/useSupabaseTracking';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Clock, Shield, Zap, CheckCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
const PaymentExpress = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    trackPageView
  } = useSupabaseTracking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [blikCode, setBlikCode] = useState('');
  const [error, setError] = useState('');
  const [isWaitingForConfirmation, setIsWaitingForConfirmation] = useState(false);

  // Dane z formularza kontaktowego (już są przekazane)
  const fullName = searchParams.get('name') || 'Jan Kowalski';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'Jan';
  const lastName = nameParts.slice(1).join(' ') || 'Kowalski';
  const email = searchParams.get('email') || 'kontakt@example.com';
  const phone = searchParams.get('phone') || '123456789';

  // Licznik 11 minut
  const {
    formattedTime,
    isExpired
  } = useCountdown({
    initialTime: 660,
    storageKey: 'payment_express_timer',
    onComplete: () => {
      const params = new URLSearchParams({
        name: fullName,
        email,
        phone
      });
      navigate(`/podziekowaniebezvip?${params.toString()}`);
    }
  });
  useEffect(() => {
    trackPageView('payment_express', undefined, 'main_site');

    // Sprawdź czy mamy prawdziwe dane
    const hasRealData = searchParams.get('name') && searchParams.get('email') && searchParams.get('phone');
    if (!hasRealData) {
      console.warn('⚠️ PaymentExpress otwarty bez danych z formularza');
      setError('Brak danych. Przejdź przez formularz kontaktowy.');
      return;
    }

    // Auto-create transaction only if we have real data
    handleInitiatePayment();
  }, []);
  const handleInitiatePayment = async () => {
    if (transactionId) return; // Already created

    // Validate data before creating transaction
    if (!firstName || firstName.length < 3) {
      setError('Imię musi mieć minimum 3 znaki');
      return;
    }
    if (!phone || phone.length < 9) {
      setError('Numer telefonu musi mieć minimum 9 cyfr');
      return;
    }
    setIsProcessing(true);
    try {
      const {
        data,
        error: functionError
      } = await supabase.functions.invoke('create-tpay-transaction', {
        body: {
          firstName,
          lastName,
          email,
          phone,
          amount: 29
        }
      });
      if (functionError) throw new Error(functionError.message || 'Błąd tworzenia transakcji');
      if (data.error) throw new Error(data.details || data.error);
      setTransactionId(data.transactionId);
    } catch (err) {
      console.error('❌ Error:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił błąd. Spróbuj ponownie.');
    } finally {
      setIsProcessing(false);
    }
  };
  const handleBlikPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (blikCode.length !== 6) {
      setError('Kod BLIK musi mieć 6 cyfr');
      return;
    }
    setIsProcessing(true);
    try {
      const {
        data,
        error: functionError
      } = await supabase.functions.invoke('confirm-blik-payment', {
        body: {
          transactionId,
          blikCode
        }
      });
      if (functionError) throw new Error(functionError.message || 'Błąd płatności BLIK');
      if (data.error) throw new Error(data.details || data.error);
      setIsWaitingForConfirmation(true);
      setIsProcessing(false);

      // Poll for payment status
      let attempts = 0;
      const maxAttempts = 30;
      let pollingActive = true;
      const pollStatus = async () => {
        if (!pollingActive) return;
        attempts++;
        try {
          const {
            data: statusData,
            error: statusError
          } = await supabase.functions.invoke('check-payment-status', {
            body: {
              transactionId
            }
          });
          if (statusError) {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Nie można sprawdzić statusu płatności. Spróbuj ponownie.');
            return;
          }
          if (statusData.status === 'correct' || statusData.paymentStatus === 'correct') {
            pollingActive = false;

            // Facebook Pixel tracking
            if (typeof window !== 'undefined' && (window as any).fbq) {
              (window as any).fbq('track', 'Lead', {
                content_name: 'Płatność potwierdzona',
                content_category: 'Payment Confirmed',
                value: 29,
                currency: 'PLN'
              });
            }

            // Google Ads tracking
            if ((window as any).gtag) {
              (window as any).gtag('event', 'conversion', {
                'send_to': 'AW-16741438120/5yX2CKmazt0ZEKil-K4-',
                'value': 29,
                'currency': 'PLN',
                'transaction_id': transactionId
              });
            }

            // Send client data via email
            try {
              console.log('📧 Sending client data email...');
              await supabase.functions.invoke('send-client-data-email', {
                body: {
                  name: fullName,
                  email,
                  phone,
                  amount: 29,
                  service: 'Priorytetowa Obsługa VIP - Konsolidacja Długów',
                  transactionId,
                  paymentStatus: 'Opłacone'
                }
              });
              console.log('✅ Client data email sent');
            } catch (emailError) {
              console.error('⚠️ Email sending failed (non-critical):', emailError);
              // Don't block the flow if email fails
            }
            localStorage.setItem('payment_status', 'Opłacone');
            const paymentData = {
              transaction_id: transactionId,
              amount: 29,
              currency: 'PLN',
              paid_at: new Date().toISOString()
            };
            localStorage.setItem('payment_data', JSON.stringify(paymentData));
            const params = new URLSearchParams({
              paid: 'true',
              payment_status: 'Opłacone',
              transactionId,
              name: fullName,
              email,
              phone
            });
            navigate(`/podziekowania?${params.toString()}`);
            return;
          }
          if (statusData.status === 'declined' || statusData.status === 'error' || statusData.status === 'cancelled') {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Płatność została odrzucona. Sprawdź kod BLIK i spróbuj ponownie.');
            setBlikCode('');
            return;
          }
          if (attempts < maxAttempts && pollingActive) {
            setTimeout(pollStatus, 2000);
          } else if (pollingActive) {
            pollingActive = false;
            setIsWaitingForConfirmation(false);
            setIsProcessing(false);
            setError('Upłynął limit czasu oczekiwania na potwierdzenie płatności. Spróbuj ponownie.');
            setBlikCode('');
          }
        } catch (err) {
          pollingActive = false;
          setIsWaitingForConfirmation(false);
          setIsProcessing(false);
          setError('Błąd sprawdzania statusu płatności. Spróbuj ponownie.');
          setBlikCode('');
        }
      };
      setTimeout(pollStatus, 2000);
    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'Płatność nie powiodła się. Sprawdź kod BLIK i spróbuj ponownie.');
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Sticky Timer Bar */}
        <div className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 shadow-lg ${isExpired ? 'bg-red-600' : 'bg-gradient-to-r from-orange-500 to-red-600'}`}>
          <div className="max-w-md mx-auto flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold text-lg">{formattedTime}</span>
            </div>
            <span className="text-sm font-semibold">Priorytet VIP</span>
          </div>
        </div>

        {/* Main Card */}
        <div className="mt-16 bg-white rounded-2xl shadow-2xl border-0 p-8">
          
          {/* Header z Dariuszem */}
          <div className="text-center mb-6">
            <img 
              src="/lovable-uploads/01dcb25b-999a-4c0d-b7da-525c21306610.png" 
              alt="Dariusz Wentrych" 
              className="w-20 h-20 rounded-full mx-auto mb-4 border-3 border-blue-500 shadow-xl object-cover" 
            />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ✅ Potwierdź swoją analizę kredytową
            </h1>
            <p className="text-gray-600">
              Dariusz Wentrych czeka na weryfikację
            </p>
          </div>

          {/* Kwota */}
          <div className="text-center mb-6">
            <div className="inline-flex items-baseline gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-lg">
              <span className="text-5xl font-black">29 zł</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Jednorazowa opłata weryfikacyjna</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
              {error}
            </div>
          )}

          {/* BLIK Payment Form */}
          <form onSubmit={handleBlikPayment} className="space-y-6">
            <div>
              <label className="block text-center text-base font-semibold text-gray-800 mb-3">
                Wpisz kod BLIK z aplikacji bankowej
              </label>
              <Input 
                type="text" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                maxLength={6} 
                value={blikCode} 
                onChange={e => setBlikCode(e.target.value.replace(/\D/g, ''))} 
                placeholder="_ _ _ _ _ _" 
                className="text-center text-3xl font-mono tracking-[0.5em] h-16 border-2 border-blue-300 focus:border-blue-500" 
                disabled={isProcessing || isWaitingForConfirmation} 
              />
            </div>

            {isWaitingForConfirmation && (
              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 text-center animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
                <p className="text-base text-blue-900 font-semibold">
                  Potwierdź płatność w aplikacji bankowej
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl transform transition hover:scale-105" 
              disabled={isProcessing || isWaitingForConfirmation || blikCode.length !== 6}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Przetwarzanie...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 mr-2" />
                  Zapłać i potwierdź analizę
                </>
              )}
            </Button>
          </form>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Bezpieczne</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/logos/blik-logo.png" alt="BLIK" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default PaymentExpress;