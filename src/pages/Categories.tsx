import { useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { categories } from "@/data/words";
import CategoryCard from "@/components/dashboard/CategoryCard";

const Categories = () => {
  const { getCategoryProgress, getQuizScore } = useProgress();
  const navigate = useNavigate();

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
            <button onClick={() => navigate("/achievements")} className="text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg transition-colors">Achievements</button>
            <button className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-lg">Categories</button>
          </nav>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-5 py-6">
        <h1 className="text-xl font-bold text-foreground mb-1">All Categories</h1>
        <p className="text-sm text-muted-foreground mb-6">{categories.length} topics to explore</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.map((cat, i) => {
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
    </div>
  );
};

export default Categories;
