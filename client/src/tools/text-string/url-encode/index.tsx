import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const URLEncodeTool = () => {
  const [inputText, setInputText] = useState<string>('');
  const [encodedText, setEncodedText] = useState<string>('');
  const { toast } = useToast();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    setEncodedText(encodeURIComponent(value));
  }, []);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(encodedText);
    toast({
      title: 'Copied!',
      description: 'Encoded URL copied to clipboard.',
    });
  }, [encodedText, toast]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>URL Encode Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter text to URL encode..."
            value={inputText}
            onChange={handleInputChange}
            className="min-h-[150px] resize-y"
          />
        </CardContent>
      </Card>

      <Card className="w-full mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Encoded Output</CardTitle>
          <Button onClick={handleCopyClick} disabled={!encodedText}>
            <Copy className="mr-2 h-4 w-4" /> Copy Result
          </Button>
        </CardHeader>
        <CardContent>
          <Textarea
            value={encodedText}
            readOnly
            className="min-h-[150px] resize-y bg-muted"
            placeholder="Encoded URL will appear here..."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default URLEncodeTool;