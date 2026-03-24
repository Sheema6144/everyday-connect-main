import { useNavigate } from "react-router-dom";
import { useAchievements } from "@/hooks/useAchievements";
import { Trophy, Lock } from "lucide-react";

const Achievements = () => {
  const achievements = useAchievements();
  const navigate = useNavigate();
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const sorted = [...achievements].sort(
    (a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0)
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <span className="font-semibold text-foreground text-sm">Everyday Words</span>
          </div>
          <nav className="flex items-center gap-1">
            <button onClick={() => navigate("/dashboard")} className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-colors">Home</button>
            <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg">Achievements</button>
            <button onClick={() => navigate("/categories")} className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-colors">Categories</button>
          </nav>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-foreground mb-1">Achievements</h1>
            <p className="text-sm text-muted-foreground">Track your learning milestones</p>
          </div>
          <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1.5 rounded-full">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-bold">{unlockedCount}/{achievements.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {sorted.map((badge) => (
            <div
              key={badge.id}
              className={`relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300 hover:scale-105 cursor-default ${
                badge.unlocked
                  ? "bg-card border-primary/20 shadow-sm"
                  : "bg-muted/20 border-transparent opacity-40 grayscale"
              }`}
              title={badge.description}
            >
              <div className="text-3xl mb-1.5 select-none">{badge.icon}</div>
              <span className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2">
                {badge.title}
              </span>
              <span className="text-[9px] text-muted-foreground mt-0.5 line-clamp-2">
                {badge.description}
              </span>
              {!badge.unlocked && (
                <Lock className="w-2.5 h-2.5 text-muted-foreground absolute top-1.5 right-1.5" />
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Achievements;
