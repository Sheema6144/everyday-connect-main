import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { categories, totalWords } from "@/data/words";

interface ProgressContextType {
  learnedWords: Set<string>;
  markLearned: (wordId: string) => void;
  unmarkLearned: (wordId: string) => void;
  isLearned: (wordId: string) => boolean;
  getCategoryProgress: (categoryId: string) => { learned: number; total: number };
  getOverallProgress: () => { learned: number; total: number };
  getQuizScore: (categoryId: string) => number | null;
  setQuizScore: (categoryId: string, score: number) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const stored = localStorage.getItem("ew_learned");
    if (stored) setLearnedWords(new Set(JSON.parse(stored)));
    const scores = localStorage.getItem("ew_quiz_scores");
    if (scores) setQuizScores(JSON.parse(scores));
  }, []);

  const save = (words: Set<string>) => {
    localStorage.setItem("ew_learned", JSON.stringify([...words]));
  };

  const markLearned = (wordId: string) => {
    setLearnedWords((prev) => {
      const next = new Set(prev);
      next.add(wordId);
      save(next);
      return next;
    });
  };

  const unmarkLearned = (wordId: string) => {
    setLearnedWords((prev) => {
      const next = new Set(prev);
      next.delete(wordId);
      save(next);
      return next;
    });
  };

  const isLearned = (wordId: string) => learnedWords.has(wordId);

  const getCategoryProgress = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    if (!cat) return { learned: 0, total: 0 };
    const learned = cat.words.filter((w) => learnedWords.has(w.id)).length;
    return { learned, total: cat.words.length };
  };

  const getOverallProgress = () => ({
    learned: learnedWords.size,
    total: totalWords,
  });

  const getQuizScore = (categoryId: string) => quizScores[categoryId] ?? null;

  const setQuizScore = (categoryId: string, score: number) => {
    setQuizScores((prev) => {
      const next = { ...prev, [categoryId]: score };
      localStorage.setItem("ew_quiz_scores", JSON.stringify(next));
      return next;
    });
  };

  return (
    <ProgressContext.Provider
      value={{ learnedWords, markLearned, unmarkLearned, isLearned, getCategoryProgress, getOverallProgress, getQuizScore, setQuizScore }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
