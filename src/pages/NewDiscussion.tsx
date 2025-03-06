
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import NewDiscussionForm from '@/components/forum/NewDiscussionForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewDiscussion = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{t('newDiscussion')}</h1>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-muted-foreground">{t('newDiscussionDesc')}</p>
        </div>
        
        <Alert className="mb-6 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
          <AlertDescription>
            {t('discussionGuidelines')}
          </AlertDescription>
        </Alert>
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border p-6">
          <NewDiscussionForm />
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default NewDiscussion;
