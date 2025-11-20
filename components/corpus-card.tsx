import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Corpus } from '@/api';
import { BookText, Languages } from 'lucide-react';
import Link from 'next/link';

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
        <CardTitle className="text-lg">
          <Link 
            href={`/corpora/${corpus.id}`}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <BookText className="h-5 w-5" />
            {corpus.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <span>Язык: {corpus.language}</span>
        </CardDescription>
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

        {/* Ссылка на детальную страницу */}
        <div className="pt-3">
          <Link 
            href={`/corpora/${corpus.id}`}
            className="text-sm text-primary hover:underline"
          >
            Подробнее →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}