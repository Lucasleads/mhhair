import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface RecurrenceToggleProps {
  isSubscription: boolean;
  onToggle: (value: boolean) => void;
}

const RecurrenceToggle = ({ isSubscription, onToggle }: RecurrenceToggleProps) => {
  return (
    <div className="relative flex flex-col items-center gap-3">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => onToggle(false)}
          className={cn(
            "px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300",
            !isSubscription
              ? "bg-ocre text-ocre-foreground shadow-lg"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          Compra Única
        </button>
        <div className="relative flex items-center gap-2">
          <button
            onClick={() => onToggle(true)}
            className={cn(
              "px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300",
              isSubscription
                ? "bg-ocre text-ocre-foreground shadow-lg"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            Clube de Assinatura
            <span className="ml-1.5 text-xs font-bold opacity-90">(Economize 15% + Brindes)</span>
          </button>

          {/* Animated green arrow to the right of the button */}
          {!isSubscription && (
            <div className="flex items-center gap-1 animate-[bounce_1.2s_ease-in-out_infinite] [animation-direction:alternate]" style={{ animationName: 'horizontalBounce' }}>
              <ArrowLeft className="w-6 h-6 text-success drop-shadow-md" strokeWidth={3} />
              <span className="font-body text-xs font-bold text-success whitespace-nowrap">
                Economize 15%!
              </span>
            </div>
          )}
        </div>
    </div>
  );
};

export default RecurrenceToggle;
