import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ParonymPair {
  id: number;
  word1: string;
  word2: string;
  definition1: string;
  definition2: string;
  examples: {
    word1: string[];
    word2: string[];
  };
}

const paronyms: ParonymPair[] = [
  {
    id: 1,
    word1: 'эффектный',
    word2: 'эффективный',
    definition1: 'производящий впечатление, эффект',
    definition2: 'дающий результат, действенный',
    examples: {
      word1: [
        'Артист вышел на сцену в эффектном костюме.',
        'Её эффектная внешность привлекала внимание.',
        'Финал спектакля был очень эффектным.'
      ],
      word2: [
        'Мы выбрали эффективный метод обучения.',
        'Это лекарство оказалось эффективным.',
        'Команда разработала эффективную стратегию.'
      ]
    }
  },
  {
    id: 2,
    word1: 'адресат',
    word2: 'адресант',
    definition1: 'получатель письма, посылки',
    definition2: 'отправитель письма, посылки',
    examples: {
      word1: [
        'Адресат не получил письмо вовремя.',
        'Укажите адресата на конверте.',
        'Посылка была доставлена адресату.'
      ],
      word2: [
        'Адресант не указал обратный адрес.',
        'Письмо вернулось к адресанту.',
        'Данные адресанта обязательны для заполнения.'
      ]
    }
  },
  {
    id: 3,
    word1: 'абонент',
    word2: 'абонемент',
    definition1: 'лицо, пользующееся услугами',
    definition2: 'документ на право пользования',
    examples: {
      word1: [
        'Абонент недоступен, попробуйте позже.',
        'Каждый абонент получил уведомление.',
        'Абонент может изменить тариф.'
      ],
      word2: [
        'Я купил абонемент в бассейн на месяц.',
        'Абонемент действует до конца года.',
        'Годовой абонемент стоит дешевле.'
      ]
    }
  },
  {
    id: 4,
    word1: 'невежа',
    word2: 'невежда',
    definition1: 'грубый, невоспитанный человек',
    definition2: 'малообразованный, необразованный человек',
    examples: {
      word1: [
        'Какой невежа — даже не поздоровался!',
        'Не будь невежей, уступи место.',
        'Его невежливое поведение всех возмутило.'
      ],
      word2: [
        'В этом вопросе я полный невежда.',
        'Невежда не знает элементарных вещей.',
        'Не будь невеждой — читай больше книг.'
      ]
    }
  },
  {
    id: 5,
    word1: 'представить',
    word2: 'предоставить',
    definition1: 'показать, познакомить, вообразить',
    definition2: 'дать возможность, право пользоваться',
    examples: {
      word1: [
        'Представьте себе эту картину.',
        'Позвольте представить вам моего коллегу.',
        'Трудно представить такое развитие событий.'
      ],
      word2: [
        'Компания предоставила нам скидку.',
        'Предоставьте документы в срок.',
        'Банк предоставил кредит на выгодных условиях.'
      ]
    }
  },
  {
    id: 6,
    word1: 'надеть',
    word2: 'одеть',
    definition1: 'натянуть одежду на себя',
    definition2: 'облечь кого-то в одежду',
    examples: {
      word1: [
        'Я надела новое платье на вечеринку.',
        'Надень шапку, на улице холодно.',
        'Он надел очки, чтобы прочитать текст.'
      ],
      word2: [
        'Мама одела ребёнка в тёплую куртку.',
        'Одеть куклу в красивое платье.',
        'Бабушка одела внуков перед прогулкой.'
      ]
    }
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPair, setSelectedPair] = useState<ParonymPair | null>(null);

  const filteredParonyms = paronyms.filter(
    (pair) =>
      pair.word1.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pair.word2.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-4">
            📚 Словарь паронимов
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Научитесь различать похожие слова с разными значениями. 
            Примеры от искусственного интеллекта помогут запомнить разницу.
          </p>
        </header>

        <div className="mb-8 animate-scale-in">
          <div className="relative max-w-2xl mx-auto">
            <Icon 
              name="Search" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" 
              size={20} 
            />
            <Input
              type="text"
              placeholder="Найти пароним (например: эффектный, адресат)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg shadow-lg border-2 focus:border-primary transition-all"
            />
          </div>
          
          {searchQuery && (
            <p className="text-center mt-4 text-sm text-muted-foreground">
              Найдено пар: <span className="font-semibold text-primary">{filteredParonyms.length}</span>
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredParonyms.map((pair, index) => (
            <Card 
              key={pair.id} 
              className="cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-primary animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPair(pair)}
            >
              <CardHeader className="bg-gradient-to-br from-primary/10 to-secondary/10 pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    #{pair.id}
                  </Badge>
                  <Icon name="BookOpen" size={20} className="text-primary" />
                </div>
                <CardTitle className="text-2xl font-heading text-primary flex items-center gap-2">
                  {pair.word1}
                  <span className="text-muted-foreground">—</span>
                  {pair.word2}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm text-primary mb-1">{pair.word1}:</p>
                    <p className="text-sm text-foreground/80">{pair.definition1}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-secondary mb-1">{pair.word2}:</p>
                    <p className="text-sm text-foreground/80">{pair.definition2}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <Icon name="Sparkles" size={14} className="mr-1" />
                  Нажмите для примеров
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPair && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setSelectedPair(null)}
          >
            <Card 
              className="max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <CardHeader className="bg-gradient-to-br from-primary/20 to-secondary/20">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-heading text-primary mb-2">
                      {selectedPair.word1} — {selectedPair.word2}
                    </CardTitle>
                    <CardDescription className="text-base">
                      Примеры использования от ИИ
                    </CardDescription>
                  </div>
                  <button 
                    onClick={() => setSelectedPair(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-8">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary text-white text-base px-3 py-1">
                      {selectedPair.word1}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{selectedPair.definition1}</p>
                  </div>
                  <div className="space-y-2">
                    {selectedPair.examples.word1.map((example, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <Icon name="CheckCircle2" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-secondary text-white text-base px-3 py-1">
                      {selectedPair.word2}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{selectedPair.definition2}</p>
                  </div>
                  <div className="space-y-2">
                    {selectedPair.examples.word2.map((example, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-3 bg-secondary/5 rounded-lg hover:bg-secondary/10 transition-colors"
                      >
                        <Icon name="CheckCircle2" size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                        <p className="text-sm leading-relaxed">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {filteredParonyms.length === 0 && searchQuery && (
          <div className="text-center py-12 animate-fade-in">
            <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground">
              Паронимы не найдены. Попробуйте другой запрос.
            </p>
          </div>
        )}

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Всего в словаре: <span className="font-semibold text-primary">{paronyms.length}</span> пар паронимов</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
