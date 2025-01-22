import { playNote } from '@/utils/notes';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "../../components/shadcn-ui/button";

import { Orbitron } from "next/font/google";
import { shuffleArray } from "@/utils/array-op";

const orbitron = Orbitron({
  subsets: ["latin"],
});

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  note: string;
}

interface QuizBoardProps {
  questions: Question[];
  notes: { [k: string]: number };
  name: string;
}

export default function QuizBoard({ questions, notes, name }: QuizBoardProps) {
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showChallengeMessage, setShowChallengeMessage] = useState(true);

  useEffect(() => {
    const challengeTimeout = setTimeout(() => {
      setShowChallengeMessage(false);
    }, 2000);

    return () => clearTimeout(challengeTimeout);
  }, []);

  useEffect(() => {
    if (showChallengeMessage) return;
    playNote(notes[shuffledQuestions[currentQuestionIndex].note]);
  }, [showChallengeMessage, currentQuestionIndex]);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent clicking other options

    setSelectedOption(index);
    setShowResult(true);

    if (index === shuffledQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      setShowResult(false);
      setSelectedOption(null);
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setQuizFinished(true);
      }
    }, 2000);
  };

  if (quizFinished) {
    return (
      <main className="min-h-screen pt-44 pb-40">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image src="/vynil.png" alt="score-logo" width={200} height={200} />
            <span className={`absolute inset-0 flex items-end justify-center text-white text-xl mb-6 ${orbitron.className}`}>
              {name}
            </span>
          </div>
          <div className="text-2xl mt-2 animate-scale-down">Your Score: {score}</div>
          <div className="flex mt-5">
            <Button
              onClick={() => window.location.reload()}
              className="text-xl rounded-full"
            >
              Play Again
            </Button>
            <Link href="/"><Button className="text-xl rounded-full ml-5" variant="outline">Go Home</Button></Link>
          </div>

        </div>
      </main>
    );
  }

  if (showChallengeMessage) {
    return (
      <main className="min-h-screen pt-72 pb-40">
        <div className="text-center text-5xl">Challenge incoming</div>
      </main>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center overflow-hidden">
        <Image className="mt-1" src="/vynil.png" alt="score-logo" width={25} height={25} />
        <div key={`animate-${score}`} className={`text-4xl ml-2 ${score > 0 ? 'animate-pop-up' : ''}`}>{score}</div>
      </div>
      <div className="text-center text-3xl pt-44 pb-40">
        <h2>{currentQuestion.question}</h2>
        <ul className="mt-4 space-y-1">
          {currentQuestion.options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`cursor-pointer w-8 mx-auto ${showResult
                ? index === currentQuestion.correctAnswer
                  ? 'text-green-500'
                  : index === selectedOption
                    ? 'text-red-500'
                    : 'text-black'
                : 'text-black'
                } ${selectedOption !== null ? 'pointer-events-none' : ''}`} // Disable click after selection
            >
              {option}
            </li>
          ))}
        </ul>
        <Link href="/"><Button className="text-xl rounded-full mt-10" variant="outline">Quit Game</Button></Link>
      </div>
    </main>
  );
}
