
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AnimatedTransition from '@/components/ui/AnimatedTransition';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password reset requested for:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Verification code sent",
        description: "Please check your email for the 8-digit verification code.",
      });
      // Navigate to verification code page after a brief delay
      setTimeout(() => {
        navigate('/verify-code');
      }, 1500);
    }, 1500);
  };

  return (
    <AnimatedTransition>
      <div className="container mx-auto px-4 max-w-md py-12">
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {!isSubmitted 
                ? "Enter your email to receive a verification code" 
                : "Check your email for the verification code"
              }
            </p>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
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
                {isSubmitting ? "Sending..." : "Send Verification Code"}
              </Button>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-primary hover:underline inline-flex items-center text-sm"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="bg-primary/10 text-primary p-4 rounded-md text-center">
                If an account exists with <strong>{email}</strong>, you will receive
                a verification code shortly.
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button 
                  onClick={() => navigate('/verify-code')}
                  className="w-full"
                >
                  Enter Verification Code
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Different Email
                </Button>
                
                <Link 
                  to="/login" 
                  className="text-primary hover:underline inline-flex items-center justify-center text-sm mt-2"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to login
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
