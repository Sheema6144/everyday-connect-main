import { BookOpen, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface Props {
  userName: string;
  motivation: string;
  overallPercent: number;
  learned: number;
  total: number;
  lastCategoryId?: string | null;
  onResume: () => void;
}

const HeroSection = ({
  userName,
  motivation,
  overallPercent,
  learned,
  total,
  lastCategoryId,
  onResume,
}: Props) => (
  <div className="animate-fade-in rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/10 p-6 sm:p-8 mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
      <div className="flex-1">
        <p className="text-xs font-medium text-primary mb-1">
          Hello, {userName} 👋
        </p>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-1">
          Learning is the key to
          <br />
          independence
        </h1>
        <p className="text-sm text-muted-foreground mb-2">
          Continue your journey
        </p>
        <p className="text-xs text-primary/80 font-medium italic mb-3">
          {motivation}
        </p>
        {lastCategoryId && (
          <Button
            size="sm"
            onClick={onResume}
            className="rounded-xl gap-1.5 h-8 text-xs"
          >
            Resume Learning
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      <div className="bg-card rounded-xl p-4 shadow-sm border border-border min-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="font-semibold text-foreground text-xs">
            Overall Progress
          </h2>
        </div>
        <div className="text-2xl font-bold text-primary mb-1">
          {Math.round(overallPercent)}%
        </div>
        <Progress value={overallPercent} className="h-2 rounded-full mb-1.5" />
        <p className="text-[11px] text-muted-foreground">
          {learned} of {total} words learned
        </p>
      </div>
    </div>
  </div>
);

export default HeroSection;
