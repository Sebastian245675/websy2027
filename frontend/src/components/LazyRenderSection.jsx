import React, { useState, useEffect, useRef } from 'react';

// Render everything up front for crawlers and the react-snap prerender (they don't scroll, so lazy sections
// would never make it into the indexed HTML), and when hydrating a prerendered page so the markup matches.
const RENDER_EAGERLY = typeof window !== 'undefined' && (
    /ReactSnap|bot|crawler|spider|slurp|facebookexternalhit|WhatsApp/i.test(navigator.userAgent) ||
    !!document.getElementById('root')?.hasChildNodes()
);

export const LazyRenderSection = ({ children, threshold = 0.1, rootMargin = '200px', height = '100px' }) => {
    const [isVisible, setIsVisible] = useState(RENDER_EAGERLY);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (isVisible) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold,
                rootMargin
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin, isVisible]);

    return (
        <div ref={sectionRef} style={{ minHeight: height, width: '100%', contain: 'content-visibility' }}>
            {isVisible ? children : null}
        </div>
    );
};
