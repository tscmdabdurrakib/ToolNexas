import { Helmet } from 'react-helmet';
import RepeatString from '@/tools/text-string/repeat-string';

export default function RepeatStringPage() {
  return (
    <>
      <Helmet>
        <title>Repeat a String - Text & String Tools | ToolShaala</title>
        <meta name="description" content="Repeat your text multiple times instantly. Online tool to duplicate strings with customizable repeat count up to 1000 times." />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <p className="text-sm text-muted-foreground">Text & String Tools</p>
          <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Repeat a String
          </h1>
          <p className="text-muted-foreground mt-2">
            Repeat your text multiple times instantly
          </p>
        </div>
        <RepeatString />
      </div>
    </>
  );
}
