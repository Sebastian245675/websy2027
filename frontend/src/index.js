import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Medición de rendimiento en consola: solo en desarrollo. En producción los console.* se eliminan al
// compilar, pero los observadores y el parche de webpack seguirían corriendo en cada visita.
if (process.env.NODE_ENV === 'development') {
  // Performance monitoring
  const perfStart = performance.now();
  console.log('🚀 [PERF] App initialization started');

  // Measure specific module loads
  const moduleTimes = {};
  const originalImport = window.__webpack_require__;
  if (originalImport) {
    window.__webpack_require__ = function(moduleId) {
      const start = performance.now();
      const result = originalImport.apply(this, arguments);
      const duration = performance.now() - start;
      if (duration > 10) {
        if (!moduleTimes[moduleId]) moduleTimes[moduleId] = [];
        moduleTimes[moduleId].push(duration);
        console.log(`📦 [MODULE] ${moduleId} loaded in ${Math.round(duration)}ms`);
      }
      return result;
    };
  }

  // Monitor CLS (Cumulative Layout Shift)
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            console.error('⚠️ [CLS] Layout shift detected:', {
              value: entry.value,
              hadRecentInput: entry.hadRecentInput,
              sources: entry.sources?.map(s => ({
                node: s.node,
                nodeName: s.node?.nodeName,
                nodeClasses: s.node?.className,
                previousRect: {
                  x: s.previousRect?.x,
                  y: s.previousRect?.y,
                  width: s.previousRect?.width,
                  height: s.previousRect?.height
                },
                currentRect: {
                  x: s.currentRect?.x,
                  y: s.currentRect?.y,
                  width: s.currentRect?.width,
                  height: s.currentRect?.height
                }
              })),
              timestamp: entry.startTime
            });
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      // Monitor LCP (Largest Contentful Paint)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('🎨 [LCP] Largest Contentful Paint:', 
          '\n  - Render Time:', Math.round(lastEntry.renderTime), 'ms',
          '\n  - Load Time:', Math.round(lastEntry.loadTime), 'ms',
          '\n  - Size:', lastEntry.size, 'px²',
          '\n  - Element:', lastEntry.element?.tagName,
          '\n  - URL:', lastEntry.url?.split('/').pop() || 'N/A'
        );
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // Monitor Long Tasks (TBT)
      let longTaskCount = 0;
      let totalBlockingTime = 0;
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          longTaskCount++;
          const duration = Math.round(entry.duration);
          const startTime = Math.round(entry.startTime);
        
          // TBT calculation: only time above 50ms threshold counts
          const blockingTime = Math.max(0, duration - 50);
          totalBlockingTime += blockingTime;
        
          console.warn(
            `⏱️ [LONG TASK #${longTaskCount}] Duration: ${duration}ms | Start: ${startTime}ms | Name: ${entry.name}`,
            `\n  Blocking Time (TBT contribution): ${blockingTime}ms`,
            `\n  Attribution: ${entry.attribution?.[0]?.name || 'unknown'}`,
            `\n  Container: ${entry.attribution?.[0]?.containerType || 'unknown'}`
          );
        
          // Capture stack trace for tasks >100ms
          if (entry.duration > 100) {
            console.error(`⚠️ HEAVY TASK >100ms detected at ${startTime}ms - this significantly contributes to TBT`);
            console.trace('Stack trace for heavy task');
          }
        }
      
        // Store for final summary
        window.__totalBlockingTime = totalBlockingTime;
        window.__longTaskCount = longTaskCount;
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      console.log('Performance Observer not fully supported');
    }
  }

  // Monitor resource loading
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
  
    console.log('📊 [PERF] Navigation Timing:',
      `\n  - DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
      `\n  - Load Complete: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
      `\n  - DOM Interactive: ${Math.round(perfData.domInteractive)}ms`,
      `\n  - Total Time: ${Math.round(perfData.loadEventEnd)}ms`
    );

    // Log slow resources
    const slowResources = resources.filter(r => r.duration > 100);
    if (slowResources.length > 0) {
      console.warn('\n🐌 [SLOW RESOURCES] Resources taking >100ms:');
      slowResources.forEach(r => {
        console.warn(`  - ${r.name.split('/').pop()}: ${Math.round(r.duration)}ms (${Math.round((r.transferSize || 0) / 1024)}KB) [${r.initiatorType}]`);
      });
    }
  
    // Log all JS chunks loaded
    const jsChunks = resources.filter(r => (r.name.includes('.chunk.js') || (r.name.includes('main.') && r.name.includes('.js'))) && !r.name.includes('hot-update'));
    if (jsChunks.length > 0) {
      console.log('\n📦 [JS CHUNKS] Loaded during initial page load:');
      jsChunks.forEach(r => {
        console.log(`  - ${r.name.split('/').pop()}: ${Math.round((r.transferSize || 0) / 1024)}KB in ${Math.round(r.duration)}ms`);
      });
    }
    const initTime = performance.now() - perfStart;
    console.log('✅ [PERF] Total initialization time:', Math.round(initTime), 'ms');
  
    // Final summary after 3 seconds
    setTimeout(() => {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📈 [FINAL SUMMARY] Web Vitals Report');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(e => e.name === 'first-contentful-paint');
    
      if (fcp) {
        console.log('✓ FCP:', Math.round(fcp.startTime), 'ms', fcp.startTime < 1800 ? '✅' : '⚠️');
      }
    
      // TBT Analysis
      const tbt = window.__totalBlockingTime || 0;
      const taskCount = window.__longTaskCount || 0;
      console.log(`\n⏱️ TBT (Total Blocking Time): ${tbt}ms`, tbt < 300 ? '✅' : '⚠️ NEEDS OPTIMIZATION');
      console.log(`   Long Tasks Detected: ${taskCount}`);
      if (tbt > 300) {
        console.error(`   ❌ TBT is ${tbt - 300}ms above the 300ms target`);
        console.log(`   💡 Recommendation: Reduce JavaScript execution and split heavy tasks`);
      }
    
      const allResources = performance.getEntriesByType('resource');
      const jsResources = allResources.filter(r => r.name.includes('.js') || r.name.includes('.chunk'));
      const cssResources = allResources.filter(r => r.name.includes('.css'));
      const imgResources = allResources.filter(r => r.initiatorType === 'img');
    
      const jsTotalSize = Math.round(jsResources.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024);
      const cssTotalSize = Math.round(cssResources.reduce((acc, r) => acc + (r.transferSize || 0), 0) / 1024);
    
      console.log(`\n📦 JS Bundles: ${jsResources.length} files | Total: ${jsTotalSize} KB`);
      console.log(`🎨 CSS Files: ${cssResources.length} files | Total: ${cssTotalSize} KB`);
      console.log(`🖼️ Images: ${imgResources.length} files`);
    
      // Show module timing if available
      if (Object.keys(moduleTimes).length > 0) {
        console.log('\n⏱️ SLOWEST MODULES:');
        const sortedModules = Object.entries(moduleTimes)
          .map(([id, times]) => ({ id, total: times.reduce((a, b) => a + b, 0), count: times.length }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);
        sortedModules.forEach((m, i) => {
          console.log(`  ${i+1}. Module ${m.id}: ${Math.round(m.total)}ms (${m.count} loads)`);
        });
      }
    
      // Log heaviest resources
      const heaviestJS = jsResources
        .sort((a, b) => (b.transferSize || 0) - (a.transferSize || 0))
        .slice(0, 5);
    
      console.log('\n⚠️ TOP 5 HEAVIEST JS BUNDLES:');
      heaviestJS.forEach((r, i) => {
        const name = r.name.split('/').pop();
        const size = Math.round((r.transferSize || 0) / 1024);
        const duration = Math.round(r.duration);
        console.log(`  ${i+1}. ${name} - ${size}KB (loaded in ${duration}ms)`);
      });
    
      console.log('\nTotal Resources:', allResources.length);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }, 3000);
  });
}

const container = document.getElementById("root");

if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    container,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(container);
  
  // Use scheduler to break up long tasks
  if ('scheduler' in window && 'yield' in window.scheduler) {
    // Use native scheduler if available (Chrome 94+)
    (async () => {
      await window.scheduler.yield();
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    })();
  } else {
    // Fallback: use setTimeout to break up rendering task
    setTimeout(() => {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }, 0);
  }
}
