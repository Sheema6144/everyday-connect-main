import { useMemo } from "react";
import { categories } from "@/data/words";
import { useProgress } from "@/contexts/ProgressContext";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category?: "learning" | "quiz" | "milestone";
}

export function useAchievements(): Achievement[] {
  const { getCategoryProgress, getOverallProgress, getQuizScore } = useProgress();
  const overall = getOverallProgress();

  return useMemo(() => {
    const achievements: Achievement[] = [];

    // First Word — learn 1 word
    achievements.push({
      id: "first-word",
      title: "First Step",
      description: "Learn your first word",
      icon: "🌱",
      unlocked: overall.learned >= 1,
      category: "milestone",
    });

    // 10 words
    achievements.push({
      id: "ten-words",
      title: "Getting Started",
      description: "Learn 10 words",
      icon: "📗",
      unlocked: overall.learned >= 10,
      category: "milestone",
    });

    // Half way
    achievements.push({
      id: "half-way",
      title: "Halfway There",
      description: `Learn ${Math.ceil(overall.total / 2)} words`,
      icon: "🏔️",
      unlocked: overall.learned >= Math.ceil(overall.total / 2),
      category: "milestone",
    });

    // All words
    achievements.push({
      id: "all-words",
      title: "Word Master",
      description: "Learn every single word",
      icon: "👑",
      unlocked: overall.learned >= overall.total && overall.total > 0,
      category: "milestone",
    });

    // Per-category completion badges
    categories.forEach((cat) => {
      const progress = getCategoryProgress(cat.id);
      achievements.push({
        id: `complete-${cat.id}`,
        title: `${cat.title} Expert`,
        description: `Complete all ${cat.title} words`,
        icon: cat.icon,
        unlocked: progress.learned >= progress.total && progress.total > 0,
        category: "learning",
      });
    });

    // Per-category perfect quiz badges
    categories.forEach((cat) => {
      const score = getQuizScore(cat.id);
      achievements.push({
        id: `quiz-${cat.id}`,
        title: `${cat.title} Ace`,
        description: `Perfect quiz score in ${cat.title}`,
        icon: "⭐",
        unlocked: score === 5,
        category: "quiz",
      });
    });

    // Quiz Whiz — pass any quiz
    const anyQuizPassed = categories.some((c) => {
      const s = getQuizScore(c.id);
      return s !== null && s >= 3;
    });
    achievements.push({
      id: "first-quiz",
      title: "Quiz Whiz",
      description: "Pass your first quiz (3+/5)",
      icon: "🧠",
      unlocked: anyQuizPassed,
      category: "quiz",
    });

    // All quizzes perfect
    const allPerfect = categories.every((c) => getQuizScore(c.id) === 5);
    achievements.push({
      id: "all-perfect",
      title: "Perfectionist",
      description: "Get perfect scores on all quizzes",
      icon: "🏆",
      unlocked: allPerfect,
      category: "quiz",
    });

    return achievements;
  }, [overall, getCategoryProgress, getQuizScore]);
}
