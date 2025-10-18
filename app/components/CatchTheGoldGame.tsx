"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const GOLD_COUNT = 6;
const GAME_DURATION = 30; // seconds

const getRandomPosition = () => ({
  top: Math.random() * 80 + "%",
  left: Math.random() * 90 + "%",
});

const CollectTheGoldGame = () => {
  const [golds, setGolds] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!isGameStarted || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isGameStarted, isGameOver]);

  useEffect(() => {
    if (isGameStarted) {
      const moveInterval = setInterval(() => {
        setGolds((prev) =>
          prev.map((g) => (!g.collected ? { ...g, ...getRandomPosition() } : g))
        );
      }, 3000);
      return () => clearInterval(moveInterval);
    }
  }, [isGameStarted]);

  const startGame = () => {
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGolds(
      Array.from({ length: GOLD_COUNT }, (_, id) => ({
        id,
        ...getRandomPosition(),
        collected: false,
      }))
    );
  };

  const endGame = () => {
    setIsGameOver(true);
    setIsGameStarted(false);
  };

  const handleCollect = (id: number) => {
    setGolds((prev) =>
      prev.map((g) => (g.id === id ? { ...g, collected: true } : g))
    );
    setScore((prev) => prev + 1);

    setTimeout(() => respawnGold(id), 1000);
  };

  const respawnGold = (id: number) => {
    setGolds((prev) =>
      prev.map((g) =>
        g.id === id ? { ...getRandomPosition(), id, collected: false } : g
      )
    );
  };

  return (
    <div
      className="relative w-full max-w-8xl mx-auto h-[670px] bg-cover bg-center border dark:border-gray-700 rounded-xl overflow-hidden mt-10 shadow-xl"
      style={{ backgroundImage: "url('/game-bg.jpg')" }}
    >
      {/* HUD */}
      <div className="absolute top-4 left-4 z-10 text-sm font-semibold text-gray-200 dark:text-gray-200">
        {isGameStarted && !isGameOver && <div>⏱ Time: {timeLeft}s</div>}
        <div>🎯 Score: {score}</div>
      </div>

      {/* Game Over */}
      {isGameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white text-center z-20 p-6">
          <h2 className="text-3xl font-bold mb-4">⏰ Time's Up!</h2>
          <p className="mb-4 text-xl">Your Score: {score}</p>
          <Button onClick={startGame} className="text-lg">
            Play Again
          </Button>
        </div>
      )}

      {/* Start */}
      {!isGameStarted && !isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-20">
          <button
            onClick={startGame}
            className="inline-block mt-6 px-3 py-3 bg-gold text-black rounded hover:bg-gold transition"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Gold Icons */}
      {isGameStarted &&
        golds.map((gold) => (
          <motion.div
            key={gold.id}
            className="absolute w-10 h-10 cursor-pointer"
            style={{ top: gold.top, left: gold.left }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => handleCollect(gold.id)}
          >
            {gold.collected ? (
              <motion.div
                className="text-green-500 text-xl"
                animate={{ scale: [1, 1.4, 0] }}
                transition={{ duration: 0.5 }}
              >
                ✨
              </motion.div>
            ) : (
              <Image
                src="/ignot-logo.png"
                alt="gold"
                width={40}
                height={40}
                className="animate-gold-bounce"
              />
            )}
          </motion.div>
        ))}
    </div>
  );
};

export default CollectTheGoldGame;
