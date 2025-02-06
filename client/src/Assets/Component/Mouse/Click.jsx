import { useEffect, useState } from "react";

const GlobalClickEffect = () => {
  const [clicks, setClicks] = useState([]);

  const handleClick = (e) => {
    const numberOfEffects = Math.floor(Math.random() * 2) + 2; 
    const newEffects = [];
    
    // Get the scroll position
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    for (let i = 0; i < numberOfEffects; i++) {
      const offsetX = Math.random() * 100 - 50; // random offset for x axis (to make the effect float around)
      const offsetY = Math.random() * 100 - 50; // random offset for y axis (to make the effect float around)

      // Create a new effect with the mouse position + offset, adjusted for scrolling
      newEffects.push({
        id: `${Date.now()}-${i}`,
        x: e.clientX + offsetX + scrollX, // Mouse X position + offset + scrollX
        y: e.clientY + offsetY + scrollY, // Mouse Y position + offset + scrollY
        size: Math.random() * 20 + 10, // random size for the effect
        opacity: Math.random() * 0.5 + 0.3, // random opacity for realism
        duration: Math.random() * 1 + 0.5, // random animation duration
      });
    }

    // Update the clicks state with new effects and clear after a timeout
    setClicks(newEffects);

    // Remove effects after animation is complete (after duration)
    newEffects.forEach((effect) => {
      setTimeout(() => {
        setClicks((prevClicks) => prevClicks.filter((click) => click.id !== effect.id));
      }, effect.duration * 500); // Multiply by 1000 to convert duration from seconds to milliseconds
    });
    // console.log(clicks)
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div>
      {clicks.map((click) => (
        <div
          key={click.id}
          style={{
            position: "absolute",
            left: `${click.x}px`,
            top: `${click.y}px`,
            width: `${click.size}px`,
            height: `${click.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            pointerEvents: "none", // Ensures elements do not block interactions
            opacity: click.opacity,
            animation: `floatEffect ${click.duration}s ease-out forwards`,
            zIndex: 9999, // Ensure the effect is on top of other elements
          }}
        />
      ))}
      <style>
        {`
          @keyframes floatEffect {
            0% {
              transform: scale(0.5);
            }
            100% {
              transform: scale(1.5) translateY(-100px); /* Moves upwards */
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default GlobalClickEffect;
