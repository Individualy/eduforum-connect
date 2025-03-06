
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import NewDiscussionForm from '@/components/forum/NewDiscussionForm';
import { useLanguage } from '@/contexts/LanguageContext';

const NewDiscussion = () => {
  const { t } = useLanguage();
  
  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">{t('newDiscussion')}</h1>
        <p className="text-muted-foreground mb-8">{t('newDiscussionDesc')}</p>
        <NewDiscussionForm />
      </div>
    </AnimatedTransition>
  );
};

export default NewDiscussion;
