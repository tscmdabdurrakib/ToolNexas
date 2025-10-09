import { Helmet } from 'react-helmet';
import RemoveAllWhitespace from '@/tools/text-string/remove-all-whitespace';

export default function RemoveAllWhitespacePage() {
  return (
    <>
      <Helmet>
        <title>Remove All Whitespace - Text & String Tools | Solvezyo</title>
        <meta name="description" content="Remove all spaces, tabs, newlines, and whitespace characters from text instantly. Online tool for text compression and cleanup." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
            Remove All Whitespace
          </h1>
          <p className="text-muted-foreground mt-2">
            Remove all spaces, tabs, newlines, and other whitespace characters
          </p>
        </div>
        <RemoveAllWhitespace />
      </div>
    </>
  );
}
