// Interface for metric card props
interface MetricCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  min?: number;
  max?: number;
  current?: number;
  // Diff mode props
  diffMode?: boolean;
  referenceValue?: number;
}

// Metric card component with progress bar and diff support
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
  // Calculate progress for background
  const progress = current !== undefined ? 
    Math.max(0, Math.min(1, ((current - min) / (max - min)))) : 
    undefined;

  // Check if current value is extreme (min or max)
  const isExtremeValue = current !== undefined && (current === min || current === max);

  // Calculate diff values
  const diffValue = diffMode && current !== undefined && referenceValue !== undefined ? 
    current - referenceValue : 0;
  
  const diffPercentage = diffMode && referenceValue !== undefined && referenceValue !== 0 ? 
    ((diffValue / referenceValue) * 100) : 0;

  // Determine background color based on diff
  const getProgressBarColor = () => {
    if (!diffMode || diffValue === 0) return 'bg-primary/15'; // Default blue for equal values/no diff
    return diffValue > 0 ? 'bg-green-500/20' : 'bg-red-500/20';
  };

  // Format diff value for display
  const formatDiffValue = () => {
    if (!diffMode || diffValue === 0) return null;
    
    const absDiff = Math.abs(diffValue);
    const sign = diffValue > 0 ? '+' : '-';
    
    // Check if it's a percentage value (between 0 and 1)
    if (current !== undefined && current <= 1 && referenceValue !== undefined && referenceValue <= 1) {
      return `${sign}${formatPercentage(absDiff)}`;
    }
    
    // For distance values
    return `${sign}${absDiff.toFixed(1)}u`;
  };

  // Helper function to format percentage (similar to your existing formatPercentage)
  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  return (
    <div className={`
      relative flex items-center justify-between p-3 rounded-lg bg-muted/30 overflow-hidden
      ${isExtremeValue ? 'ring-2 ring-primary' : ''}
    `}>
      {/* Progress bar as background with diff-based color */}
      {progress !== undefined && (
        <div 
          className={`absolute left-0 top-0 h-full transition-all duration-300 ${getProgressBarColor()}`}
          style={{ width: `${progress * 100}%` }}
        />
      )}

      {/* Content */}
      <div className="flex items-center gap-3 relative z-10 flex-1 min-w-0">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{title}</div>
          <div className="text-xs text-muted-foreground truncate">{description}</div>
        </div>
      </div>
      
      {/* Value section */}
      <div className="flex flex-col items-end relative z-10 shrink-0 ml-2">
        <div className="text-sm font-mono font-semibold text-foreground">
          {value}
        </div>
        {/* Diff value - only shown in diff mode when there's a difference */}
        {diffMode && diffValue !== 0 && (
          <div className="text-xs text-muted-foreground font-mono">
            {formatDiffValue()}
          </div>
        )}
      </div>
    </div>
  );
}
