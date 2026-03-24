import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProgress } from "@/contexts/ProgressContext";
import { categories } from "@/data/words";
import { useAchievements, type Achievement } from "@/hooks/useAchievements";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HeroSection from "@/components/dashboard/HeroSection";
import CategoryCard from "@/components/dashboard/CategoryCard";
import BadgeUnlockDialog from "@/components/dashboard/BadgeUnlockDialog";
import { Lock } from "lucide-react";

const motivationalTexts = [
  "Every word you learn opens a new door 🚪",
  "You're building a brighter future 🌟",
  "Keep going, you're doing amazing! 💪",
  "Small steps lead to big changes 🌱",
  "Knowledge is your superpower ⚡",
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { getCategoryProgress, getOverallProgress, getQuizScore } = useProgress();
  const navigate = useNavigate();
  const achievements = useAchievements();
  const overall = getOverallProgress();
  const overallPercent = overall.total > 0 ? (overall.learned / overall.total) * 100 : 0;

  const [streak, setStreak] = useState(0);
  const [motivation, setMotivation] = useState("");
  const [unlockedBadge, setUnlockedBadge] = useState<Achievement | null>(null);
  const prevUnlockedRef = useRef<Set<string>>(new Set());
  const lastCategoryId = localStorage.getItem("ew_last_category");

  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem("ew_last_visit");
    const storedStreak = parseInt(localStorage.getItem("ew_streak") || "0");
    if (lastVisit === today) {
      setStreak(storedStreak);
    } else {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = lastVisit === yesterday ? storedStreak + 1 : 1;
      localStorage.setItem("ew_streak", String(newStreak));
      localStorage.setItem("ew_last_visit", today);
      setStreak(newStreak);
    }
    setMotivation(motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)]);
  }, []);

  // Badge unlock popup
  useEffect(() => {
    const currentUnlocked = new Set(achievements.filter((a) => a.unlocked).map((a) => a.id));
    if (prevUnlockedRef.current.size > 0) {
      for (const id of currentUnlocked) {
        if (!prevUnlockedRef.current.has(id)) {
          const badge = achievements.find((a) => a.id === id);
          if (badge) { setUnlockedBadge(badge); break; }
        }
      }
    }
    prevUnlockedRef.current = currentUnlocked;
  }, [achievements]);

  const handleLogout = () => { logout(); navigate("/login"); };

  // Preview data
  const sortedBadges = [...achievements].sort((a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0)).slice(0, 4);
  const previewCategories = categories.slice(0, 3);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader streak={streak} onLogout={handleLogout} />

      <main className="max-w-[900px] mx-auto px-5 py-6">
        <HeroSection
          userName={user?.name || "Learner"}
          motivation={motivation}
          overallPercent={overallPercent}
          learned={overall.learned}
          total={overall.total}
          lastCategoryId={lastCategoryId}
          onResume={() => navigate(`/learn/${lastCategoryId}`)}
        />

        {/* Achievements Preview */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: "80ms", animationFillMode: "both" }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <h2 className="text-base font-bold text-foreground">Achievements</h2>
              <span className="text-xs text-muted-foreground">{unlockedCount}/{achievements.length}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate("/achievements")} className="text-xs text-primary gap-1 h-7">
              View All <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sortedBadges.map((badge) => (
              <div
                key={badge.id}
                className={`relative flex flex-col items-center text-center p-2.5 rounded-xl border transition-all duration-300 hover:scale-105 cursor-default ${
                  badge.unlocked ? "bg-card border-primary/20 shadow-sm" : "bg-muted/20 border-transparent opacity-40 grayscale"
                }`}
                title={badge.description}
              >
                <div className="text-2xl mb-1 select-none">{badge.icon}</div>
                <span className="text-[10px] font-semibold text-foreground leading-tight line-clamp-2">{badge.title}</span>
                {!badge.unlocked && <Lock className="w-2.5 h-2.5 text-muted-foreground absolute top-1 right-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Categories Preview */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-foreground">Categories</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/categories")} className="text-xs text-primary gap-1 h-7">
            View All ({categories.length}) <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {previewCategories.map((cat, i) => {
            const progress = getCategoryProgress(cat.id);
            return (
              <CategoryCard
                key={cat.id}
                icon={cat.icon}
                title={cat.title}
                learned={progress.learned}
                total={progress.total}
                quizScore={getQuizScore(cat.id)}
                index={i}
                onClick={() => {
                  localStorage.setItem("ew_last_category", cat.id);
                  navigate(`/learn/${cat.id}`);
                }}
              />
            );
          })}
        </div>
      </main>

      <BadgeUnlockDialog badge={unlockedBadge} open={!!unlockedBadge} onClose={() => setUnlockedBadge(null)} />
    </div>
  );
};

export default Dashboard;
