
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';
import { useLanguage } from '@/contexts/LanguageContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: t('resetLinkSent'),
        description: t('resetEmailSentDesc'),
      });
    }, 1500);
  };

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 max-w-md py-12">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">{t('resetPassword')}</h1>
            <p className="text-muted-foreground">
              {!isSubmitted 
                ? t('resetPasswordInstructions')
                : t('checkEmailForInstructions')
              }
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('enterYourEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !email}
              >
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? t('sending') : t('sendResetLink')}
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-primary hover:underline inline-flex items-center text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('backToLogin')}
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-primary/10 text-primary p-4 rounded-md text-center">
                {t('ifAccountExists')} <strong>{email}</strong>, {t('youWillReceive')}
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t('didntReceiveEmail')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                  className="w-full"
                >
                  {t('tryAgain')}
                </Button>
                <Link 
                  to="/login" 
                  className="text-primary hover:underline inline-flex items-center text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('backToLogin')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedTransition>
  );
};

export default ForgotPassword;
