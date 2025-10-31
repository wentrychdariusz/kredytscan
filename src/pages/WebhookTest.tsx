import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const WebhookTest = () => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const sendTestData = async () => {
    setLoading(true);
    setStatus('Wysyłam dane...');

    const payload = {
      name: 'Jan Kowalski',
      phone: '123456789',
      email: 'test@example.com',
      payment_status: 'Opłacone'
    };

    try {
      const webhookUrl = 'https://hook.eu2.make.com/wt74o0rwyeq6nujxmy6bx38wpu2osua1';
      
      console.log('📤 Wysyłam testowe dane:', payload);
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('✅ Odpowiedź:', response.status);
      
      setStatus(`✅ Dane wysłane! Status: ${response.status}`);
    } catch (error) {
      console.error('❌ Błąd:', error);
      setStatus(`❌ Błąd: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-neutral-50 via-business-blue-50 to-prestige-gold-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-navy-900 mb-6">Test Webhooka</h1>
        
        <div className="bg-warm-neutral-100 rounded-lg p-4 mb-6">
          <p className="text-sm font-semibold mb-2">Dane do wysłania:</p>
          <pre className="text-xs bg-white p-3 rounded overflow-auto">
{JSON.stringify({
  name: 'Jan Kowalski',
  phone: '123456789',
  email: 'test@example.com',
  payment_status: 'Opłacone'
}, null, 2)}
          </pre>
        </div>

        <Button 
          onClick={sendTestData}
          disabled={loading}
          className="w-full mb-4"
        >
          {loading ? 'Wysyłam...' : 'Wyślij testowe dane'}
        </Button>

        {status && (
          <div className="bg-white border border-warm-neutral-200 rounded-lg p-4">
            <p className="text-sm">{status}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WebhookTest;
