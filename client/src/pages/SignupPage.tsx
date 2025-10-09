import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus, Sparkles } from 'lucide-react';
import gsap from 'gsap';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation refs
  const armSegment1Ref = useRef<SVGRectElement>(null);
  const armSegment2Ref = useRef<SVGRectElement>(null);
  const switchRef = useRef<SVGRectElement>(null);
  const gear1Ref = useRef<SVGGElement>(null);
  const gear2Ref = useRef<SVGGElement>(null);
  const conveyorRef = useRef<SVGGElement>(null);
  const pulleyRef = useRef<SVGGElement>(null);
  const weightRef = useRef<SVGGElement>(null);
  const leverRef = useRef<SVGGElement>(null);
  const bottleRef = useRef<SVGGElement>(null);
  const liquidRef = useRef<SVGPathElement>(null);
  const dropRef = useRef<SVGCircleElement>(null);

  // Animation state tracking
  const nameAnimationActive = useRef(false);
  const emailAnimationActive = useRef(false);
  const passwordAnimationActive = useRef(false);

  // Stage 1: Full Name input - Mechanical arm moves
  useEffect(() => {
    if (fullName && !nameAnimationActive.current) {
      nameAnimationActive.current = true;
      const tl = gsap.timeline();
      tl.to(armSegment1Ref.current, {
        rotation: -30,
        transformOrigin: 'bottom center',
        duration: 0.8,
      })
        .to(
          armSegment2Ref.current,
          {
            rotation: -20,
            transformOrigin: 'top center',
            duration: 0.6,
          },
          '-=0.4'
        )
        .to(
          switchRef.current,
          {
            x: 15,
            duration: 0.4,
          },
          '-=0.2'
        );
    } else if (!fullName && nameAnimationActive.current) {
      nameAnimationActive.current = false;
      gsap.to([armSegment1Ref.current, armSegment2Ref.current, switchRef.current], {
        rotation: 0,
        x: 0,
        duration: 0.5,
      });
    }
  }, [fullName]);

  // Stage 2: Email input - Gears and conveyor activate
  useEffect(() => {
    if (email && fullName && !emailAnimationActive.current) {
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
      gsap.to(conveyorRef.current, {
        x: -100,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
    } else if (!email && emailAnimationActive.current) {
      emailAnimationActive.current = false;
      gsap.killTweensOf([gear1Ref.current, gear2Ref.current, conveyorRef.current]);
      gsap.to([gear1Ref.current, gear2Ref.current, conveyorRef.current], {
        rotation: 0,
        x: 0,
        duration: 0.5,
      });
    }
  }, [email, fullName]);

  // Stage 3: Password input - Pulley system activates
  useEffect(() => {
    if (password && email && fullName && !passwordAnimationActive.current) {
      passwordAnimationActive.current = true;
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(weightRef.current, {
        y: -50,
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
  }, [password, email, fullName]);

  // Final Submit - Complete Animation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: 'Error',
        description: 'Please agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, conveyorRef.current, pulleyRef.current, weightRef.current]);

    const finalTimeline = gsap.timeline();

    finalTimeline.to(leverRef.current, {
      rotation: -40,
      transformOrigin: 'center',
      duration: 0.7,
      ease: 'power2.out',
    });

    finalTimeline.to(
      bottleRef.current,
      {
        rotation: 65,
        transformOrigin: 'bottom right',
        duration: 0.8,
      },
      '-=0.3'
    );

    finalTimeline.to(
      liquidRef.current,
      {
        opacity: 1,
        scaleY: 1.6,
        duration: 0.6,
      },
      '-=0.4'
    );

    finalTimeline.to(
      dropRef.current,
      {
        y: 120,
        opacity: 0,
        duration: 0.9,
      },
      '-=0.5'
    );

    finalTimeline.to(
      [gear1Ref.current, gear2Ref.current, pulleyRef.current],
      {
        rotation: '+=1080',
        duration: 1.5,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    setLoading(true);
    try {
      await signup(email, password, fullName);
      toast({
        title: 'Success!',
        description: 'Account created successfully',
      });
      setLocation('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        variant: 'destructive',
      });
      gsap.to([leverRef.current, bottleRef.current, liquidRef.current, dropRef.current], {
        rotation: 0,
        y: 0,
        opacity: 1,
        duration: 0.8,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 dark:from-cyan-900 dark:via-blue-900 dark:to-indigo-950">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='white' stroke-opacity='0.1' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-cyan-300 animate-pulse" />
            <h1 className="text-5xl font-bold text-white drop-shadow-lg">Create Account</h1>
            <Sparkles className="w-8 h-8 text-cyan-300 animate-pulse" />
          </div>
          <p className="text-xl text-white/90 drop-shadow">Build and activate your Rube Goldberg machine</p>
        </div>

        <div className="relative backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-3xl p-8 shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-3xl overflow-hidden">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-signup" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-signup)" />
            </svg>
          </div>

          <svg className="w-full h-[700px]" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(80, 80)">
              <rect ref={armSegment1Ref} x="-5" y="0" width="10" height="60" fill="url(#arm1-gradient)" transformOrigin="bottom center" />
              <defs>
                <linearGradient id="arm1-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect ref={armSegment2Ref} x="-4" y="-50" width="8" height="50" fill="#34d399" transformOrigin="top center" />
              <circle cx="0" cy="60" r="8" fill="white" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
            </g>

            <g transform="translate(130, 90)">
              <rect x="0" y="0" width="60" height="30" fill="url(#switch-bg-gradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
              <defs>
                <linearGradient id="switch-bg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <rect ref={switchRef} x="5" y="5" width="20" height="20" fill="#818cf8" rx="2" />
            </g>

            <foreignObject x="220" y="50" width="350" height="90">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white drop-shadow block">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-14 px-4 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 rounded-xl focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all"
                  data-testid="input-fullname"
                />
              </div>
            </foreignObject>

            <g ref={gear1Ref} transform="translate(120, 230)">
              <circle cx="0" cy="0" r="35" fill="url(#gear1-grad)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="gear1-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect key={i} x="-3" y="-45" width="6" height="18" fill="#fbbf24" transform={`rotate(${angle})`} />
              ))}
              <circle cx="0" cy="0" r="12" fill="white" />
            </g>

            <g ref={gear2Ref} transform="translate(220, 240)">
              <circle cx="0" cy="0" r="28" fill="url(#gear2-grad)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="gear2-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0d9488', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect key={i} x="-3" y="-38" width="6" height="14" fill="#2dd4bf" transform={`rotate(${angle})`} />
              ))}
              <circle cx="0" cy="0" r="10" fill="white" />
            </g>

            <g ref={conveyorRef}>
              <rect x="280" y="220" width="100" height="8" fill="url(#conveyor-gradient)" rx="4" />
              <defs>
                <linearGradient id="conveyor-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#64748b', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#475569', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {[290, 310, 330, 350, 370].map((x, i) => (
                <rect key={i} x={x} y="222" width="8" height="4" fill="#cbd5e1" rx="1" />
              ))}
            </g>

            <foreignObject x="420" y="180" width="400" height="90">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white drop-shadow block">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 bg-white/20 backdrop-blur-md border-2 border-white/30 text-white placeholder:text-white/60 rounded-xl focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all"
                  data-testid="input-email"
                />
              </div>
            </foreignObject>

            <g ref={pulleyRef} transform="translate(750, 350)">
              <circle cx="0" cy="0" r="32" fill="url(#pulley-grad)" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
              <defs>
                <linearGradient id="pulley-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
              <circle cx="0" cy="0" r="8" fill="white" />
            </g>

            <line x1="750" y1="382" x2="750" y2="480" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="8,4" />

            <g ref={weightRef} transform="translate(750, 480)">
              <rect x="-22" y="0" width="44" height="38" fill="url(#weight-grad)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" rx="4" />
              <defs>
                <linearGradient id="weight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#db2777', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <text x="0" y="24" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">W</text>
            </g>

            <foreignObject x="420" y="320" width="400" height="100">
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

            <g ref={leverRef} transform="translate(250, 550)">
              <line x1="-70" y1="0" x2="70" y2="0" stroke="url(#lever-grad)" strokeWidth="8" strokeLinecap="round" />
              <defs>
                <linearGradient id="lever-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <circle cx="0" cy="0" r="10" fill="white" stroke="rgba(255,255,255,0.5)" strokeWidth="3" />
            </g>

            <g ref={bottleRef} transform="translate(550, 520)">
              <path d="M -18 0 L -18 55 L 18 55 L 18 0 L 14 0 L 14 -18 L -14 -18 L -14 0 Z" fill="url(#bottle-grad)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
              <defs>
                <linearGradient id="bottle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
              <path
                ref={liquidRef}
                d="M -16 28 L -16 53 L 16 53 L 16 28 Z"
                fill="#60a5fa"
                opacity="0.6"
              />
            </g>

            <circle ref={dropRef} cx="568" cy="575" r="4" fill="#60a5fa" opacity="0" />

            <path d="M 100 130 Q 180 160, 220 120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 250 200 Q 350 220, 700 170" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <path d="M 300 510 Q 400 520, 550 500" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="border-white/40 data-[state=checked]:bg-cyan-400 data-[state=checked]:border-cyan-400"
                data-testid="checkbox-terms"
              />
              <label htmlFor="terms" className="text-sm text-white/90 cursor-pointer">
                I agree to the terms and conditions
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-xl rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading || !agreeTerms}
              data-testid="button-signup"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <UserPlus className="w-6 h-6" />
                  Complete Machine & Sign Up
                </div>
              )}
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-base text-white/80 drop-shadow">
              Already have an account?{' '}
              <Link href="/login">
                <span className="font-bold text-cyan-300 hover:text-cyan-200 underline cursor-pointer transition-colors" data-testid="link-login">
                  Log in
                </span>
              </Link>
            </p>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}
