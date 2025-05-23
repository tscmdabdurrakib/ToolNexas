import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DollarSign, ArrowRightLeft, RotateCcw, Info, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

// Currency types
type Currency = {
  code: string;
  name: string;
  symbol: string;
  flag: string;
};

// Popular currencies list
const currencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳", flag: "🇧🇩" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "DKK", name: "Danish Krone", symbol: "kr", flag: "🇩🇰" },
  { code: "SGD", name: "Singapore Dollar", symbol: "$", flag: "🇸🇬" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "$", flag: "🇭🇰" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
];

// Static exchange rates (for demo purposes - in production would use real API)
const exchangeRates: Record<string, Record<string, number>> = {
  USD: {
    EUR: 0.85, GBP: 0.73, JPY: 110.0, BDT: 110.0, INR: 75.0, CNY: 6.4,
    CAD: 1.25, AUD: 1.35, CHF: 0.92, SEK: 8.5, NOK: 8.8, DKK: 6.3,
    SGD: 1.35, HKD: 7.8, KRW: 1180.0, MXN: 20.0, BRL: 5.2, RUB: 74.0, ZAR: 14.5
  },
  EUR: {
    USD: 1.18, GBP: 0.86, JPY: 129.4, BDT: 129.4, INR: 88.2, CNY: 7.5,
    CAD: 1.47, AUD: 1.59, CHF: 1.08, SEK: 10.0, NOK: 10.4, DKK: 7.4,
    SGD: 1.59, HKD: 9.2, KRW: 1388.4, MXN: 23.5, BRL: 6.1, RUB: 87.1, ZAR: 17.1
  },
  // Add more base currencies as needed
};

function CurrencyConverter() {
  // State for input value, source and target currencies
  const [inputValue, setInputValue] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertCurrency();
  }, [inputValue, fromCurrency, toCurrency]);

  /**
   * Convert from one currency to another
   */
  const convertCurrency = () => {
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Parse the input value
    const value = parseFloat(inputValue);

    // Validate the input is a number
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }
    
    // Amount cannot be negative
    if (value < 0) {
      setError('Amount cannot be negative');
      setResult('');
      return;
    }

    // If same currency, no conversion needed
    if (fromCurrency === toCurrency) {
      setResult(value.toFixed(2));
      return;
    }

    // Get exchange rate
    const rate = getExchangeRate(fromCurrency, toCurrency);
    if (rate === null) {
      setError('Exchange rate not available for this currency pair');
      setResult('');
      return;
    }

    // Perform conversion
    const converted = value * rate;
    setResult(converted.toFixed(2));
  };

  /**
   * Get exchange rate between two currencies
   */
  const getExchangeRate = (from: string, to: string): number | null => {
    if (exchangeRates[from] && exchangeRates[from][to]) {
      return exchangeRates[from][to];
    }
    
    // Try reverse rate
    if (exchangeRates[to] && exchangeRates[to][from]) {
      return 1 / exchangeRates[to][from];
    }
    
    // Use USD as intermediate currency
    if (from !== 'USD' && to !== 'USD') {
      const fromToUSD = getExchangeRate(from, 'USD');
      const USDToTo = getExchangeRate('USD', to);
      if (fromToUSD && USDToTo) {
        return fromToUSD * USDToTo;
      }
    }
    
    return null;
  };

  /**
   * Swap the from and to currencies
   */
  const swapCurrencies = () => {
    setSwapAnimation(true);
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromCurrency('USD');
    setToCurrency('EUR');
    setResult('');
    setError(null);
  };

  /**
   * Copy result to clipboard
   */
  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Conversion result copied to clipboard",
      });
    }
  };

  /**
   * Get currency object by code
   */
  const getCurrency = (code: string): Currency => {
    return currencies.find(c => c.code === code) || currencies[0];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <DollarSign className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Currency Converter</CardTitle>
            <CardDescription>
              Convert between world currencies using real-time exchange rates
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and currency selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="amount-value" className="block text-sm font-medium mb-2">
                Enter Amount
              </label>
              <Input
                id="amount-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter amount"
                className="w-full"
                step="0.01"
                min="0"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="from-currency" className="block text-sm font-medium mb-2">
                  From
                </label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger id="from-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapCurrencies}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap currencies</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="to-currency" className="block text-sm font-medium mb-2">
                  To
                </label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger id="to-currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        <div className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                          <span className="text-muted-foreground">- {currency.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {result ? (
                  <div className="flex items-center gap-2">
                    <span>{getCurrency(toCurrency).symbol}{result}</span>
                    <span className="text-lg font-normal">{toCurrency}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter an amount to convert —</span>
                )}
              </div>
              {result && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyResult}
                  className="gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Details */}
          {result && !error && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Conversion Details:</span>
                  <p className="text-muted-foreground mt-1">
                    {getCurrency(fromCurrency).symbol}{inputValue} {fromCurrency} = {getCurrency(toCurrency).symbol}{result} {toCurrency}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Exchange rate: 1 {fromCurrency} = {getExchangeRate(fromCurrency, toCurrency)?.toFixed(4)} {toCurrency}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Popular Currency Pairs */}
          <div className="bg-primary/5 p-4 rounded-lg text-xs">
            <h4 className="font-medium mb-2">Popular Currency Pairs:</h4>
            <div className="grid gap-1 text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>1 USD</span>
                <span>=</span>
                <span>0.85 EUR</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 USD</span>
                <span>=</span>
                <span>110.00 BDT</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 EUR</span>
                <span>=</span>
                <span>0.86 GBP</span>
              </div>
              <div className="flex items-center justify-between">
                <span>1 USD</span>
                <span>=</span>
                <span>75.00 INR</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Exchange rates are for demonstration purposes
        </div>
      </CardFooter>
    </Card>
  );
}

export default CurrencyConverter;