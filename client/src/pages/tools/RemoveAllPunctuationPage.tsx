import { Helmet } from 'react-helmet';
import RemoveAllPunctuation from '@/tools/text-string/remove-all-punctuation';

export default function RemoveAllPunctuationPage() {
  return (
    <>
      <Helmet>
        <title>Remove All Punctuation - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all punctuation marks from text instantly. Online tool for text cleanup and data processing." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Remove All Punctuation
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all punctuation marks while preserving letters, numbers, and spaces
          </p>
        </div>
        <RemoveAllPunctuation />
      </div>
    </>
  );
}
