// StarryBackground.jsx
import { useState, useEffect } from 'react';

// Generate a random set of stars
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 3,
      animationDuration: 2 + Math.random() * 6,
      animationDelay: Math.random() * 2,
      opacity: 0.5 + Math.random() * 0.5
    });
  }
  return stars;
};

function StarryBackground() {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate new stars when component mounts
    setStars(generateStars(150)); // Adjust number of stars as needed
    
    // Regenerate stars every 30 seconds for subtle changes
    const intervalId = setInterval(() => {
      setStars(prevStars => {
        // Only change 10% of stars at a time for a subtle effect
        const updatedStars = [...prevStars];
        const numToChange = Math.floor(updatedStars.length * 0.1);
        
        for (let i = 0; i < numToChange; i++) {
          const randomIndex = Math.floor(Math.random() * updatedStars.length);
          updatedStars[randomIndex] = {
            ...updatedStars[randomIndex],
            animationDuration: 2 + Math.random() * 6,
            opacity: 0.5 + Math.random() * 0.5
          };
        }
        
        return updatedStars;
      });
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="starry-background">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
            opacity: star.opacity
          }}
        />
      ))}
    </div>
  );
}

export default StarryBackground;