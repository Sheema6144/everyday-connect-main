import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Achievement } from "@/hooks/useAchievements";

interface Props {
  badge: Achievement | null;
  open: boolean;
  onClose: () => void;
}

const BadgeUnlockDialog = ({ badge, open, onClose }: Props) => {
  if (!badge) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[340px] text-center rounded-2xl">
        <DialogHeader className="items-center">
          <div className="text-6xl mb-2 animate-bounce">{badge.icon}</div>
          <DialogTitle className="text-lg">🎉 Badge Unlocked!</DialogTitle>
          <DialogDescription className="text-sm">
            <span className="font-semibold text-foreground block mt-1">
              {badge.title}
            </span>
            {badge.description}
          </DialogDescription>
        </DialogHeader>
        <Button onClick={onClose} className="rounded-xl mt-2">
          Awesome!
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeUnlockDialog;
