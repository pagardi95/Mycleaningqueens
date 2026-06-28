import React, { useState } from 'react';
import { 
  Mail, 
  User, 
  Building2, 
  Building,
  CheckCircle2, 
  ArrowLeft, 
  Info, 
  Sparkles,
  Send
} from 'lucide-react';
import { QuoteFormData } from '../../types';

interface ContactFormPageProps {
  navigateTo: (path: string) => void;
}

export const ContactFormPage: React.FC<ContactFormPageProps> = ({ navigateTo }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    company: '',
    buildingType: 'Bürogebäude',
    area: 500, // not strictly used by current email template but part of type
    frequency: 'Täglich', // not strictly used but part of type
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        const msg = typeof result.error === 'object' 
          ? (result.error.message || JSON.stringify(result.error)) 
          : (result.error || "Ein unbekannter Fehler ist aufgetreten.");
        setError(msg);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Verbindung zum Server fehlgeschlagen. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back navigation link */}
        <button 
          onClick={() => navigateTo('/')} 
          className="inline-flex items-center gap-2 text-purple-800 hover:text-purple-900 font-semibold mb-8 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-950 mb-4">
            Unverbindliche Anfrage
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Hinterlassen Sie uns eine Nachricht über unser Kontaktformular. Wir erstellen Ihnen ein maßgeschneidertes, unverbindliches Angebot für Ihre Gebäudereinigung.
          </p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="p-8 md:p-16">
              <h3 className="text-2xl font-serif font-bold mb-8 text-slate-900 border-b pb-4">
                Nachricht senden
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1">Ansprechpartner / Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="Vor- & Nachname"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1">E-Mail Adresse</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="ihre@firma.de"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Company */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1">Firma / Institution (Optional)</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      placeholder="Unternehmensname"
                    />
                  </div>
                </div>

                {/* Building Type */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block ml-1">Objekttyp</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                    <select 
                      name="buildingType"
                      value={formData.buildingType}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
                    >
                      <option>Bürogebäude</option>
                      <option>Fitness Studio</option>
                      <option>Arztpraxis / Klinik</option>
                      <option>Kanzlei</option>
                      <option>Sonstiges</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mb-10 space-y-2">
                <label className="text-sm font-bold text-slate-700 block ml-1">Zusätzliche Infos / Ihre Nachricht</label>
                <textarea 
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  placeholder="Beschreiben Sie Ihre Anfrage (z.B. m², gewünschte Häufigkeit, Sonderwünsche)..."
                ></textarea>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Submit button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-5 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xl rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 disabled:bg-purple-400 disabled:scale-100"
              >
                {loading ? (
                  <span>Wird gesendet...</span>
                ) : (
                  <>
                    <span>Nachricht absenden</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-6 italic">
                Sicher verschlüsselte SSL-Übertragung an info@mycleaningqueens.de
              </p>
            </form>
          ) : (
            <div className="p-12 md:p-20 text-center bg-purple-900 text-white rounded-[3rem] animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                <CheckCircle2 className="w-12 h-12 text-purple-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Nachricht erfolgreich gesendet!</h3>
              <p className="text-purple-100 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns so schnell wie möglich bei Ihnen melden.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-white text-purple-900 font-bold rounded-full transition-all hover:bg-purple-50"
                >
                  Weitere Nachricht senden
                </button>
                <button 
                  onClick={() => navigateTo('/')}
                  className="px-8 py-3 bg-purple-800 hover:bg-purple-700 text-white font-bold rounded-full border border-purple-700 transition-all"
                >
                  Zurück zur Startseite
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
