import React, { Suspense } from "react";
import { HeroSection } from "../components/HeroSection";
import { LazyRenderSection } from "../components/LazyRenderSection";

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

const SectionLoader = () => (
  <div className="w-full flex items-center justify-center py-20 bg-white">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
  </div>
);

export const HomePage = () => {
  const homeStart = performance.now();
  console.log('🏠 [HOME] HomePage rendering...');

  React.useEffect(() => {
    const homeEnd = performance.now();
    console.log('✅ [HOME] HomePage mounted in', Math.round(homeEnd - homeStart), 'ms');
  }, []);

  return (
    <>
      <HeroSection />

      <LazyRenderSection rootMargin="100px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <BenefitsSection />
        </Suspense>
      </LazyRenderSection>



      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="600px">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </LazyRenderSection>

      <LazyRenderSection rootMargin="50px" height="300px">
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
      </LazyRenderSection>
    </>
  );
};
