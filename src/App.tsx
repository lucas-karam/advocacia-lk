/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import About from './components/About';
import Media from './components/Media';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import CookieBanner from './components/CookieBanner';
import EngagementTracker from './components/EngagementTracker';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30">
      <a href="#conteudo-principal" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[99999] bg-blue-600 text-white px-4 py-2 rounded-md font-bold shadow-lg">
        Pular para o conteúdo principal
      </a>
      <EngagementTracker />
      <Header />
      <main id="conteudo-principal">
        <Hero />
        <Services />
        <Process />
        <About />
        <Media />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppWidget />
      <CookieBanner />
    </div>
  );
}
