'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuizBoard from '@/app/game/quiz-board';
import { musicNotes, playNote } from '@/utils/notes';

function GamePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('player') || 'Player';

  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [isQuizSection, setIsQuizSection] = useState(false);
  const [notesSequence, setNotesSequence] = useState<string[]>([]);
  interface Question {
    question: string;
    options: string[];
    correctAnswer: number;
    note: string;
  }

  const [questions, setQuestions] = useState<Question[]>([]);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const noteKeys = Object.keys(musicNotes);
    const randomNotes: string[] = [];
    while (randomNotes.length < 5) {
      const note = noteKeys[Math.floor(Math.random() * noteKeys.length)];
      if (!randomNotes.includes(note)) {
        randomNotes.push(note);
      }
    }
    setNotesSequence(randomNotes);

    const generatedQuestions = randomNotes.map((note) => {
      const options = Object.keys(musicNotes).sort(() => 0.5 - Math.random()).slice(0, 4);
      if (!options.includes(note)) {
        options[Math.floor(Math.random() * 4)] = note;
      }
      return {
        question: 'What note is this sound?',
        options,
        correctAnswer: options.indexOf(note),
        note,
      };
    });
    setQuestions(generatedQuestions);

    const messageTimeout = setTimeout(() => {
      setShowMessage(false);
    }, 3000);

    return () => clearTimeout(messageTimeout);
  }, []);

  useEffect(() => {
    if (showMessage) return;
    if (currentNoteIndex < notesSequence.length) {
      playNote(musicNotes[notesSequence[currentNoteIndex]]);
      const timeout = setTimeout(() => {
        setCurrentNoteIndex(currentNoteIndex + 1);
      }, 3000);

      return () => clearTimeout(timeout);
    } else {
      setIsQuizSection(true);
    }
  }, [showMessage, currentNoteIndex, notesSequence.length]);

  if (isQuizSection) {
    return <QuizBoard questions={questions} notes={musicNotes} name={name} />;
  } else {
    return (
      <main className="min-h-screen pt-56 pb-40">
        {showMessage ?
          <div className="text-center text-5xl">Listen to and remember following music notes</div>
          :
          <div key={currentNoteIndex} className="text-center text-6xl animate-scale-up">{notesSequence[currentNoteIndex]}</div>
        }
      </main>
    );
  }
}

export default function Page() {
  return (
    <Suspense>
      <GamePage />
    </Suspense>
  );
}