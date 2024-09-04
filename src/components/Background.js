// src/components/Background.js
import React, { useEffect, useState, useRef } from 'react';
import styles from '../styles/Background.module.css'; // Import custom CSS module

const generateRandomCircles = (numCircles, sizeVariance) => {
    const circles = [];

    for (let i = 0; i < numCircles; i++) {
        const cx = Math.random() * 100; // random position in percentage
        const cy = Math.random() * 100; // random position in percentage
        const r = Math.random() * sizeVariance + 10; // random radius with minimum size 10
        const opacity = Math.random() * 0.3 + 0.2; // random opacity between 0.05 and 0.25
        const durationR = Math.random() * 2 + 2; // random duration between 3 and 6 seconds
        const durationX = Math.random() * 2 + 2; // random duration between 3 and 6 seconds
        const durationY = Math.random() * 2 + 2; // random duration between 3 and 6 seconds

        circles.push({
            key: i,
            cx,
            cy,
            r,
            opacity,
            durationR,
            durationX,
            durationY
        });
    }

    return circles;
};

const Background = () => {
    const [circles, setCircles] = useState([]);
    const circlesRef = useRef(circles);

    const [gradients, setGradients] = useState([]);
    // const gradientsRef = useRef(gradients);

    useEffect(() => {
        const generatedCircles = generateRandomCircles(100, 30);
        setCircles(generatedCircles);
        circlesRef.current = generatedCircles;

        const handleMouseMove = (event) => {
            
            // Calculate mouse position as a percentage of the window size
            const x = event.clientX / window.innerWidth;
            const y = event.clientY / window.innerHeight;

            // Generate the radial gradient based on mouse position
            const gradient = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 96, 0, 0.5), rgba(255, 140, 0, 0.5))`;
            // const gradient = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 120, 0, 0.5) 0%, rgba(255, 96, 0, 0.5) 10%, rgba(255, 200, 90, 0.2) 11%, rgba(255, 200, 90, 0.2))`;

            // const newGradient = {
            //     x,
            //     y,
            //     opacity: 1,
            //     size: 100
            // };

            // setGradients(prevGradients => {
            //     const updatedGradients = [...prevGradients, newGradient];

            //     // Reduce the size and opacity of old gradients
            //     return updatedGradients.map(grad => ({
            //         ...grad,
            //         opacity: 1,//grad.opacity * 0.99, // Reduce opacity
            //         size: grad.size * 0.95 // Reduce size
            //     })).slice(-100); // Limit to the last 100 gradients
            // });


            // Update the overlay background
            document.querySelector(`.${styles.overlay}`).style.background = gradient;

            // Parallax effect for each layer
            const layer1 = document.querySelector(`.${styles.layer1}`);
            const layer2 = document.querySelector(`.${styles.layer2}`);
            const layer3 = document.querySelector(`.${styles.layer3}`);

            if (layer1 && layer2 && layer3) {
                layer3.style.transform = `translate(${(x - 0.5) *  10}px, 10px)`;
                layer2.style.transform = `translate(${(x - 0.5) * 20}px, 10px)`;
                layer1.style.transform = `translate(${(x - 0.5) * 30}px, 10px)`;
            }

            // Update circle interactions
            const svg = document.querySelector('svg');

            const mouseX = x;
            const mouseY = y;

            circlesRef.current.forEach(circle => {
                const dx = (mouseX*100 - circle.cx);
                const dy = (mouseY*100 - circle.cy);
                const distance = Math.sqrt(dx * dx + dy * dy);

                const circleElement = document.querySelector(`.circle-${circle.key}`);
                if (circleElement) {
                    const threshold = 20;
                    if (distance < threshold) { // Adjust the proximity threshold as needed
                        const scale = 1 + 0.5 * ((threshold - distance) / threshold);
                        circleElement.setAttribute('r', circle.r * scale);

                        const maxTranslation = 3;
                        const translation = (threshold - distance) / threshold * maxTranslation;
                        circleElement.setAttribute('transform', `translate(${-dx * translation}, ${-dy * translation})`);
                    } else {
                        circleElement.setAttribute('r', circle.r);
                        circleElement.setAttribute('transform', 'translate(0, 0)');
                    }
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className={styles.background}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#ff6000" />
                {circles.map(circle => (
                    <circle
                        key={circle.key}
                        className={`circle-${circle.key}`}
                        cx={`${circle.cx}%`}
                        cy={`${circle.cy}%`}
                        r={circle.r}
                        fill={`rgba(255, 255, 255, ${circle.opacity})`}
                    >
                        <animate attributeName="r" values={`${circle.r}; ${circle.r + 5}; ${circle.r}`} dur={`${circle.durationR}s`} repeatCount="indefinite" />
                        <animate attributeName="cx" values={`${circle.cx}%; ${circle.cx + 2}%; ${circle.cx}%`} dur={`${circle.durationX}s`} repeatCount="indefinite" keyTimes="0; 0.5; 1" />
                        <animate attributeName="cy" values={`${circle.cy}%; ${circle.cy + 2}%; ${circle.cy}%`} dur={`${circle.durationY}s`} repeatCount="indefinite" keyTimes="0; 0.5; 1" />
                    </circle>
                ))}
            </svg>
            <div className={styles.overlay}
                //  style={{
                //     backgroundImage: gradients.map(grad => 
                //         `radial-gradient(circle at ${grad.x * 100}% ${grad.y * 100}%, 
                //         rgba(255, 120, 0, ${grad.opacity * 0.5}) 0%, 
                //         rgba(255, 96, 0, ${grad.opacity * 0.5}) 10%, 
                //         rgba(255, 200, 90, ${grad.opacity * 0.2}) 11%, 
                //         rgba(255, 200, 90, ${grad.opacity * 0.2}) ${grad.size}%)`
                //     ).join(',')
                //  }}
                 >
                
                <div className={styles.layer1} />
                <div className={styles.layer2}/>
                <div className={styles.layer3}/>
            </div>
        </div>
    );
};

export default Background;
