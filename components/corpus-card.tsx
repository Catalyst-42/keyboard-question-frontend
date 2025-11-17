import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Corpus } from '@/api';

interface CorpusCardProps {
  corpus: Corpus;
}

export function CorpusCard({ corpus }: CorpusCardProps) {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ru-RU').format(num);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{corpus.name}</CardTitle>
        {corpus.description && (
          <CardDescription>{corpus.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Уникальных символов:</span>
            <div className="text-muted-foreground">
              {formatNumber(corpus.unique_symbols)}
            </div>
          </div>
          <div>
            <span className="font-medium">Общий размер:</span>
            <div className="text-muted-foreground">
              {formatNumber(corpus.size)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}