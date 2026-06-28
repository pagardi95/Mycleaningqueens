import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Plus, 
  Trash2, 
  FileText, 
  Euro, 
  Calendar, 
  Hash, 
  HelpCircle,
  CheckCircle2,
  Lock,
  Building,
  Building2
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

interface InvoicePageProps {
  navigateTo: (path: string) => void;
}

export const InvoicePage: React.FC<InvoicePageProps> = ({ navigateTo }) => {
  // Password-protection state
  const [isUnlocked, setIsUnlocked] = useState(
    typeof window !== 'undefined' && sessionStorage.getItem('invoice_unlocked') === 'true'
  );
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Preset recipients list
  const PRESET_RECIPIENTS = [
    {
      id: 'holmes',
      name: 'Holmes Place Health Clubs GmbH',
      street: 'Charlottenstraße 65',
      city: '10117 Berlin',
      contact: 'z. Hd. Geschäftsleitung'
    },
    {
      id: 'custom',
      name: 'Eigener Empfänger...',
      street: '',
      city: '',
      contact: ''
    }
  ];

  // Active recipient ID
  const [selectedRecipientId, setSelectedRecipientId] = useState('holmes');

  // Invoice state
  const [invoiceNumber, setInvoiceNumber] = useState(`RE-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`);
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().substring(0, 10));
  const [servicePeriod, setServicePeriod] = useState(() => {
    const d = new Date();
    return d.toLocaleString('de-DE', { month: 'long', year: 'numeric' });
  });
  const [paymentTerms, setPaymentTerms] = useState<7 | 14>(14);
  const [customDescription, setCustomDescription] = useState('Gebäudereinigungsarbeiten vereinbarungsgemäß für den aktuellen Leistungszeitraum.');
  
  // Recipient info states
  const [recipientName, setRecipientName] = useState(PRESET_RECIPIENTS[0].name);
  const [recipientStreet, setRecipientStreet] = useState(PRESET_RECIPIENTS[0].street);
  const [recipientCity, setRecipientCity] = useState(PRESET_RECIPIENTS[0].city);
  const [recipientContact, setRecipientContact] = useState(PRESET_RECIPIENTS[0].contact);

  // Sync state if preset changes
  const handleRecipientPresetChange = (presetId: string) => {
    setSelectedRecipientId(presetId);
    const selected = PRESET_RECIPIENTS.find(r => r.id === presetId);
    if (selected) {
      if (presetId === 'custom') {
        setRecipientName('Neue Firma GmbH');
        setRecipientStreet('Straße 1');
        setRecipientCity('10115 Berlin');
        setRecipientContact('');
      } else {
        setRecipientName(selected.name);
        setRecipientStreet(selected.street);
        setRecipientCity(selected.city);
        setRecipientContact(selected.contact);
      }
    }
  };

  // Sender info (DOE Kreativ GmbH is always the sender now)
  const senderName = 'DOE Kreativ GmbH';
  const senderStreet = 'Kantstraße 65';
  const senderCity = '10627 Berlin';
  const senderPhone = '+49 (0) 30 12345678';
  const senderEmail = 'info@doekreativ.de';
  const senderTaxId = '27/263/50099';
  const senderUstId = 'DE 136671 B';
  const senderBankName = 'Berliner Sparkasse';
  const senderIban = 'DE89 3704 0044 0532 0130 00';
  const senderBic = 'WELADED1BER';

  // Invoice Items (Simple items with description, quantity, price - no complex qm/unit selection)
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: '1',
      description: 'Unterhaltsreinigungsarbeiten für Büro- und Fitnessflächen',
      quantity: 1,
      unit: '',
      unitPrice: 1250.00,
    },
    {
      id: '2',
      description: 'Grundreinigung Sanitärbereiche',
      quantity: 1,
      unit: '',
      unitPrice: 350.00,
    }
  ]);

  const taxRate = 19; // Always 19% VAT

  // Derived Values
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  // Calculate payment due date
  const [dueDate, setDueDate] = useState('');
  useEffect(() => {
    if (!invoiceDate) return;
    const dateObj = new Date(invoiceDate);
    dateObj.setDate(dateObj.getDate() + paymentTerms);
    setDueDate(dateObj.toISOString().substring(0, 10));
  }, [invoiceDate, paymentTerms]);

  // Handle adding an item
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'Neue Dienstleistung',
      quantity: 1,
      unit: '',
      unitPrice: 150.00
    };
    setItems([...items, newItem]);
  };

  // Handle deleting an item
  const handleDeleteItem = (id: string) => {
    if (items.length <= 1) {
      alert('Eine Rechnung muss mindestens einen Posten enthalten.');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  // Handle updating an item
  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'Queen' || passwordInput.trim() === 'queen') {
      sessionStorage.setItem('invoice_unlocked', 'true');
      setIsUnlocked(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const formatDateGerman = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  if (!isUnlocked) {
    return (
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen flex items-center justify-center font-sans">
        <div className="max-w-md w-full px-6">
          <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-purple-800"></div>
            
            <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center text-purple-800 mx-auto mb-8 shadow-inner">
              <Lock className="w-10 h-10" />
            </div>

            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">
              Rechnungs-Generator
            </h1>
            <p className="text-slate-500 mb-8 leading-relaxed text-sm">
              Dieser geschützte Bereich ist nur für autorisierte Personen zugänglich. Bitte geben Sie das Passwort ein.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-2">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (passwordError) setPasswordError(false);
                  }}
                  required
                  placeholder="Passwort eingeben"
                  className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border outline-none text-center text-lg font-semibold transition-all ${
                    passwordError 
                      ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
                      : 'border-slate-200 focus:ring-2 focus:ring-purple-500'
                  }`}
                />
                {passwordError && (
                  <p className="text-red-600 text-xs font-bold animate-pulse">
                    Falsches Passwort! Bitte versuchen Sie es erneut.
                  </p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-purple-800 hover:bg-purple-900 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-purple-500/10 active:scale-[0.98]"
              >
                Bereich freischalten
              </button>
            </form>

            <button 
              onClick={() => navigateTo('/')}
              className="mt-8 text-slate-400 hover:text-purple-800 text-sm font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Zurück zur Startseite</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-100 min-h-screen font-sans">
      {/* Non-printable Header Nav */}
      <div className="max-w-7xl mx-auto px-6 mb-8 print:hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-[2rem] border border-slate-200/80 shadow-sm">
          <div>
            <button 
              onClick={() => navigateTo('/')} 
              className="inline-flex items-center gap-2 text-purple-800 hover:text-purple-950 font-bold mb-2 group transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Zurück zur Startseite</span>
            </button>
            <h1 className="text-2xl font-serif font-bold text-slate-900 flex items-center gap-2.5">
              <FileText className="w-6 h-6 text-purple-800" />
              Rechnungs-Generator
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">
              Erstellen Sie professionelle Rechnungen für die <span className="font-semibold text-slate-800">DOE Kreativ GmbH</span>.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="text-left bg-purple-50 p-3 rounded-xl border border-purple-100 max-w-xs">
              <div className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>PDF Speichern Anleitung:</span>
              </div>
              <p className="text-[10px] text-purple-700 leading-tight mt-0.5 font-medium">
                Klicken Sie auf den Button. Wählen Sie im Druckmenü als Ziel <b>"Als PDF speichern"</b> aus.
              </p>
            </div>
            
            <button 
              onClick={handlePrint}
              className="px-6 py-3.5 bg-purple-800 hover:bg-purple-900 text-white font-bold rounded-xl shadow-md hover:shadow-purple-500/10 flex items-center justify-center gap-2 transition-all transform active:scale-95 text-sm shrink-0"
            >
              <Printer className="w-4.5 h-4.5" />
              <span>Drucken / Als PDF speichern</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANE: Form controls (HIDDEN ON PRINT) */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-[2rem] shadow-md border border-slate-200/60 space-y-6 print:hidden">
          
          <div className="border-b border-slate-100 pb-2">
            <h2 className="text-lg font-bold text-slate-900">Rechnungs-Editor</h2>
            <p className="text-slate-400 text-xs mt-0.5">Füllen Sie die folgenden Abschnitte aus, um die Rechnung anzupassen.</p>
          </div>

          {/* Section 1: Meta-Daten */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-purple-800" />
              Rechnungsdetails
            </h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Rechnungsnummer</label>
                <input 
                  type="text" 
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Zahlungsziel</label>
                <select 
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(Number(e.target.value) as 7 | 14)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                >
                  <option value={7}>7 Tage Frist</option>
                  <option value={14}>14 Tage Frist</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Rechnungsdatum</label>
                <input 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">Leistungszeitraum</label>
                <input 
                  type="text" 
                  value={servicePeriod}
                  onChange={(e) => setServicePeriod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                  placeholder="z. B. Juni 2026"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Empfänger (Kunde) */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-800" />
                Rechnungsempfänger
              </h3>
            </div>

            {/* Quick-Select Dropdown */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-purple-800 uppercase tracking-wide">Empfänger auswählen</label>
              <select
                value={selectedRecipientId}
                onChange={(e) => handleRecipientPresetChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-purple-50 border border-purple-150 text-purple-950 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-bold cursor-pointer"
              >
                {PRESET_RECIPIENTS.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.id === 'custom' ? '✍️ Eigener Empfänger (Manuell eingeben)' : `🏢 ${preset.name}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-slate-200/50 pt-3 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500">Firmenname / Name</label>
                <input 
                  type="text" 
                  value={recipientName}
                  onChange={(e) => {
                    setRecipientName(e.target.value);
                    if (selectedRecipientId !== 'custom') setSelectedRecipientId('custom');
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                  placeholder="Firmenname"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-slate-500">Straße & Nr.</label>
                  <input 
                    type="text" 
                    value={recipientStreet}
                    onChange={(e) => {
                      setRecipientStreet(e.target.value);
                      if (selectedRecipientId !== 'custom') setSelectedRecipientId('custom');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                    placeholder="Straße 12"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-500">PLZ & Ort</label>
                  <input 
                    type="text" 
                    value={recipientCity}
                    onChange={(e) => {
                      setRecipientCity(e.target.value);
                      if (selectedRecipientId !== 'custom') setSelectedRecipientId('custom');
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                    placeholder="10117 Berlin"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500">Zusatz / Ansprechpartner</label>
                <input 
                  type="text" 
                  value={recipientContact}
                  onChange={(e) => {
                    setRecipientContact(e.target.value);
                    if (selectedRecipientId !== 'custom') setSelectedRecipientId('custom');
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                  placeholder="z. B. Geschäftsführung"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Beschreibung */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
            <h3 className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-800" />
              Zusatztext / Einleitung
            </h3>
            <textarea 
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs resize-none font-medium leading-relaxed"
              placeholder="Zusatztext für die Rechnung..."
            />
          </div>

          {/* Section 4: Rechnungsposten */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-purple-950 uppercase tracking-wider flex items-center gap-1.5">
                <Euro className="w-3.5 h-3.5 text-purple-800" />
                Rechnungsposten
              </h3>
              <button 
                onClick={handleAddItem}
                className="px-2.5 py-1 bg-purple-800 hover:bg-purple-950 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3 h-3" /> Posten hinzufügen
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
              {items.map((item, index) => (
                <div key={item.id} className="p-3 bg-white rounded-xl border border-slate-200/60 space-y-2 relative group">
                  <button 
                    onClick={() => handleDeleteItem(item.id)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Posten löschen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="font-bold text-[10px] text-purple-800">Posten #{index + 1}</div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Dienstleistung / Beschreibung</label>
                    <input 
                      type="text" 
                      value={item.description}
                      onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">Menge / Anzahl</label>
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                        min="0.01"
                        step="any"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500">Betrag (€)</label>
                      <input 
                        type="number" 
                        value={item.unitPrice}
                        onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none text-xs font-semibold"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200/50 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500">Umsatzsteuersatz</span>
              <span className="px-2 py-1 rounded bg-purple-50 text-purple-800 font-bold border border-purple-100 text-[11px]">
                19% USt (Festgelegt)
              </span>
            </div>
          </div>

          <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50 text-[11px] text-slate-500 leading-relaxed space-y-1">
            <span className="font-bold text-purple-900 block">Absender-Daten (Festgelegt)</span>
            <span>Der Absender ist auf <b>DOE Kreativ GmbH</b> (Kantstraße 65, Berlin) eingestellt, mit Steuernummer und IBAN. Änderungen können im Live-Layout direkt rechts überprüft werden.</span>
          </div>

        </div>

        {/* RIGHT PANE: Printable DIN A4 Live Preview */}
        <div className="lg:col-span-7 bg-white shadow-xl border border-slate-200 overflow-hidden flex flex-col mx-auto w-full max-w-[800px] aspect-[1/1.414] rounded-2xl print:shadow-none print:border-none print:rounded-none print:max-w-none print:w-full print:m-0 print:p-0">
          
          {/* Printable Invoice Sheet */}
          <div className="flex-1 p-10 md:p-14 text-slate-900 flex flex-col justify-between font-serif text-[13px] leading-relaxed relative bg-white print:p-0 print:text-black">
            
            {/* Header: Sender Address Line (DIN-conform window link) & Corporate Brand */}
            <div>
              <div className="flex justify-between items-start border-b border-slate-100 pb-8 print:pb-6">
                <div>
                  {/* Sender Small Address (DIN window) */}
                  <div className="text-[9px] underline text-slate-400 font-sans tracking-wide mb-3">
                    {senderName} • {senderStreet} • {senderCity}
                  </div>
                  
                  {/* Recipient Block */}
                  <div className="font-sans text-[13px] space-y-1 mt-4 text-slate-800">
                    <div className="font-bold">{recipientName}</div>
                    {recipientContact && <div>{recipientContact}</div>}
                    <div>{recipientStreet}</div>
                    <div>{recipientCity}</div>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <div className="font-sans flex items-center gap-1.5 text-purple-900 font-bold text-lg mb-1 tracking-tight">
                    <span className="font-serif italic text-purple-700">my</span>cleaningqueens
                  </div>
                  <div className="text-[10px] font-sans text-slate-400 space-y-0.5 text-right mt-3">
                    <div>{senderName}</div>
                    <div>{senderStreet}, {senderCity}</div>
                    <div>Tel: {senderPhone}</div>
                    <div>{senderEmail}</div>
                  </div>
                </div>
              </div>

              {/* Invoice Meta-Details Block */}
              <div className="mt-12 flex justify-between items-end font-sans">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-slate-950">RECHNUNG</h2>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-right text-[11px] text-slate-600">
                  <div className="font-bold text-slate-800">Rechnungsnummer:</div>
                  <div className="font-semibold text-slate-900">{invoiceNumber}</div>
                  <div className="font-bold text-slate-800">Rechnungsdatum:</div>
                  <div>{formatDateGerman(invoiceDate)}</div>
                  <div className="font-bold text-slate-800">Leistungszeitraum:</div>
                  <div>{servicePeriod}</div>
                  <div className="font-bold text-slate-800">Fälligkeitsdatum:</div>
                  <div className="font-bold text-purple-800">{formatDateGerman(dueDate)}</div>
                </div>
              </div>

              {/* Optional Custom Description */}
              {customDescription && (
                <div className="mt-8 p-4 bg-slate-50/50 rounded-xl border border-slate-100 font-sans text-[12px] text-slate-600 leading-relaxed print:bg-transparent print:border-none print:p-0 print:mt-6">
                  {customDescription}
                </div>
              )}

              {/* Items Table */}
              <table className="w-full mt-10 font-sans text-[12px] text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-slate-800 font-bold uppercase tracking-wider text-[10px] bg-slate-50/30">
                    <th className="py-2.5 px-2 w-10 text-center">Pos.</th>
                    <th className="py-2.5 px-2">Beschreibung der Leistung</th>
                    <th className="py-2.5 px-2 text-center w-20">Menge</th>
                    <th className="py-2.5 px-2 text-right w-24">Einzelpreis</th>
                    <th className="py-2.5 px-2 text-right w-28">Gesamt (Netto)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => (
                    <tr key={item.id} className="hover:bg-slate-50/30">
                      <td className="py-3 px-2 text-center text-slate-400">{index + 1}</td>
                      <td className="py-3 px-2 text-slate-900 font-semibold">{item.description}</td>
                      <td className="py-3 px-2 text-center text-slate-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 px-2 text-right text-slate-600">
                        {item.unitPrice.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                      </td>
                      <td className="py-3 px-2 text-right font-semibold text-slate-900">
                        {(item.quantity * item.unitPrice).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Calculation Area */}
              <div className="mt-8 flex justify-end font-sans">
                <div className="w-64 space-y-2 text-[12px] text-slate-600 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Zwischensumme (Netto):</span>
                    <span className="font-semibold text-slate-900">
                      {subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </span>
                  </div>
                  {taxRate > 0 ? (
                    <div className="flex justify-between">
                      <span>zzgl. {taxRate}% Umsatzsteuer:</span>
                      <span className="font-semibold text-slate-900">
                        {taxAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                      </span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-[11px] text-slate-400 italic">
                      <span>Umsatzsteuerbefreit</span>
                      <span>0,00 €</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t-2 border-slate-900 pt-3 text-[14px] font-bold text-slate-950">
                    <span>Gesamtbetrag (Brutto):</span>
                    <span className="text-purple-900 print:text-black">
                      {grandTotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Footer Details (Fixed at bottom on print) */}
            <div className="border-t border-slate-100 pt-8 mt-12 font-sans text-[10px] text-slate-400 space-y-4 print:mt-16">
              
              <div className="text-center font-semibold text-slate-600 text-[11px] mb-3">
                Bitte überweisen Sie den Rechnungsbetrag innerhalb von <span className="text-purple-800 font-bold">{paymentTerms} Tagen</span> bis zum <span className="text-purple-800 font-bold">{formatDateGerman(dueDate)}</span> unter Angabe der Rechnungsnummer <span className="text-purple-800 font-bold">{invoiceNumber}</span> auf das unten stehende Bankkonto.
              </div>

              <div className="grid grid-cols-3 gap-4 text-center border-t border-slate-50 pt-4">
                <div>
                  <div className="font-bold uppercase tracking-wider text-[8px] text-slate-500">Firmensitz & Register</div>
                  <div className="mt-1 text-slate-500">
                    {senderName}<br />
                    Amtsgericht Charlottenburg<br />
                    HRB: {senderUstId}
                  </div>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wider text-[8px] text-slate-500">Steuerangaben</div>
                  <div className="mt-1 text-slate-500">
                    Steuernummer: {senderTaxId}<br />
                    Geschäftsführer: DOE Kreativ GmbH
                  </div>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wider text-[8px] text-purple-900 font-semibold">Bankverbindung (IBAN)</div>
                  <div className="mt-1 font-semibold text-slate-700 bg-purple-50/50 py-1 rounded-lg print:bg-transparent print:p-0">
                    {senderBankName}<br />
                    IBAN: <span className="font-mono text-[11px] text-purple-950 font-bold break-all print:text-black">{senderIban}</span><br />
                    BIC: <span className="font-mono text-[10px]">{senderBic}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Global CSS Inject strictly for seamless print styles */}
      <style>{`
        @media print {
          body, html {
            background: #fff !important;
            color: #000 !important;
          }
          nav, footer, .print\\:hidden, [role="button"], button {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:border-none {
            border: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:max-w-none {
            max-width: none !important;
          }
          .print\\:w-full {
            width: 100% !important;
          }
          .print\\:m-0 {
            margin: 0 !important;
          }
          .print\\:p-0 {
            padding: 0 !important;
          }
          /* Ensure PDF fits single page cleanly */
          @page {
            size: A4;
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
};
