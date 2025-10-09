import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation refs
  const gear1Ref = useRef<SVGGElement>(null);
  const gear2Ref = useRef<SVGGElement>(null);
  const pulleyRef = useRef<SVGGElement>(null);
  const weightRef = useRef<SVGGElement>(null);
  const leverRef = useRef<SVGGElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);
  const buttonTopRef = useRef<SVGRectElement>(null);

  // Animation state tracking
  const emailAnimationActive = useRef(false);
  const passwordAnimationActive = useRef(false);

  // Stage 1: Email input animation - Gears rotate
  useEffect(() => {
    if (email && !emailAnimationActive.current) {
      emailAnimationActive.current = true;
      gsap.to(gear1Ref.current, {
        rotation: 360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(gear2Ref.current, {
        rotation: -360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
    } else if (!email && emailAnimationActive.current) {
      emailAnimationActive.current = false;
      gsap.killTweensOf([gear1Ref.current, gear2Ref.current]);
      gsap.to([gear1Ref.current, gear2Ref.current], {
        rotation: 0,
        duration: 0.5,
      });
    }
  }, [email]);

  // Stage 2: Password input animation - Pulley system activates
  useEffect(() => {
    if (password && email && !passwordAnimationActive.current) {
      passwordAnimationActive.current = true;
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(weightRef.current, {
        y: -60,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    } else if (!password && passwordAnimationActive.current) {
      passwordAnimationActive.current = false;
      gsap.killTweensOf([pulleyRef.current, weightRef.current]);
      gsap.to([pulleyRef.current, weightRef.current], {
        rotation: 0,
        y: 0,
        duration: 0.5,
      });
    }
  }, [password, email]);

  // Stage 3: Submit - Final animation sequence
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    // Kill existing animations
    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, pulleyRef.current, weightRef.current]);

    // Final animation sequence
    const finalTimeline = gsap.timeline();

    // Lever activates
    finalTimeline.to(leverRef.current, {
      rotation: -35,
      transformOrigin: 'center',
      duration: 0.6,
      ease: 'power2.out',
    });

    // Bottle tips
    finalTimeline.to(
      bottleRef.current,
      {
        rotation: 60,
        transformOrigin: 'bottom right',
        duration: 0.7,
      },
      '-=0.2'
    );

    // Liquid flows
    finalTimeline.to(
      liquidRef.current,
      {
        opacity: 1,
        scaleY: 1.5,
        duration: 0.5,
      },
      '-=0.3'
    );

    // Drop falls
    finalTimeline.to(
      dropRef.current,
      {
        y: 100,
        opacity: 0,
        duration: 0.8,
        yoyo: true,
      },
      '-=0.5'
    );

    // Button press
    finalTimeline.to(
      buttonTopRef.current,
      {
        y: 8,
        duration: 0.3,
      },
      '-=0.2'
    );

    // Celebration - gears spin fast
    finalTimeline.to(
      [gear1Ref.current, gear2Ref.current, pulleyRef.current],
      {
        rotation: '+=720',
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.1'
    );

    // Actual login
    setLoading(true);
    try {
      await login(email, password);
      toast({
        title: 'Success!',
        description: 'Logged in successfully',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        variant: 'destructive',
      });
      // Reset animations on error
      gsap.to([leverRef.current, bottleRef.current, liquidRef.current, dropRef.current, buttonTopRef.current], {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Welcome Back</h1>
            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 drop-shadow">Fill the form to activate the Rube Goldberg machine</p>
        </div>

        {/* Glass morphism container */}
        <form onSubmit={handleSubmit}>
        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-login" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-login)" />
            </svg>
          </div>

          {/* Mechanical Diagram with Integrated Form */}
          <svg className="w-full h-[600px]" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Top Section - Colorful Gears (Email Trigger) */}
            <g ref={gear1Ref} transform="translate(150, 80)">
              <circle cx="0" cy="0" r="40" fill="url(#gear1-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="gear1-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-50"
                  width="6"
                  height="20"
                  fill="#fb923c"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="15" fill="white" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            </g>

            <g ref={gear2Ref} transform="translate(250, 90)">
              <circle cx="0" cy="0" r="30" fill="url(#gear2-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="gear2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-40"
                  width="6"
                  height="15"
                  fill="#22d3ee"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="12" fill="white" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            </g>

            {/* Email Input Field with modern styling */}
            <foreignObject x="350" y="40" width="400" height="100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white drop-shadow block">Email Address</label>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-14 px-4 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 rounded-xl focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all"
                    data-testid="input-email"
                  />
                </div>
              </div>
            </foreignObject>

            {/* Connection line */}
            <path d="M 280 90 Q 320 90, 350 80" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeDasharray="5,5" />

            {/* Middle Section - Colorful Pulley System (Password Trigger) */}
            <g ref={pulleyRef} transform="translate(650, 180)">
              <circle cx="0" cy="0" r="35" fill="url(#pulley-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="pulley-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="0" cy="0" r="25" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="white" />
            </g>

            <line x1="650" y1="215" x2="650" y2="320" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="8,4" />

            <g ref={weightRef} transform="translate(650, 320)">
              <rect x="-25" y="0" width="50" height="40" fill="url(#weight-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
              <defs>
                <linearGradient id="weight-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <text x="0" y="25" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">W</text>
            </g>

            {/* Password Input Field */}
            <foreignObject x="350" y="160" width="400" height="100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white drop-shadow block">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 px-4 pr-12 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 rounded-xl focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </foreignObject>

            {/* Bottom Section - Lever & Bottle System */}
            <g ref={leverRef} transform="translate(200, 400)">
              <line x1="-80" y1="0" x2="80" y2="0" stroke="url(#lever-gradient)" strokeWidth="8" strokeLinecap="round" />
              <defs>
                <linearGradient id="lever-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="0" cy="0" r="12" fill="white" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            </g>

            <g ref={bottleRef} transform="translate(500, 380)">
              <path d="M -20 0 L -20 60 L 20 60 L 20 0 L 15 0 L 15 -20 L -15 -20 L -15 0 Z" fill="url(#bottle-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <defs>
                <linearGradient id="bottle-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
              <path
                ref={liquidRef}
                d="M -18 30 L -18 58 L 18 58 L 18 30 Z"
                fill="#60a5fa"
                opacity="0.6"
              />
            </g>

            <circle
              ref={dropRef}
              cx="520"
              cy="440"
              r="4"
              fill="#60a5fa"
              opacity="0"
            />

            {/* Final Button */}
            <g transform="translate(400, 500)">
              <rect x="-80" y="0" width="160" height="50" fill="url(#button-base-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="8" />
              <defs>
                <linearGradient id="button-base-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4b5563', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect
                ref={buttonTopRef}
                x="-70"
                y="-8"
                width="140"
                height="50"
                fill="url(#button-top-gradient)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
                rx="8"
              />
              <defs>
                <linearGradient id="button-top-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
            </g>

            {/* Connection lines */}
            <path d="M 280 400 Q 350 410, 480 390" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 520 440 Q 450 460, 400 500" stroke="rgba(255,255,255,0.4)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
          </svg>

          {/* Submit Button */}
          <div className="mt-6">
            <Button
              type="submit"
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
              data-testid="button-login"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Activating Machine...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <LogIn className="w-6 h-6" />
                  Complete Machine & Login
                </div>
              )}
            </Button>
          </div>

          {/* Sign up link */}
          <div className="text-center mt-6">
            <p className="text-base text-white/80 drop-shadow">
              Don't have an account?{' '}
              <Link href="/signup">
                <span className="font-bold text-yellow-300 hover:text-yellow-200 underline cursor-pointer transition-colors" data-testid="link-signup">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}
