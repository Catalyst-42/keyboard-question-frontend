import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <LayoutDashboard className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Добро пожаловать</CardTitle>
            <CardDescription>
              Система анализа клавиатурных раскладок
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">
              Выберите раздел в боковом меню для начала работы
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
