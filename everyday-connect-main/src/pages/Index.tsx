import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center animate-fade-in max-w-lg">
        <div className="text-7xl mb-6">📖</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Everyday Words & Sentences
        </h1>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Learn everyday English words with Telugu translations, audio pronunciation, and quizzes.
          Designed for easy, accessible learning.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate("/signup")}
            size="lg"
            className="h-13 px-8 rounded-xl text-base font-semibold gap-2"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            size="lg"
            className="h-13 px-8 rounded-xl text-base font-semibold"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
