import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

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
        <div className="relative">
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

          {/* Animated green arrow pointing to the subscription button */}
          {!isSubscription && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-[bounce_1.2s_ease-in-out_infinite]">
              <ArrowDown className="w-6 h-6 text-success drop-shadow-md" strokeWidth={3} />
            </div>
          )}
        </div>
      </div>

      {/* Helper text below arrow */}
      {!isSubscription && (
        <span className="mt-4 font-body text-xs font-bold text-success tracking-wide animate-[pulse_2s_ease-in-out_infinite]">
          👆 Clique e economize 15%!
        </span>
      )}
    </div>
  );
};

export default RecurrenceToggle;
