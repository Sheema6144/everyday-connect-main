import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories, getQuizQuestions } from "@/data/words";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Trophy, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

const Quiz = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { setQuizScore } = useProgress();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const category = categories.find((c) => c.id === categoryId);
  const questions = useMemo(
    () => (categoryId ? getQuizQuestions(categoryId) : []),
    [categoryId]
  );

  if (!category) return <div className="p-8 text-center">Category not found</div>;
  if (questions.length === 0) return <div className="p-8 text-center">No questions available</div>;

  const q = questions[currentQ];
  const progressPercent = ((currentQ + 1) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    if (index === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
      setQuizScore(category.id, score);
    }
  };

  const getScoreColor = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return "text-primary";
    if (pct >= 50) return "text-accent";
    return "text-destructive";
  };

  const getScoreMessage = () => {
    const pct = (score / questions.length) * 100;
    if (pct === 100) return { emoji: "🏆", text: "Perfect score! You're a star!" };
    if (pct >= 80) return { emoji: "🎉", text: "Excellent work! Almost perfect!" };
    if (pct >= 60) return { emoji: "👏", text: "Great job! Keep learning!" };
    if (pct >= 40) return { emoji: "💪", text: "Good effort! Practice more!" };
    return { emoji: "📚", text: "Keep studying, you'll improve!" };
  };

  // Result Screen
  if (finished) {
    const msg = getScoreMessage();
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="bg-card rounded-3xl border border-border shadow-xl p-10 text-center max-w-md w-full animate-scale-in">
          <div className="text-7xl mb-6">{msg.emoji}</div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Quiz Complete!</h2>
          <p className="text-muted-foreground mb-8">{category.title}</p>

          {/* Score circle */}
          <div className="relative w-36 h-36 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(score / questions.length) * 327} 327`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}</span>
              <span className="text-sm text-muted-foreground">of {questions.length}</span>
            </div>
          </div>

          <p className="text-foreground font-medium mb-8">{msg.text}</p>

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => {
                setCurrentQ(0);
                setSelected(null);
                setAnswered(false);
                setScore(0);
                setFinished(false);
              }}
              variant="outline"
              className="h-12 rounded-xl gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate(`/learn/${category.id}`)}
                className="flex-1 h-12 rounded-xl"
              >
                Review Words
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                className="flex-1 h-12 rounded-xl"
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-5 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(`/learn/${category.id}`)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-foreground">{category.title} Quiz</span>
          <span className="ml-auto text-sm text-muted-foreground">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
        <Progress value={progressPercent} className="h-1 rounded-none" />
      </header>

      <main className="max-w-[600px] mx-auto px-5 py-8">
        <div className="bg-card rounded-2xl border border-border shadow-lg p-8 animate-scale-in" key={currentQ}>
          <h2 className="text-xl font-semibold text-foreground mb-8 text-center">{q.question}</h2>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelected = selected === i;

              let optionClass =
                "w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center gap-3 ";

              if (!answered) {
                optionClass += "border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer";
              } else if (isCorrect) {
                optionClass += "border-primary bg-primary/10";
              } else if (isSelected && !isCorrect) {
                optionClass += "border-destructive bg-destructive/5";
              } else {
                optionClass += "border-border opacity-40";
              }

              return (
                <button key={i} onClick={() => handleSelect(i)} className={optionClass} disabled={answered}>
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold shrink-0 opacity-60">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-lg flex-1">{opt}</span>
                  {answered && isCorrect && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                  {answered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback text */}
          {answered && (
            <div className={`mt-4 p-3 rounded-xl text-center text-sm font-medium ${
              selected === q.correctIndex
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            }`}>
              {selected === q.correctIndex ? "Correct! Well done! 🎉" : "Not quite. Keep learning! 📚"}
            </div>
          )}

          {answered && (
            <Button onClick={handleNext} className="w-full h-12 rounded-xl mt-6 text-base font-semibold">
              {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Quiz;
