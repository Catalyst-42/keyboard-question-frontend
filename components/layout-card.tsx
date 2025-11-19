import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, LayoutPreview } from '@/api';
import { Keyboard, FileText } from 'lucide-react';
import Link from 'next/link';

interface LayoutCardProps {
  layout: Layout;
  previews?: LayoutPreview[];
}

export function LayoutCard({ layout, previews }: LayoutCardProps) {
  const layoutPreviews = previews?.filter(preview => preview.layout === layout.id) || [];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link 
            href={`/layouts/${layout.id}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <Keyboard className="h-5 w-5" />
            {layout.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>Язык: {layout.language}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {layout.description && (
          <p className="text-sm text-muted-foreground">
            {layout.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-sm">
          <FileText className="h-4 w-4" />
          <span>Модель: {layout.layout_model.split('/').pop()}</span>
        </div>

        {layoutPreviews.length > 0 && (
          <div className="text-sm text-muted-foreground">
            Доступно превью: {layoutPreviews.length} шт.
          </div>
        )}

        {/* Ссылка на детальную страницу */}
        <div className="pt-2">
          <Link 
            href={`/layouts/${layout.id}`}
            className="text-sm text-primary hover:underline"
          >
            Подробнее →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}