
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const NewDiscussionForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically make an API call to save the discussion
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('discussionCreated'),
        description: t('discussionCreatedDesc'),
      });
      
      navigate('/forums');
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('errorCreatingDiscussion'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">{t('discussionTitle')}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={t('enterDiscussionTitle')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">{t('discussionContent')}</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder={t('enterDiscussionContent')}
          className="min-h-[200px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">{t('category')}</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder={t('enterCategory')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">{t('tags')}</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder={t('enterTags')}
        />
        <p className="text-xs text-muted-foreground">{t('separateTagsWithCommas')}</p>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('creating') : t('createDiscussion')}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/forums')}
        >
          {t('cancel')}
        </Button>
      </div>
    </form>
  );
};

export default NewDiscussionForm;
