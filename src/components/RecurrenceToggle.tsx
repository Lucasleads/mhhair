import { cn } from "@/lib/utils";

interface RecurrenceToggleProps {
  isSubscription: boolean;
  onToggle: (value: boolean) => void;
}

const RecurrenceToggle = ({ isSubscription, onToggle }: RecurrenceToggleProps) => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300",
          !isSubscription
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-secondary text-muted-foreground hover:bg-muted"
        )}
      >
        Compra Única
      </button>
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "px-5 py-2.5 rounded-full font-body text-sm font-semibold transition-all duration-300",
          isSubscription
            ? "bg-ocre text-ocre-foreground shadow-lg"
            : "bg-secondary text-muted-foreground hover:bg-muted"
        )}
      >
        Clube de Assinatura
        <span className="ml-1.5 text-xs font-bold opacity-90">(Economize 15% + Brindes)</span>
      </button>
    </div>
  );
};

export default RecurrenceToggle;
