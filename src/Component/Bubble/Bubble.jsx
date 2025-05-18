// components/Bubbles.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * window.innerWidth) - 50,
  y: Math.floor(Math.random() * window.innerHeight) - 50,
});

const getRandomSize = () => Math.floor(Math.random() * 40) + 20;

const getRandomColor = () => {
  const colors = ["#60a5fa", "#34d399", "#f472b6", "#facc15", "#a78bfa"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const FloatingBubble = () => {
  const controls = useAnimation();
  const move = async () => {
    while (true) {
      const newPos = getRandomPosition();
      await controls.start({
        x: newPos.x,
        y: newPos.y,
        transition: { duration: 3 + Math.random() * 2, ease: "easeInOut" },
      });
    }
  };

  useEffect(() => {
    move();
  }, []);

  const size = getRandomSize();
  const color = getRandomColor();

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-0 mix-blend-multiply"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        opacity: 0.2 + Math.random() * 0.3,
        filter: "blur(1px)",
      }}
      animate={controls}
    />
  );
};

export default function Bubbles({ count = 10 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FloatingBubble key={i} />
      ))}
    </>
  );
}
