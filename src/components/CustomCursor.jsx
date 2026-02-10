import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setIsHovering(isClickable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Smooth springs for trailing effect
    const springConfig = { damping: 20, stiffness: 200 };
    const cursorX = useSpring(mousePosition.x, springConfig);
    const cursorY = useSpring(mousePosition.y, springConfig);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-primary-500 rounded-full z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: mousePosition.x - 6,
                    y: mousePosition.y - 6,
                }}
            />

            {/* Outer Circle Ring */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-primary-500 rounded-full z-[9998] pointer-events-none"
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.6 : 0.4,
                    borderWidth: isHovering ? 1 : 2,
                }}
                style={{
                    x: cursorX - 20,
                    y: cursorY - 20,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 150 }}
            />
        </>
    );
};

export default CustomCursor;
