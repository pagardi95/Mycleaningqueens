
import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Sparkles, 
  Building2, 
  Dumbbell, 
  CheckCircle2, 
  ChevronRight, 
  Mail, 
  MapPin,
  Menu,
  X,
  ArrowRight,
  Stethoscope,
  Info,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { QuoteFormData } from './types';

// Legal Content Constants - More detailed for German law compliance
const LEGAL_CONTENT = {
  impressum: {
    title: "Impressum",
    body: (
      <div className="space-y-6 text-slate-600">
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h4>
          <p>DOE Kreativ GmbH<br />Kantstraße 65<br />10627 Berlin</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Vertreten durch</h4>
          <p>Geschäftsführung: Oleg Lazo</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Kontakt</h4>
          <p>E-Mail: info@mycleaningqueens.de</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Registereintrag</h4>
          <p>Eintragung im Handelsregister.<br />Registergericht: Amtsgericht Charlottenburg (Berlin)<br />Registernummer: [Eintragen]</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Umsatzsteuer-ID</h4>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />[Eintragen]</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-2">Redaktionell verantwortlich</h4>
          <p>DOE Kreativ GmbH<br />Kantstraße 65<br />10627 Berlin</p>
        </div>
        <div className="text-xs pt-4 border-t">
          <p>Plattform der EU-Kommission zur Online-Streitbeilegung: <a href="https://ec.europa.eu/consumers/odr" className="text-purple-600 underline">https://ec.europa.eu/consumers/odr</a>. Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle nicht verpflichtet und nicht bereit.</p>
        </div>
      </div>
    )
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    body: (
      <div className="space-y-6 text-slate-600 text-sm">
        <section>
          <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">1. Datenschutz auf einen Blick</h4>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
        </section>
        
        <section>
          <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">2. Verantwortliche Stelle</h4>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br />DOE Kreativ GmbH<br />Kantstraße 65<br />10627 Berlin<br />E-Mail: info@mycleaningqueens.de</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">3. Datenerfassung auf unserer Website</h4>
          <p><strong>Kontaktformular:</strong> Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">4. Ihre Rechte</h4>
          <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.</p>
        </section>

        <section>
          <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest">5. SSL- bzw. TLS-Verschlüsselung</h4>
          <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt.</p>
        </section>
      </div>
    )
  },
  agb: {
    title: "Allgemeine Geschäftsbedingungen",
    body: (
      <div className="space-y-6 text-slate-600 text-sm">
        <p><strong>§1 Geltungsbereich</strong><br />Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Reinigungs- und Dienstleistungen zwischen der DOE Kreativ GmbH (nachfolgend „mycleaningqueens“) und ihren gewerblichen Kunden.</p>
        
        <p><strong>§2 Vertragsgegenstand</strong><br />Der konkrete Leistungsumfang wird im jeweiligen Einzelangebot bzw. Leistungsverzeichnis festgelegt. mycleaningqueens verpflichtet sich zur fach- und sachgerechten Durchführung der vereinbarten Leistungen.</p>
        
        <p><strong>§3 Ausführung durch Dritte</strong><br />mycleaningqueens ist berechtigt, zur Erfüllung der vertraglichen Verpflichtungen qualifizierte Subunternehmer einzusetzen.</p>
        
        <p><strong>§4 Vergütung und Zahlungsbedingungen</strong><br />Die Vergütung richtet sich nach den im Angebot festgelegten Preisen. Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zur Zahlung fällig.</p>
        
        <p><strong>§5 Haftung</strong><br />Für Schäden, die nachweislich durch Mitarbeiter oder Erfüllungsgehilfen von mycleaningqueens verursacht wurden, haftet mycleaningqueens im Rahmen der bestehenden Betriebshaftpflichtversicherung.</p>
        
        <p><strong>§6 Gerichtsstand</strong><br />Gerichtsstand für alle Streitigkeiten aus diesem Vertragsverhältnis ist Berlin.</p>
      </div>
    )
  }
};

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-2xl font-serif font-bold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X className="w-6 h-6 text-slate-500" />
          </button>
        </div>
        <div className="p-8 overflow-y-auto leading-relaxed custom-scrollbar">
          {children}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 text-right">
          <button onClick={onClose} className="px-10 py-3 bg-purple-800 text-white rounded-full font-bold hover:bg-purple-900 transition-all shadow-lg hover:shadow-purple-500/20">
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Crown className={`w-8 h-8 ${scrolled ? 'text-purple-800' : 'text-white'}`} />
          <span className={`text-2xl font-serif font-bold tracking-tight ${scrolled ? 'text-purple-900' : 'text-white'}`}>
            mycleaningqueens
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          <button onClick={() => scrollToSection('services')} className={`hover:text-purple-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>Leistungen</button>
          <button onClick={() => scrollToSection('about')} className={`hover:text-purple-500 transition-colors ${scrolled ? 'text-slate-600' : 'text-slate-200'}`}>Über uns</button>
          <button onClick={() => scrollToSection('contact')} className="bg-purple-800 text-white px-6 py-2 rounded-full font-medium hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-500/20">
            Angebot anfordern
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className={scrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={scrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 animate-in slide-in-from-top">
          <button onClick={() => scrollToSection('services')} className="text-left text-lg font-medium text-slate-800">Leistungen</button>
          <button onClick={() => scrollToSection('about')} className="text-left text-lg font-medium text-slate-800">Über uns</button>
          <button onClick={() => scrollToSection('contact')} className="bg-purple-800 text-white py-3 rounded-xl text-center font-bold">Jetzt anfragen</button>
        </div>
      )}
    </nav>
  );
};

const Hero: React.FC = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
        alt="Premium Office Cleaning" 
        className="w-full h-full object-cover brightness-[0.4]"
      />
    </div>
    <div className="relative z-10 text-center px-6 max-w-5xl">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white border border-white/20 mb-8 animate-fade-in">
        <Sparkles className="w-5 h-5 text-purple-300" />
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">Exzellenz in jedem Detail</span>
      </div>
      <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
        Für Büros & Fitnessstudios mit <span className="italic text-purple-300">Anspruch</span>.
      </h1>
      <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
        <strong>mycleaningqueens</strong> ist Ihr Partner für exzellente Gebäudereinigung in Berlin. Wir sorgen für den Glanz, den Ihre Marke verdient.
      </p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-900 px-12 py-5 rounded-full text-lg font-bold transition-all shadow-xl hover:bg-purple-50 flex items-center justify-center gap-2">
          Angebot einholen <ArrowRight className="w-5 h-5" />
        </button>
        <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-12 py-5 rounded-full text-lg font-semibold transition-all">
          Unsere Leistungen
        </button>
      </div>
    </div>
  </section>
);

const ServiceCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-3 transition-all duration-500 group">
    <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-800 mb-8 group-hover:bg-purple-800 group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
      {icon}
    </div>
    <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-lg">{description}</p>
  </div>
);

export default function App() {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    company: '',
    buildingType: 'Bürogebäude',
    area: 500,
    frequency: 'Täglich',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Modal states - storing the whole object to show content
  const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Robust URL construction
      const getBaseUrl = () => {
        try {
          // Try to get origin, fallback to constructing it from href
          if (window.location.origin && window.location.origin !== 'null') {
            return window.location.origin;
          }
          const url = new URL(window.location.href);
          return `${url.protocol}//${url.host}`;
        } catch (e) {
          return ''; // Fallback to relative
        }
      };

      const baseUrl = getBaseUrl();
      const apiUrl = baseUrl ? `${baseUrl}/api/quote` : '/api/quote';
      const healthUrl = baseUrl ? `${baseUrl}/api/health` : '/api/health';

      console.log("Target API URL:", apiUrl);

      // First, check if server is alive
      console.log("Checking server health at:", healthUrl);
      const healthCheck = await fetch(healthUrl).catch((err) => {
        console.warn("Health check fetch failed:", err);
        return null;
      });
      
      if (healthCheck && healthCheck.ok) {
        const healthData = await healthCheck.json();
        console.log("Server health:", healthData);
      }

      console.log("Sending request to:", apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);

      if (result.success) {
        setSubmitted(true);
      } else {
        const errorMsg = typeof result.error === 'object' 
          ? JSON.stringify(result.error) 
          : (result.error || "Unbekannter Fehler");
        alert(`Fehler: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Submission error details:", error);
      const errorMsg = error instanceof Error ? error.message : "Verbindung zum Server fehlgeschlagen";
      alert(`Netzwerkfehler: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen selection:bg-purple-200">
      <Navbar />
      
      {/* Modal is now correctly accessing .body */}
      <Modal 
        isOpen={modalContent !== null} 
        onClose={() => setModalContent(null)} 
        title={modalContent?.title || ""}
      >
        {modalContent?.body}
      </Modal>

      <main>
        <Hero />
        
        <div className="bg-purple-900 py-12 overflow-hidden whitespace-nowrap border-y border-purple-800">
          <div className="inline-block animate-marquee">
            {[
              "mycleaningqueens – Der Name für Reinheit",
              "Sauberkeit, die Eindruck hinterlässt",
              "Ihre Räume in royale Hände",
              "Fitness-Hygiene auf höchstem Niveau",
              "Glanz für Ihre Business-Welt"
            ].map((slogan, i) => (
              <span key={i} className="text-purple-100 text-xl md:text-3xl font-serif italic mx-16 opacity-80">
                {slogan} <span className="ml-16 opacity-30">★</span>
              </span>
            ))}
          </div>
          <div className="inline-block animate-marquee">
            {[
              "mycleaningqueens – Der Name für Reinheit",
              "Sauberkeit, die Eindruck hinterlässt",
              "Ihre Räume in royale Hände",
              "Fitness-Hygiene auf höchstem Niveau",
              "Glanz für Ihre Business-Welt"
            ].map((slogan, i) => (
              <span key={i} className="text-purple-100 text-xl md:text-3xl font-serif italic mx-16 opacity-80">
                {slogan} <span className="ml-16 opacity-30">★</span>
              </span>
            ))}
          </div>
        </div>

        <section className="py-24 bg-white border-b border-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-slate-400 font-bold uppercase tracking-[0.3em] text-xs mb-16">
              Royale Sauberkeit im Einsatz bei
            </p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
              <a href="https://www.holmesplace.de" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group transition-all duration-500">
                <img 
                  src="https://almazois.gr/wp-content/uploads/2019/11/almazois-pita-2020-dorothetes-holmes-place-logo.png" 
                  alt="Holmes Place" 
                  className="h-12 md:h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] group-hover:text-purple-800 transition-colors">Premium Fitness</span>
              </a>
              <a href="https://www.wearethestorm.de" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-6 group transition-all duration-500">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKCFfA2UZlE14Kvo31b5zu0y4TQ4xUSPId7Q&s" 
                  alt="The Storm" 
                  className="h-12 md:h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] group-hover:text-purple-800 transition-colors">Boutique Fitness</span>
              </a>
              <div className="flex flex-col items-center gap-6 group transition-all duration-500">
                <div className="h-12 md:h-20 flex items-center justify-center gap-3 text-slate-800">
                  <Stethoscope className="w-10 h-10 md:w-14 md:h-14 text-purple-800" />
                  <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">PraxisZentrum</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Medizinische Hygiene</span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">Königlicher Service für Ihre Räume.</h2>
              <p className="text-xl text-slate-600 leading-relaxed italic">
                "Wir behandeln Ihr Objekt, als wäre es unser eigener Palast."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <ServiceCard 
                icon={<Building2 className="w-8 h-8" />}
                title="Premium Büroreinigung"
                description="Repräsentative Sauberkeit für Kanzleien, Headquarter und Coworking Spaces. Diskretion und Gründlichkeit sind unser Standard."
              />
              <ServiceCard 
                icon={<Dumbbell className="w-8 h-8" />}
                title="Fitness & Studio Hygiene"
                description="Spezialisierte Desinfektion von Trainingsgeräten und Wellnessbereichen. Wir garantieren Hygiene, die Mitglieder fühlen können."
              />
              <ServiceCard 
                icon={<Stethoscope className="w-8 h-8" />}
                title="Praxis & Kanzleien"
                description="Höchste Anforderungen an Hygiene und Ästhetik. Wir sorgen für ein steriles Umfeld mit einem glänzenden ersten Eindruck."
              />
            </div>
          </div>
        </section>

        <section id="about" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="bg-purple-50 p-16 md:p-24 rounded-[4rem] border border-purple-100 shadow-inner flex flex-col items-center text-center gap-10">
                  <p className="text-3xl md:text-4xl font-serif italic text-purple-900 leading-relaxed">
                    Wahre Qualität zeigt sich dort, wo man sie nicht sieht, aber spürt.
                  </p>
                  <div className="flex flex-col items-center gap-6">
                    <Crown className="w-16 h-16 text-purple-800" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em]">
                      Das Versprechen der Queens
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <span className="text-purple-800 font-bold uppercase tracking-[0.3em] text-sm block mb-4">Über uns</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">Reinigung ist für uns Handwerkskunst.</h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                  Wir bei **mycleaningqueens** haben uns bewusst auf den Premium-Sektor spezialisiert. Wir verstehen, dass moderne Business-Welten und Fitness-Clubs mehr brauchen als nur eine "Standard-Wischpflege".
                </p>
                <div className="space-y-6">
                  {[
                    "Persönliche Objektbetreuung",
                    "Ausschließlich zertifiziertes Fachpersonal",
                    "Modernste ökologische Reinigungsmethoden",
                    "Transparente digitale Checklisten"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-slate-800 text-lg font-medium">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5 text-purple-800" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="mt-12 bg-purple-800 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-900 transition-all flex items-center gap-2">
                  Lernen Sie uns kennen <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">
              <div className="lg:w-2/5">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-10 leading-tight">
                  Starten Sie <span className="text-purple-800">jetzt</span>.
                </h2>
                <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                  Überlassen Sie die Sauberkeit den Profis. Fordern Sie Ihr unverbindliches Angebot an – wir melden uns innerhalb von 24h.
                </p>
                
                <div className="space-y-8 mb-12">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-800 flex-shrink-0 shadow-sm">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Direkt per Mail</p>
                      <p className="text-slate-600">info@mycleaningqueens.de</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-purple-800 flex-shrink-0 shadow-sm">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Zentrale Berlin</p>
                      <p className="text-slate-600">Kantstraße 65, 10627 Berlin</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-3/5">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-[3rem] shadow-xl border border-slate-100">
                    <h3 className="text-3xl font-serif font-bold mb-10">Angebot anfragen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Ansprechpartner</label>
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          placeholder="Vor- & Nachname"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">E-Mail Adresse</label>
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          placeholder="ihre@firma.de"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Firma / Institution</label>
                        <input 
                          type="text" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          placeholder="Unternehmensname"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Objekttyp</label>
                        <select 
                          name="buildingType"
                          value={formData.buildingType}
                          onChange={handleInputChange}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
                        >
                          <option>Bürogebäude</option>
                          <option>Fitness Studio</option>
                          <option>Arztpraxis / Klinik</option>
                          <option>Kanzlei</option>
                          <option>Sonstiges</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-10 space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1">Zusätzliche Infos (Optional)</label>
                      <textarea 
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                        placeholder="Z.B. m², Reinigungsintervalle oder Sonderwünsche"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-5 bg-purple-800 hover:bg-purple-900 text-white font-bold text-xl rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                    >
                      {loading ? 'Wird übermittelt...' : 'Jetzt Angebot einholen'}
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-6 italic">
                      Ihre Anfrage wird direkt an info@mycleaningqueens.de weitergeleitet.
                    </p>
                  </form>
                ) : (
                  <div className="bg-purple-800 text-white p-20 rounded-[4rem] text-center shadow-2xl animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/20">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-4xl font-serif font-bold mb-6">Danke!</h3>
                    <p className="text-purple-100 text-xl mb-12 leading-relaxed">
                      Wir haben Ihre Anfrage erhalten. Ein Team-Mitglied von **mycleaningqueens** wird sich in Kürze mit Ihrem individuellen Angebot bei Ihnen melden.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-white border-b border-white/40 hover:border-white transition-all font-bold"
                    >
                      Eine weitere Nachricht senden
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div>
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <Crown className="w-10 h-10 text-purple-500" />
                <span className="text-4xl font-serif font-bold">mycleaningqueens</span>
              </div>
              <p className="text-slate-500 max-w-sm">
                Die moderne Premium-Lösung für anspruchsvolle Gebäudereinigung in Berlin.
              </p>
            </div>
            <div className="flex gap-12 text-slate-400">
              <button onClick={() => setModalContent(LEGAL_CONTENT.impressum)} className="hover:text-white transition-all flex items-center gap-2">
                <FileText className="w-4 h-4" /> Impressum
              </button>
              <button onClick={() => setModalContent(LEGAL_CONTENT.datenschutz)} className="hover:text-white transition-all flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Datenschutz
              </button>
              <button onClick={() => setModalContent(LEGAL_CONTENT.agb)} className="hover:text-white transition-all flex items-center gap-2">
                <FileText className="w-4 h-4" /> AGB
              </button>
            </div>
          </div>
          <div className="border-t border-slate-900 mt-16 pt-10 text-center text-slate-600 text-sm">
            <p>© {new Date().getFullYear()} DOE Kreativ GmbH. mycleaningqueens® is a registered trademark.</p>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8b5cf6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }
      `}</style>
    </div>
  );
}
