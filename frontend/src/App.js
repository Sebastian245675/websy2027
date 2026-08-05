import React, { Suspense, lazy, memo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { LanguageProvider } from "./LanguageContext";
import { ScrollToTopOnRouteChange } from "./components/ScrollToTopOnRouteChange";
import { SEOHead } from "./components/SEOHead";
import { SkipLinks } from "./components/Accessibility";
import { LoadingProvider, ErrorBoundary, ToastProvider } from "./components/UXEnhancements";
import useAdminPanel from "./hooks/useAdminPanel";

// Critical path - HomePage loads eagerly for fast FCP/LCP
import { HomePage } from "./pages/HomePage";

// Lazy load Navigation and Footer (non-blocking)
const Navigation = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Starting to load Navigation...');
  return import("./components/Navigation").then(module => {
    const end = performance.now();
    console.log('✅ [LAZY] Navigation loaded in', Math.round(end - start), 'ms');
    return { default: module.Navigation };
  });
});

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

const CotizacionesView = lazy(() => {
  return import("./pages/CotizacionesView").then(module => {
    return { default: module.CotizacionesView };
  });
});

const SuccessStoriesPage = lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading SuccessStoriesPage...');
  return import("./pages/SuccessStoriesPage").then(module => {
    console.log('✅ [LAZY] SuccessStoriesPage loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.SuccessStoriesPage };
  });
});

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

// Lazy load non-critical components
const WhatsAppButton = lazy(() => {
  const start = performance.now();
  return import("./components/WhatsAppButton").then(module => {
    console.log('✅ [LAZY] WhatsAppButton loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.WhatsAppButton };
  });
});

const LanguageFloatingButton = lazy(() => {
  const start = performance.now();
  return import("./components/LanguageFloatingButton").then(module => {
    console.log('✅ [LAZY] LanguageFloatingButton loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.LanguageFloatingButton };
  });
});

const AdminLogin = lazy(() => {
  const start = performance.now();
  return import("./components/AdminLogin").then(module => {
    console.log('✅ [LAZY] AdminLogin loaded in', Math.round(performance.now() - start), 'ms');
    return module;
  });
});

const AdminPanel = lazy(() => {
  const start = performance.now();
  return import("./components/AdminPanel").then(module => {
    console.log('✅ [LAZY] AdminPanel loaded in', Math.round(performance.now() - start), 'ms');
    return module;
  });
});

// Minimal navigation placeholder to prevent CLS - EXACT same height as real nav
const NavPlaceholder = memo(() => (
  <nav className="fixed top-0 w-full bg-white z-50 border-b" style={{ height: window.innerWidth < 1024 ? '68px' : '100px', borderColor: '#e0e0e0', minHeight: window.innerWidth < 1024 ? '68px' : '100px' }}>
    <div className="container flex justify-between items-center" style={{ height: '68px', padding: '0 1rem' }}>
      <div className="h-10 w-32 bg-gray-100 rounded" style={{ opacity: 0 }} />
    </div>
  </nav>
));

function App() {
  const appStart = performance.now();
  console.log('⚙️ [APP] App component rendering');

  const {
    showLogin,
    showPanel,
    handleLogin,
    handleLogout,
    closeLogin,
    closePanel
  } = useAdminPanel();

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
                <SEOHead
                  title="Websy"
                  description="Agencia de desarrollo web y automatizaciones en Salta. Creamos landing pages, e-commerce, CRM/ERP y SEO. Diseño responsivo y soluciones a medida."
                  keywords="desarrollo web, diseño web, e-commerce, sistemas de gestión, SEO, automatizaciones, landing pages, páginas web profesionales, desarrollo react, Salta Argentina"
                  type="website"
                />

                <SkipLinks />

                <Suspense fallback={<NavPlaceholder />}>
                  <Navigation />
                </Suspense>

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
                    <Route path="/panel-cotizaciones" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <CotizacionesView />
                      </Suspense>
                    } />
                    <Route path="/casos-de-exito" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <SuccessStoriesPage />
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
                    <Route path="/blog/:slug" element={
                      <Suspense fallback={<div style={{ minHeight: '100vh', paddingTop: '68px' }} />}>
                        <BlogPostPage />
                      </Suspense>
                    } />
                  </Routes>
                </main>

                <Suspense fallback={null}>
                  <Footer />
                </Suspense>

                <Suspense fallback={null}>
                  <WhatsAppButton />
                </Suspense>
                <Suspense fallback={null}>
                  <LanguageFloatingButton />
                </Suspense>
                <Suspense fallback={null}>
                  <ScrollToTop />
                </Suspense>

                {/* Admin System */}
                {showLogin && (
                  <Suspense fallback={<div>Cargando...</div>}>
                    <AdminLogin
                      onLogin={handleLogin}
                      onClose={closeLogin}
                    />
                  </Suspense>
                )}

                {showPanel && (
                  <Suspense fallback={<div>Cargando...</div>}>
                    <AdminPanel
                      onClose={closePanel}
                      onLogout={handleLogout}
                    />
                  </Suspense>
                )}
              </div>
            </Router>
          </ToastProvider>
        </LoadingProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;