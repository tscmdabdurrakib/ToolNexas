import { useEffect } from "react";
import LengthConverter from "@/tools/unit-conversion/length-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Ruler, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function LengthConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/unit-conversion">Unit Conversion Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium">Length Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Ruler className="h-6 w-6 text-primary" />
            <span>Length Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Quickly and accurately convert between different units of length and distance.
            Supports metric (meters, centimeters) and imperial (feet, inches) measurements.
          </p>
        </div>

        {/* The Converter Tool */}
        <LengthConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">About Length Conversion</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Conversions</CardTitle>
                  <CardDescription>Popular unit conversions people search for</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="flex items-center">
                      <span className="font-medium">1 meter</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>3.28084 feet</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 inch</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>2.54 cm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 kilometer</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>0.621371 miles</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 foot</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>30.48 cm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 yard</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>0.9144 meters</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">1 mile</span>
                      <ArrowRight className="h-3 w-3 mx-2" />
                      <span>1.60934 km</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Length Units Explained</CardTitle>
                  <CardDescription>Understanding different measurement systems</CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2 text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Metric System:</span> Based on powers of 10. The 
                    base unit is the meter, with prefixes like kilo- (1000×), centi- (1/100), and milli- (1/1000).
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Imperial/US System:</span> Traditional units like 
                    inch, foot, yard, and mile. Used primarily in the United States and a few other countries.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">SI Unit:</span> The International System of Units 
                    recognizes the meter (m) as the standard unit for measuring length.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">How to Use the Length Converter</h2>
            <div className="prose max-w-none text-muted-foreground">
              <ol className="space-y-2 ml-5 list-decimal">
                <li><span className="text-foreground font-medium">Enter the value</span> you want to convert in the input field.</li>
                <li><span className="text-foreground font-medium">Select the source unit</span> from the "From" dropdown (meter, inch, etc.).</li>
                <li><span className="text-foreground font-medium">Select the target unit</span> from the "To" dropdown (the unit you want to convert to).</li>
                <li>View the <span className="text-foreground font-medium">accurate conversion result</span> displayed instantly.</li>
                <li>Use the <span className="text-foreground font-medium">swap button</span> to quickly reverse the conversion.</li>
                <li>Click <span className="text-foreground font-medium">Reset</span> to clear all fields and start a new conversion.</li>
              </ol>
              <p className="mt-4">
                All calculations are performed instantly and with high precision. For very large or very small numbers, 
                scientific notation may be used for better readability.
              </p>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Applications of Length Conversion</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Construction & Architecture</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Used for converting measurements in building plans, especially when working with international 
                  specifications or materials from different systems.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Science & Engineering</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Precise length conversions are crucial in scientific research, engineering projects, and 
                  when working with international collaborators.
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">Travel & Navigation</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                  Converting between miles and kilometers for travel distances, or understanding height 
                  restrictions in different measurement systems.
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-8 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Did You Know?</h2>
            <ul className="space-y-3 ml-5 list-disc text-muted-foreground">
              <li>
                The <span className="font-medium text-foreground">meter</span> was originally defined as one ten-millionth
                of the distance from the North Pole to the Equator.
              </li>
              <li>
                The <span className="font-medium text-foreground">inch</span> was historically based on the width of a human thumb.
              </li>
              <li>
                The <span className="font-medium text-foreground">mile</span> comes from the Latin "mille passus" meaning "thousand paces,"
                with a pace being two steps.
              </li>
              <li>
                The <span className="font-medium text-foreground">metric system</span> is used by over 95% of the world's population.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}