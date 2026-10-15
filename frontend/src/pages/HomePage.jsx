import React, { Suspense } from "react";
import { HeroSection } from "../components/HeroSection";
import { LazyRenderSection } from "../components/LazyRenderSection";
import { ArchitectureDemoSection } from "../components/ArchitectureDemoSection";
import { SEOHead } from "../components/SEOHead";
import { RubrosStrip } from "../components/RubrosStrip";
import { FAQSection, HOME_FAQ, faqSchema } from "../components/FAQSection";
import { COUNTRY_ALTERNATES, countryPageByCode } from "../countryPages";
import useVisitorCountry from "../hooks/useVisitorCountry";

const HomeGuides = React.lazy(() =>
  import('../components/HomeGuides').then(module => ({ default: module.HomeGuides }))
);

// Casos del país del visitante: solo se descarga si viene de un país con versión propia
const CountryHighlight = React.lazy(() =>
  import('../components/CountryHighlight').then(module => ({ default: module.CountryHighlight }))
);

// Lazy load todos los componentes excepto Hero para mejor performance - con logs
const PortfolioSection = React.lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading PortfolioSection...');
  return import('../components/PortfolioSection').then(module => {
    console.log('✅ [LAZY] PortfolioSection loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.PortfolioSection };
  });
});

const BenefitsSection = React.lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading BenefitsSection...');
  return import('../components/BenefitsSection').then(module => {
    console.log('✅ [LAZY] BenefitsSection loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.BenefitsSection };
  });
});



const AboutSection = React.lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading AboutSection...');
  return import('../components/AboutSection').then(module => {
    console.log('✅ [LAZY] AboutSection loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.AboutSection };
  });
});

const TestimonialsSection = React.lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading TestimonialsSection...');
  return import('../components/TestimonialsSection').then(module => {
    console.log('✅ [LAZY] TestimonialsSection loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.TestimonialsSection };
  });
});

const ContactSection = React.lazy(() => {
  const start = performance.now();
  console.log('📥 [LAZY] Loading ContactSection...');
  return import('../components/ContactSection').then(module => {
    console.log('✅ [LAZY] ContactSection loaded in', Math.round(performance.now() - start), 'ms');
    return { default: module.ContactSection };
  });
});

const WebsyVsEmployeeSection = React.lazy(() =>
  import('../components/WebsyVsEmployeeSection').then(module => ({ default: module.WebsyVsEmployeeSection }))
);

// FAQ schema only on the home page, generated from the same questions shown in the FAQ section
const homeFaqSchema = faqSchema(HOME_FAQ);

const SectionLoader = () => (
  <div className="w-full flex items-center justify-center py-20 bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
  </div>
);

export const HomePage = () => {
  const country = useVisitorCountry();
  const homeStart = performance.now();
  console.log('🏠 [HOME] HomePage rendering...');

  React.useEffect(() => {
    const homeEnd = performance.now();
    console.log('✅ [HOME] HomePage mounted in', Math.round(homeEnd - homeStart), 'ms');
  }, []);

  return (
    <>
      <SEOHead
        title="Desarrollo Web, E-commerce y Apps en Salta, Argentina | Websy"
        description="Agencia de desarrollo web en Salta: páginas web desde USD 800, tiendas online, apps, sistemas y automatización con IA. Respuesta en el día hábil."
        url="https://www.websysrl.com/"
        jsonLd={homeFaqSchema}
        alternates={COUNTRY_ALTERNATES}
      />
      <HeroSection country={country} />

      {countryPageByCode(country) && (
        <Suspense fallback={null}>
          <CountryHighlight country={country} />
        </Suspense>
      )}

      <ArchitectureDemoSection />

      <LazyRenderSection rootMargin="100px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </LazyRenderSection>

      <RubrosStrip />

      <LazyRenderSection rootMargin="100px" height="300px">
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <BenefitsSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <WebsyVsEmployeeSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="200px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <HomeGuides />
        </Suspense>
      </LazyRenderSection>

      <FAQSection items={HOME_FAQ} />

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </LazyRenderSection>
    </>
  );
};
