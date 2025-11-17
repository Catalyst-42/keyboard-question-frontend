import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout, LayoutPreview } from '@/api';
import { Keyboard, FileText } from 'lucide-react';

interface LayoutCardProps {
  layout: Layout;
  previews?: LayoutPreview[];
}

export function LayoutCard({ layout, previews }: LayoutCardProps) {
  // Находим превью для этой раскладки
  const layoutPreviews = previews?.filter(preview => preview.layout === layout.id) || [];

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Keyboard className="h-5 w-5" />
          {layout.name}
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
            Превью: {layoutPreviews.length} шт.
          </div>
        )}
      </CardContent>
    </Card>
  );
}