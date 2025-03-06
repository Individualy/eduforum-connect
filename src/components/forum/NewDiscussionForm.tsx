
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from '@/components/ui/select';
import { Tag, X, Info, MessageSquarePlus } from 'lucide-react';

const NewDiscussionForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });
  
  // Add state for tags management
  const [tagInput, setTagInput] = useState('');
  const [tagsList, setTagsList] = useState<string[]>([]);

  const addTag = () => {
    if (tagInput.trim() && !tagsList.includes(tagInput.trim()) && tagsList.length < 5) {
      setTagsList([...tagsList, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagsList(tagsList.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const categories = [
    { value: 'general', label: t('categoryGeneral') },
    { value: 'questions', label: t('categoryQuestions') },
    { value: 'announcements', label: t('categoryAnnouncements') },
    { value: 'feedback', label: t('categoryFeedback') },
    { value: 'help', label: t('categoryHelp') }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare final form data with tags
    const finalData = {
      ...formData,
      tags: tagsList.join(',')
    };

    try {
      // Here you would typically make an API call to save the discussion
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('discussionCreated'),
        description: t('discussionCreatedDesc'),
      });
      
      // Simulate notification creation
      const event = new CustomEvent('newNotification', {
        detail: {
          title: t('newDiscussionCreated'),
          message: finalData.title
        }
      });
      document.dispatchEvent(event);
      
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
        <Label htmlFor="title" className="text-base font-medium">{t('discussionTitle')}</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder={t('enterDiscussionTitle')}
          className="text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category" className="text-base font-medium">{t('category')}</Label>
        <Select 
          value={formData.category}
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-base font-medium">{t('discussionContent')}</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder={t('enterDiscussionContent')}
          className="min-h-[200px] text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags" className="text-base font-medium flex items-center gap-1">
          <Tag className="h-4 w-4" />
          {t('tags')} 
          <span className="text-xs text-muted-foreground ml-2">({t('optional')})</span>
        </Label>
        
        <div className="flex gap-2">
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('enterTagAndPressEnter')}
            className="flex-grow"
          />
          <Button 
            type="button" 
            onClick={addTag} 
            variant="outline"
            disabled={tagsList.length >= 5}
          >
            {t('add')}
          </Button>
        </div>
        
        {tagsList.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tagsList.map((tag) => (
              <div key={tag} className="bg-muted px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Info className="h-3 w-3" />
          {t('maxFiveTags')}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="gap-2"
        >
          <MessageSquarePlus className="h-4 w-4" />
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
