import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

interface Props {
  icon: string;
  title: string;
  learned: number;
  total: number;
  quizScore: number | null;
  index: number;
  onClick: () => void;
}

const CategoryCard = ({
  icon,
  title,
  learned,
  total,
  quizScore,
  index,
  onClick,
}: Props) => {
  const percent = total > 0 ? (learned / total) * 100 : 0;

  return (
    <div
      className="bg-card rounded-xl border border-border p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 animate-fade-in group cursor-pointer"
      style={{
        animationDelay: `${index * 60}ms`,
        animationFillMode: "both",
      }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl select-none">{icon}</div>
        {quizScore !== null && (
          <div className="flex items-center gap-1 bg-accent/10 text-accent px-2 py-0.5 rounded-full">
            <Star className="w-3 h-3 fill-accent" />
            <span className="text-[11px] font-bold">{quizScore}/5</span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-2">
        {title}
      </h3>

      <div className="mb-3">
        <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
          <span>
            {learned}/{total} learned
          </span>
          <span>{Math.round(percent)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-primary h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full rounded-lg gap-1.5 h-8 text-xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {learned > 0 ? "Continue" : "Start Learning"}
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};

export default CategoryCard;
