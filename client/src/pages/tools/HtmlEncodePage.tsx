import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import HtmlEncode from "@/tools/text-string/html-encode/index";

export default function HtmlEncodePage() {
  useEffect(() => {
    document.title = "HTML Encode | Convert Text to HTML-Safe Format - Solvezyo";
  }, []);
  
  return (
    <>
      <div className="container max-w-5xl py-6 md:py-10">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="p-0 mb-2 h-auto" asChild>
              <div className="flex items-center text-muted-foreground text-sm font-normal hover:text-primary">
                <ArrowLeft className="mr-1 h-3.5 w-3.5" />
                <span>Back to home</span>
              </div>
            </Button>
          </Link>
          
          <div className="flex items-center space-x-2 mb-1">
            <Link href="/category/text-string">
              <Badge variant="outline" className="text-xs font-medium">
                Text & String Tools
              </Badge>
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-2">HTML Encode</h1>
          <p className="text-lg text-muted-foreground">Convert text to HTML-safe encoded format</p>
        </div>

        <div className="grid gap-8 mb-10">
          <HtmlEncode />
        </div>

        <div className="grid gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">What is HTML Encoding?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                HTML encoding (HTML escaping) converts special HTML characters into their corresponding HTML entities. This prevents browsers from interpreting these characters as HTML code, making it safe to display user input or code snippets on web pages.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">When to Use HTML Encoding:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>Displaying user-generated content safely (prevent XSS attacks)</li>
                  <li>Showing code examples on web pages</li>
                  <li>Escaping special characters in HTML attributes</li>
                  <li>Converting text for email templates</li>
                  <li>Creating secure web forms</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Common HTML Entities:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                  <li>&lt; → &amp;lt;</li>
                  <li>&gt; → &amp;gt;</li>
                  <li>&amp; → &amp;amp;</li>
                  <li>&quot; → &amp;quot;</li>
                  <li>&apos; → &amp;apos; or &amp;#39;</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link href="/tools/html-decode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                HTML Decode
              </Button>
            </Link>
            <Link href="/tools/url-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                URL Encode
              </Button>
            </Link>
            <Link href="/tools/base64-encode">
              <Button variant="outline" className="w-full justify-start h-auto py-2">
                Base64 Encode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
