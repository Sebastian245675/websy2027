import React, { useState, useEffect, useRef } from 'react';

export const LazyRenderSection = ({ children, threshold = 0.1, rootMargin = '200px', height = '100px' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
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
    }, [threshold, rootMargin]);

    return (
        <div ref={sectionRef} style={{ minHeight: height, width: '100%', contain: 'content-visibility' }}>
            {isVisible ? children : null}
        </div>
    );
};
