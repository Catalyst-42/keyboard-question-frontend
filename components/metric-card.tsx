// Interface for metric card props
interface MetricCardProps {
  title: string;
  description: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  min?: number;
  max?: number;
  current?: number;
}

// Metric card component with progress bar
export function MetricCard({ 
  title, 
  description, 
  value, 
  icon: Icon,
  min = 0,
  max = 100,
  current
}: MetricCardProps) {
  // Calculate progress for background
  const progress = current !== undefined ? 
    Math.max(0, Math.min(100, ((current - min) / (max - min)) * 100)) : 
    undefined;

  // Check if current value is extreme (min or max)
  const isExtremeValue = current !== undefined && (current === min || current === max);

  return (
    <div className={`
      relative flex items-center justify-between p-3 rounded-lg bg-muted/30 overflow-hidden
      ${isExtremeValue ? 'ring-2 ring-primary' : ''}
    `}>
      {/* Progress bar as background */}
      {progress !== undefined && (
        <div 
          className="absolute left-0 top-0 h-full bg-primary/10 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}
      
      {/* Content */}
      <div className="flex items-center gap-3 relative z-10">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
      <div className="text-sm font-mono font-semibold relative z-10">
        {value}
      </div>
    </div>
  );
}
