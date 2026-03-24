import { useState } from "react";
import { Trophy, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Achievement } from "@/hooks/useAchievements";

interface Props {
  achievements: Achievement[];
}

const INITIAL_SHOW = 6;

const AchievementsSection = ({ achievements }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Sort: unlocked first, then locked
  const sorted = [...achievements].sort(
    (a, b) => (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0)
  );
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_SHOW);

  return (
    <div
      className="mb-6 animate-fade-in"
      style={{ animationDelay: "80ms", animationFillMode: "both" }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-accent" />
          <h2 className="text-base font-bold text-foreground">Achievements</h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {unlockedCount}/{achievements.length}
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {visible.map((badge) => (
          <div
            key={badge.id}
            className={`relative flex flex-col items-center text-center p-2.5 rounded-xl border transition-all duration-300 hover:scale-105 cursor-default ${
              badge.unlocked
                ? "bg-card border-primary/20 shadow-sm"
                : "bg-muted/20 border-transparent opacity-40 grayscale"
            }`}
            title={badge.description}
          >
            <div className="text-2xl mb-1 select-none">{badge.icon}</div>
            <span className="text-[10px] font-semibold text-foreground leading-tight line-clamp-2">
              {badge.title}
            </span>
            {!badge.unlocked && (
              <Lock className="w-2.5 h-2.5 text-muted-foreground absolute top-1 right-1" />
            )}
          </div>
        ))}
      </div>

      {achievements.length > INITIAL_SHOW && (
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-muted-foreground gap-1 h-7"
          >
            {showAll ? "Show Less" : `View All (${achievements.length})`}
            {showAll ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AchievementsSection;
