import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ClientData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  service: string;
  transactionId?: string;
  paymentStatus: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📧 Starting send-client-data-email function');

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const recipientEmail = Deno.env.get('RECIPIENT_EMAIL') || 'biuro@kredytscan.pl';

    if (!resendApiKey) {
      console.error('❌ RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const clientData: ClientData = await req.json();
    console.log('📥 Client data received:', { 
      name: clientData.name, 
      email: clientData.email,
      service: clientData.service 
    });

    // Email HTML template
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .data-row { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #3b82f6; }
            .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
            .value { font-size: 16px; color: #374151; }
            .status { display: inline-block; padding: 8px 16px; background: #10b981; color: white; border-radius: 20px; font-weight: bold; margin-top: 10px; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎯 Nowe Zgłoszenie Klienta</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Płatność zweryfikowana ✅</p>
            </div>
            
            <div class="content">
              <div class="data-row">
                <div class="label">👤 Imię i nazwisko:</div>
                <div class="value">${clientData.name}</div>
              </div>
              
              <div class="data-row">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${clientData.email}" style="color: #3b82f6; text-decoration: none;">${clientData.email}</a></div>
              </div>
              
              <div class="data-row">
                <div class="label">📱 Telefon:</div>
                <div class="value"><a href="tel:${clientData.phone}" style="color: #3b82f6; text-decoration: none;">${clientData.phone}</a></div>
              </div>
              
              <div class="data-row">
                <div class="label">💼 Usługa:</div>
                <div class="value">${clientData.service}</div>
              </div>
              
              <div class="data-row">
                <div class="label">💰 Kwota:</div>
                <div class="value">${clientData.amount.toFixed(2)} zł</div>
              </div>
              
              ${clientData.transactionId ? `
              <div class="data-row">
                <div class="label">🔑 ID Transakcji:</div>
                <div class="value">${clientData.transactionId}</div>
              </div>
              ` : ''}
              
              <div class="data-row">
                <div class="label">✅ Status płatności:</div>
                <div class="status">${clientData.paymentStatus}</div>
              </div>
              
              <div class="footer">
                <p>📅 Data zgłoszenia: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}</p>
                <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  Kredyt Scan - System powiadomień
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Kredyt Scan <onboarding@resend.dev>',
        to: [recipientEmail],
        subject: `🎯 Nowy Klient: ${clientData.name} - ${clientData.service}`,
        html: emailHtml,
        reply_to: clientData.email,
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Resend API error:', data);
      throw new Error(data.message || 'Failed to send email');
    }

    console.log('✅ Email sent successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailId: data?.id,
        message: 'Email wysłany pomyślnie' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('❌ Error in send-client-data-email:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
