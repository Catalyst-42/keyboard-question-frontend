interface MetricCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  min?: number;
  max?: number;
  current?: number;
  diffMode?: boolean;
  referenceValue?: number;
  moreIsWorse?: boolean;
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
  referenceValue,
  moreIsWorse = false
}: MetricCardProps) {
  const progress = current !== undefined ? 
    Math.max(0, Math.min(1, ((current - min) / (max - min)))) : 
    undefined;

  const isMinValue = current !== undefined && current === min;
  const isMaxValue = current !== undefined && current === max;
  const isExtremeValue = isMinValue || isMaxValue;

  const diffValue = diffMode && current !== undefined && referenceValue !== undefined ? 
    current - referenceValue : 0;

  const getExtremeColor = () => {
    if (!isExtremeValue) return '';
    
    if (isMinValue) {
      return moreIsWorse ? 'ring-2 ring-green-500' : 'ring-2 ring-red-500';
    }
    
    if (isMaxValue) {
      return moreIsWorse ? 'ring-2 ring-red-500' : 'ring-2 ring-green-500';
    }
    
    return 'ring-2 ring-primary';
  };

  const getProgressBarColor = () => {
    if (!diffMode || diffValue === 0) return 'bg-primary/15';
    
    const shouldBeGreen = moreIsWorse ? diffValue < 0 : diffValue > 0;
    return shouldBeGreen ? 'bg-green-500/20' : 'bg-red-500/20';
  };

  const formatDiffValue = () => {
    if (!diffMode || diffValue === 0) return null;
    
    const absDiff = Math.abs(diffValue);
    const sign = diffValue > 0 ? '+' : '-';
    
    if (current !== undefined && current <= 1 && referenceValue !== undefined && referenceValue <= 1) {
      return `${sign}${(absDiff * 100).toFixed(1)}%`;
    }
    
    return `${sign}${absDiff.toFixed(1)}u`;
  };

  const diffDisplay = formatDiffValue();

  const getDiffColorClass = () => {
    if (!diffMode || diffValue === 0) return 'text-muted-foreground';
    
    const shouldBeGreen = moreIsWorse ? diffValue < 0 : diffValue > 0;
    return shouldBeGreen ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={`
      relative flex items-center justify-between p-3 rounded-lg bg-muted/30 overflow-hidden
      ${getExtremeColor()}
    `}>
      {progress !== undefined && (
        <div 
          className={`absolute left-0 top-0 h-full transition-all duration-300 ${getProgressBarColor()}`}
          style={{ width: `${progress * 100}%` }}
        />
      )}

      <div className="flex items-center gap-3 relative z-10 flex-1 min-w-0">
        <Icon className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate">{title}</div>
          
          <div className="hidden sm:block text-xs text-muted-foreground truncate">
            {description}
          </div>
          
          <div className="sm:hidden flex justify-between items-center text-xs text-muted-foreground">
            <span className="truncate">{value}</span>
            {diffMode && diffDisplay && (
              <span className={`shrink-0 ml-2 font-mono ${getDiffColorClass()}`}>
                {diffDisplay}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden sm:flex flex-col items-end relative z-10 shrink-0 ml-2">
        <div className="text-sm font-mono font-semibold text-foreground">
          {value}
        </div>
        {diffMode && diffDisplay && (
          <div className={`text-xs font-mono`}>
            {diffDisplay}
          </div>
        )}
      </div>
    </div>
  );
}
