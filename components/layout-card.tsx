import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, LayoutPreview } from '@/api';
import { Keyboard, FileText, Languages } from 'lucide-react';
import Link from 'next/link';

interface LayoutCardProps {
  layout: Layout;
  previews?: LayoutPreview[];
}

export function LayoutCard({ layout, previews }: LayoutCardProps) {
  const layoutPreviews = previews?.filter(preview => preview.layout === layout.id) || [];

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          <Link 
            href={`/layouts/${layout.id}`}
            className="hover:text-primary transition-colors flex items-center gap-2"
          >
            <Keyboard className="h-5 w-5" />
            {layout.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Languages className="h-4 w-4" />
            {layout.language}
          </span>
          {layoutPreviews.length > 0 && (
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {layoutPreviews.length} превью
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2 flex-1">
            {layout.description && (
              <p className="text-muted-foreground">
                {layout.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Модель: {layout.layout_model.split('/').pop()}</span>
            </div>
          </div>
          
          <Link 
            href={`/layouts/${layout.id}`}
            className="text-primary hover:underline inline-flex items-center gap-1 self-start md:self-center"
          >
            Подробнее →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}