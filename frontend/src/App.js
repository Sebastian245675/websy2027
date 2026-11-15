import React, { Suspense, lazy, memo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { LanguageProvider } from "./LanguageContext";
import { ScrollToTopOnRouteChange } from "./components/ScrollToTopOnRouteChange";
import { SEOHead } from "./components/SEOHead";
import { SkipLinks } from "./components/Accessibility";
import { LoadingProvider, ErrorBoundary, ToastProvider } from "./components/UXEnhancements";
import { installWhatsAppLinkTracking } from "./lib/tracking";

// Critical path - HomePage loads eagerly for fast FCP/LCP
import { HomePage } from "./pages/HomePage";
import { Navigation } from "./components/Navigation"; // Eagerly load Navigation to fix CLS/LCP

// Lazy load Footer (non-blocking)

const Footer = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Starting to load Footer...');
  return import("./components/Footer").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] Footer loaded in', Math.round(end - start), 'ms');
    return { default: module.Footer };
  });
});

const ScrollToTop = lazy(() => {
  const start = performance.now();
  return import("./components/ScrollToTop").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] ScrollToTop loaded in', Math.round(end - start), 'ms');
    return { default: module.ScrollToTop };
  });
});

// Lazy load pages - these are not needed for initial render
const ContactPage = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading ContactPage...');
  return import("./pages/ContactPage").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] ContactPage loaded in', Math.round(end - start), 'ms');
    return { default: module.ContactPage };
  });
});

const ServicesPage = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading ServicesPage...');
  return import("./pages/ServicesPage").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] ServicesPage loaded in', Math.round(end - start), 'ms');
    return { default: module.ServicesPage };
  });
});

const PlansPage = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading PlansPage...');
  return import("./pages/PlansPage").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] PlansPage loaded in', Math.round(end - start), 'ms');
    return { default: module.PlansPage };
  });
});

const PlanDetailPage = lazy(() =>
  import("./pages/PlanDetailPage").then(module => ({ default: module.PlanDetailPage }))
);

const LeadsPanel = lazy(() =>
  import("./pages/LeadsPanel").then(module => ({ default: module.LeadsPanel }))
);

const SuccessStoriesPage = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading SuccessStoriesPage...');
  return import("./pages/SuccessStoriesPage").then(module => {
    console.log('✅ [LAZY] SuccessStoriesPage loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.SuccessStoriesPage };
  });
});

const CaseStudyPage = lazy(() =>
  import("./pages/CaseStudyPage").then(module => ({ default: module.CaseStudyPage }))
);

const ServiceDetailPage = lazy(() => {
  return import("./pages/ServiceDetailPage").then(module => {
    return { default: module.ServiceDetailPage };
  });
});

const BlogPage = lazy(() => {
  return import("./pages/BlogPage").then(module => {
    return { default: module.BlogPage };
  });
});

const BlogPostPage = lazy(() => {
  return import("./pages/BlogPostPage").then(module => {
    return { default: module.BlogPostPage };
  });
});

const PrivacyPolicyPage = lazy(() =>
  import("./pages/PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage }))
);

const AuthorPage = lazy(() =>
  import("./pages/AuthorPage").then(module => ({ default: module.AuthorPage }))
);

const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then(module => ({ default: module.NotFoundPage }))
);

const SaltaPage = lazy(() =>
  import("./pages/SaltaPage").then(module => ({ default: module.SaltaPage }))
);

const QuotePage = lazy(() =>
  import("./pages/QuotePage").then(module => ({ default: module.QuotePage }))
);

const AuditPage = lazy(() =>
  import("./pages/AuditPage").then(module => ({ default: module.AuditPage }))
);

const AboutPage = lazy(() =>
  import("./pages/AboutPage").then(module => ({ default: module.AboutPage }))
);

const CountryPage = lazy(() =>
  import("./pages/CountryPage").then(module => ({ default: module.CountryPage }))
);

const SeoCountryPage = lazy(() =>
  import("./pages/SeoCountryPage").then(module => ({ default: module.SeoCountryPage }))
);

const AutomationCountryPage = lazy(() =>
  import("./pages/AutomationCountryPage").then(module => ({ default: module.AutomationCountryPage }))
);

const CityWebPage = lazy(() =>
  import("./pages/CityWebPage").then(module => ({ default: module.CityWebPage }))
);

const NicheLandingPage = lazy(() =>
  import("./pages/NicheLandingPage").then(module => ({ default: module.NicheLandingPage }))
);

// Paid-ads landing pages (/lp/...) render without the site menu and footer
const SiteChrome = ({ children }) => {
  const { pathname } = useLocation();
  // Landings de anuncios (/lp/...) y el panel de consultas (/panel) van sin menú ni pie
  return pathname.startsWith('/lp/') || pathname === '/panel' ? null : children;
};

// El botón flotante de WhatsApp sí va en las landings, pero no en el panel
const NotOnPanel = ({ children }) => {
  const { pathname } = useLocation();
  return pathname === '/panel' ? null : children;
};

// Lazy load non-critical components
const WhatsAppButton = lazy(() => {
  const start = performance.now();
  return import("./components/WhatsAppButton").then(module => {
    console.log('✅ [LAZY] WhatsAppButton loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.WhatsAppButton };
  });
});

function App() {
  const appStart = performance.now();
  console.log('⚙️ [APP] App component rendering');


  useEffect(() => installWhatsAppLinkTracking(), []);

  useEffect(() => {
    const appEnd = performance.now();
    console.log('✅ [APP] App mounted in', Math.round(appEnd - appStart), 'ms');
  }, []);

  // Analytics deshabilitado temporalmente para optimizar performance
  // Se recomienda mover analytics al servidor (backend) para evitar impacto en LCP/TBT

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <LoadingProvider>
          <ToastProvider>
            <Router>
              <ScrollToTopOnRouteChange />
              <div className="App" id="main-content">
                {/* Each page sets its own <SEOHead>; a global one here would overwrite the home title with just "Websy" */}

                <SkipLinks />

                <SiteChrome>
                  <Navigation />
                </SiteChrome>

                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/contacto" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <ContactPage />
                      </Suspense>
                    } />
                    <Route path="/servicios" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <ServicesPage />
                      </Suspense>
                    } />
                    <Route path="/planes" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <PlansPage />
                      </Suspense>
                    } />
                    <Route path="/planes/:planId" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <PlanDetailPage />
                      </Suspense>
                    } />
                    <Route path="/panel" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                        <SEOHead title="Panel de consultas | Websy" noindex />
                        <LeadsPanel />
                      </Suspense>
                    } />
                    <Route path="/panel-cotizaciones" element={<Navigate to="/panel" replace />} />
                    <Route path="/casos-de-exito" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SuccessStoriesPage />
                      </Suspense>
                    } />
                    <Route path="/casos-de-exito/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CaseStudyPage />
                      </Suspense>
                    } />
                    <Route path="/servicios/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <ServiceDetailPage />
                      </Suspense>
                    } />
                    <Route path="/blog" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <BlogPage />
                      </Suspense>
                    } />
                    <Route path="/diseno-web-salta" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SaltaPage />
                      </Suspense>
                    } />
                    <Route path="/cotizador" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <QuotePage />
                      </Suspense>
                    } />
                    <Route path="/auditoria-gratis" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <AuditPage />
                      </Suspense>
                    } />
                    <Route path="/quienes-somos" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <AboutPage />
                      </Suspense>
                    } />
                    {/* Versiones por país (src/countryPages.js), enlazadas con la home por hreflang */}
                    <Route path="/argentina" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CountryPage code="AR" />
                      </Suspense>
                    } />
                    <Route path="/colombia" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CountryPage code="CO" />
                      </Suspense>
                    } />
                    <Route path="/mexico" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CountryPage code="MX" />
                      </Suspense>
                    } />
                    <Route path="/argentina/seo" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SeoCountryPage code="AR" />
                      </Suspense>
                    } />
                    <Route path="/colombia/seo" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SeoCountryPage code="CO" />
                      </Suspense>
                    } />
                    <Route path="/mexico/seo" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SeoCountryPage code="MX" />
                      </Suspense>
                    } />
                    <Route path="/colombia/automatizacion-procesos" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <AutomationCountryPage code="CO" />
                      </Suspense>
                    } />
                    <Route path="/colombia/desarrollo-web-bogota" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="bogota" />
                      </Suspense>
                    } />
                    <Route path="/colombia/desarrollo-web-cali" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="cali" />
                      </Suspense>
                    } />
                    <Route path="/mexico/diseno-web-cdmx" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="cdmx" />
                      </Suspense>
                    } />
                    <Route path="/colombia/desarrollo-web-medellin" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="medellin" />
                      </Suspense>
                    } />
                    <Route path="/colombia/desarrollo-web-barranquilla" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="barranquilla" />
                      </Suspense>
                    } />
                    <Route path="/mexico/diseno-web-monterrey" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="monterrey" />
                      </Suspense>
                    } />
                    <Route path="/mexico/diseno-web-guadalajara" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CityWebPage slug="guadalajara" />
                      </Suspense>
                    } />
                    <Route path="/mexico/automatizacion-procesos" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <AutomationCountryPage code="MX" />
                      </Suspense>
                    } />
                    <Route path="/estados-unidos" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CountryPage code="US" />
                      </Suspense>
                    } />
                    {/* Old Salta URLs. In production nginx answers them with a 301 (deploy/websysrl-redirects.conf);
                        these routes cover the dev server and any host without those rules. */}
                    <Route path="/desarrollo-web-salta" element={<Navigate to="/diseno-web-salta" replace />} />
                    <Route path="/diseno-web-en-salta" element={<Navigate to="/diseno-web-salta" replace />} />
                    <Route path="/politica-de-privacidad" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <PrivacyPolicyPage />
                      </Suspense>
                    } />
                    <Route path="/lp/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                        <NicheLandingPage />
                      </Suspense>
                    } />
                    <Route path="/blog/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <BlogPostPage />
                      </Suspense>
                    } />
                    <Route path="/autores/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <AuthorPage />
                      </Suspense>
                    } />
                    <Route path="*" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <NotFoundPage />
                      </Suspense>
                    } />
                  </Routes>
                </main>

                <SiteChrome>
                  <Suspense fallback={null}>
                    <Footer />
                  </Suspense>
                </SiteChrome>

                <NotOnPanel>
                  <Suspense fallback={null}>
                    <WhatsAppButton />
                  </Suspense>
                </NotOnPanel>

                <Suspense fallback={null}>
                  <ScrollToTop />
                </Suspense>

              </div>
            </Router>
          </ToastProvider>
        </LoadingProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
