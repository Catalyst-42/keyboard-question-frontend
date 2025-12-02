import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type Props = {
  href: string;
  label?: string;
  className?: string;
  'aria-label'?: string;
};

export default function DownloadButton({ href, label, className = '', ...rest }: Props) {
  if (!label) {
    return (
      <Button asChild variant="outline" className={`p-0 ${className}`}>
        <a href={href} download {...rest} className="inline-flex items-center justify-center w-10 h-10">
          <span className="flex items-center justify-center w-6 h-6">
            <Download className="w-4 h-4" />
          </span>
        </a>
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" className={className}>
      <a href={href} download {...rest} className="inline-flex items-center gap-2 px-3 py-2">
        <span className="flex items-center justify-center w-5 h-5">
          <Download className="w-4 h-4" />
        </span>
        <span>{label}</span>
      </a>
    </Button>
  );
}
