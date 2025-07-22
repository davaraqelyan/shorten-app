import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'lucide-react';
import { ANIMATION_DELAYS } from '@/constants/landing';

interface UrlShortenerFormProps {
  placeholder: string;
  buttonText: string;
  disclaimer: string;
  onSubmit?: (url: string) => void;
}

export function UrlShortenerForm({ 
  placeholder, 
  buttonText, 
  disclaimer,
  onSubmit 
}: UrlShortenerFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim() && onSubmit) {
      onSubmit(url.trim());
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ANIMATION_DELAYS.form }}
    >
      <Card className="border-0 shadow-2xl shadow-blue-500/10 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={placeholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-14 text-lg border-0 bg-muted/30 focus:bg-background transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
            <Button 
              size="lg" 
              onClick={handleSubmit}
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
            >
              <Link className="mr-2 h-5 w-5" />
              {buttonText}
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {disclaimer}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}