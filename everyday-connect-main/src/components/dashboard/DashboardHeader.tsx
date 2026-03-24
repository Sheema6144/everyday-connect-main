import { Button } from "@/components/ui/button";
import { LogOut, Flame } from "lucide-react";

interface Props {
  streak: number;
  onLogout: () => void;
}

const DashboardHeader = ({ streak, onLogout }: Props) => (
  <header className="bg-card border-b border-border sticky top-0 z-10">
    <div className="max-w-[900px] mx-auto px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <span className="text-xl">📖</span>
        <span className="font-semibold text-foreground text-sm hidden sm:inline">
          Everyday Words
        </span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-accent/10 text-accent px-2.5 py-1 rounded-full">
          <Flame className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">
            {streak} day{streak !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="gap-1.5 text-muted-foreground h-8 px-2.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-xs">Logout</span>
        </Button>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
