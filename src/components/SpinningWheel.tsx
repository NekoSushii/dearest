import React, { useState } from 'react';
import '../style/SpinningWheel.css'; // Create a corresponding CSS file

const SpinningWheel = () => {
  const [rotation, setRotation] = useState(0);
  const wheelSections = 2; // Number of semicircle sections on the wheel
  const sectionDegrees = 180 / wheelSections;

  const spin = () => {
    // Calculate the rotation angle
    const randomAngle = Math.floor(Math.random() * sectionDegrees);
    const totalRotation = 180 * 3; 
    const finalRotation = totalRotation + randomAngle;

    // Rotate the wheel
    setRotation(finalRotation);
  };

  return (
    <div className="spinning-wheel">
      <div
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {Array.from({ length: wheelSections }).map((_, index) => (
          <div
            className="wheel-section"
            key={index}
            style={{ transform: `rotate(${index * sectionDegrees}deg)` }}
          >
            <div className="semicircle">
              Section {index + 1}
            </div>
          </div>
        ))}
      </div>
      <button onClick={spin}>Spin</button>
    </div>
  );
};

export default SpinningWheel;
