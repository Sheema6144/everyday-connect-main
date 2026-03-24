import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "@/data/words";
import { useProgress } from "@/contexts/ProgressContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Volume2, Check, ChevronLeft, Eye, EyeOff } from "lucide-react";

const LearnModule = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { isLearned, markLearned, unmarkLearned, getCategoryProgress } = useProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTelugu, setShowTelugu] = useState(true);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const category = categories.find((c) => c.id === categoryId);
  if (!category) return <div className="p-8 text-center">Category not found</div>;

  const word = category.words[currentIndex];
  const progress = getCategoryProgress(category.id);
  const learned = isLearned(word.id);
  const progressPercent = ((currentIndex + 1) / category.words.length) * 100;

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const goNext = () => {
    if (currentIndex < category.words.length - 1) {
      setDirection("next");
      setCurrentIndex((p) => p + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection("prev");
      setCurrentIndex((p) => p - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">{category.title}</span>
          </button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/quiz/${category.id}`)}
            className="rounded-xl"
          >
            Take Quiz
          </Button>
        </div>
        {/* Top progress bar */}
        <div className="px-0">
          <Progress value={progressPercent} className="h-1 rounded-none" />
        </div>
      </header>

      <main className="max-w-[600px] mx-auto px-5 py-8">
        {/* Progress info */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            Word {currentIndex + 1} of {category.words.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {progress.learned}/{progress.total} learned
          </span>
        </div>

        {/* Word Card */}
        <div
          className="bg-card rounded-2xl border border-border shadow-lg p-8 sm:p-10 text-center animate-scale-in"
          key={`${word.id}-${direction}`}
        >
          {/* Emoji */}
          <div className="text-[6rem] leading-none mb-6 select-none">{word.image}</div>

          {/* English Word */}
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">{word.english}</h2>

          {/* Telugu */}
          {showTelugu && (
            <p className="text-2xl text-primary/70 font-medium mb-6 italic">
              {word.telugu}
            </p>
          )}

          {/* Divider */}
          <div className="w-16 h-0.5 bg-border mx-auto my-6" />

          {/* Sentence */}
          <div className="bg-muted/50 rounded-xl p-5 mb-2">
            <p className="text-lg text-foreground font-medium leading-relaxed">{word.sentence}</p>
            {showTelugu && (
              <p className="text-sm text-muted-foreground mt-2 italic">{word.teluguSentence}</p>
            )}
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={() => speak(word.english + ". " + word.sentence)}
              className="rounded-xl gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setShowTelugu(!showTelugu)}
              className="rounded-xl gap-2 text-muted-foreground"
            >
              {showTelugu ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {showTelugu ? "Hide Telugu" : "Show Telugu"}
            </Button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <Button
            onClick={() => (learned ? unmarkLearned(word.id) : markLearned(word.id))}
            variant={learned ? "outline" : "default"}
            className={`w-full h-14 rounded-xl text-base font-semibold gap-2 transition-all duration-300 ${
              learned ? "border-primary text-primary" : ""
            }`}
          >
            <Check className="w-5 h-5" />
            {learned ? "Learned ✓" : "Mark as Learned"}
          </Button>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex-1 h-12 rounded-xl gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              variant="outline"
              onClick={goNext}
              disabled={currentIndex === category.words.length - 1}
              className="flex-1 h-12 rounded-xl gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnModule;
