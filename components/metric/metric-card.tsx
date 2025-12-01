import { formatPercentage } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  min: number;
  max: number;
  current: number;
  diffMode?: boolean;
  referenceValue?: number;
}

export function MetricCard({ 
  title, 
  description, 
  value, 
  icon: Icon,
  min = 0,
  max = 1,
  current,
  diffMode = false,
  referenceValue
}: MetricCardProps) {
  const progress = Math.max(0, Math.min(1, ((current - min) / (max - min))));
  const isExtremeValue = (current === min || current === max);

const diffValue = diffMode && referenceValue ? current - referenceValue : 0;

const formatDiffValue = () => {
  if (!diffMode || diffValue === 0) return null;
  
  const absDiff = Math.abs(diffValue);
  const sign = diffValue > 0 ? '+' : '-';
  
  return `${sign}${formatPercentage(absDiff)}`;
};

const diffDisplay = formatDiffValue();
  return (
    <div className={`
      relative flex items-center justify-between p-3 rounded-lg bg-muted/30 overflow-hidden
      ${isExtremeValue ? 'ring-2 ring-primary' : ''}
    `}>
      {progress !== undefined && (
        <div 
          className="absolute left-0 top-0 h-full bg-primary/15 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      )}

      <div className="flex items-center gap-3 relative z-10 flex-1 min-w-0">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{title}</div>
          {/* Desktop description  */}
          <div className="hidden sm:block text-xs text-muted-foreground truncate">
            {description}
          </div>
          
          {/* Mobile diff value */}
          <div className="sm:hidden flex justify-between items-center text-xs text-muted-foreground">
            <span className="truncate">{value}</span>
            {diffMode && diffDisplay && (
              <span className="shrink-0 ml-2 font-mono text-muted-foreground">
                {diffDisplay}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Desktop value and diff */}
      <div className="hidden sm:flex flex-col items-end relative z-10 shrink-0 ml-2">
        <div className="text-sm font-mono font-semibold text-foreground">
          {value}
        </div>
        {diffMode && diffDisplay && (
          <div className={`text-xs font-mono text-muted-foreground`}>
            {diffDisplay}
          </div>
        )}
      </div>
    </div>
  );
}
