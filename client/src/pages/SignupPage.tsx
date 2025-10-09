import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
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
        x: -40,
        duration: 2,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % 40),
        },
      });
    } else if ((!email || !fullName) && emailAnimationActive.current) {
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
    if (password && email && !passwordAnimationActive.current) {
      passwordAnimationActive.current = true;
      gsap.to(pulleyRef.current, {
        rotation: -360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });
      gsap.to(weightRef.current, {
        y: -70,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    } else if ((!password || !email) && passwordAnimationActive.current) {
      passwordAnimationActive.current = false;
      gsap.killTweensOf([pulleyRef.current, weightRef.current]);
      gsap.to([pulleyRef.current, weightRef.current], {
        rotation: 0,
        y: 0,
        duration: 0.5,
      });
    }
  }, [password, email]);

  // Stage 4: Terms checkbox - Lever activates
  useEffect(() => {
    if (agreeTerms && password) {
      gsap.to(leverRef.current, {
        rotation: -25,
        transformOrigin: 'center',
        duration: 0.8,
        ease: 'power2.out',
      });
    } else {
      gsap.to(leverRef.current, {
        rotation: 0,
        duration: 0.5,
      });
    }
  }, [agreeTerms, password]);

  // Stage 5: Final signup - Ultimate sequence
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

    // Kill existing animations
    gsap.killTweensOf([gear1Ref.current, gear2Ref.current, conveyorRef.current, pulleyRef.current, weightRef.current]);

    // Ultimate animation sequence
    const masterTimeline = gsap.timeline();

    // Lever rotates further
    masterTimeline.to(leverRef.current, {
      rotation: -45,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Bottle tips dramatically
    masterTimeline.to(
      bottleRef.current,
      {
        rotation: 75,
        transformOrigin: 'bottom right',
        duration: 0.8,
      },
      '-=0.3'
    );

    // Liquid flows
    masterTimeline.to(
      liquidRef.current,
      {
        opacity: 0,
        y: 40,
        duration: 1,
      },
      '-=0.5'
    );

    // Drops fall
    masterTimeline.to(
      dropRef.current,
      {
        opacity: 1,
        y: 20,
        duration: 0.25,
        repeat: 6,
        yoyo: true,
      },
      '-=0.6'
    );

    // Victory celebration - all elements spin
    masterTimeline.to(
      [gear1Ref.current, gear2Ref.current, pulleyRef.current],
      {
        rotation: '+=1080',
        duration: 1.5,
        ease: 'power2.out',
      },
      '-=0.2'
    );

    // Actual signup
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
      // Reset animations on error
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
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Build and activate your machine step by step</p>
        </div>

        {/* Integrated Animation + Form Container */}
        <form onSubmit={handleSubmit}>
        <div className="relative border-2 border-black dark:border-white rounded-lg p-8 bg-white dark:bg-gray-900">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-signup" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-signup)" />
            </svg>
          </div>

          {/* Mechanical Diagram with Integrated Form */}
          <svg className="w-full h-[700px]" viewBox="0 0 900 700" xmlns="http://www.w3.org/2000/svg">
            {/* Top - Mechanical arm (Name Trigger) */}
            <g transform="translate(80, 80)">
              <rect ref={armSegment1Ref} x="-5" y="0" width="10" height="60" fill="black" className="dark:fill-white" transform-origin="bottom center" />
              <rect ref={armSegment2Ref} x="-4" y="-50" width="8" height="50" fill="black" className="dark:fill-white" transform-origin="top center" />
              <circle cx="0" cy="60" r="8" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g transform="translate(130, 90)">
              <rect x="0" y="0" width="60" height="30" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-800 dark:stroke-white" />
              <rect ref={switchRef} x="5" y="5" width="20" height="20" fill="black" className="dark:fill-white" />
            </g>

            {/* Full Name Input Field */}
            <foreignObject x="220" y="50" width="350" height="90">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-fullname"
                />
              </div>
            </foreignObject>

            {/* Middle - Gears and Conveyor (Email Trigger) */}
            <g ref={gear1Ref} transform="translate(700, 150)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-45"
                  width="6"
                  height="18"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="12" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={gear2Ref} transform="translate(780, 160)">
              <circle cx="0" cy="0" r="28" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-2"
                  y="-36"
                  width="4"
                  height="15"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={conveyorRef} transform="translate(100, 200)">
              <rect x="0" y="0" width="150" height="8" fill="black" className="dark:fill-white" />
              <rect x="10" y="-20" width="30" height="20" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-white" />
            </g>

            {/* Email Input Field */}
            <foreignObject x="280" y="180" width="350" height="90">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-4 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  data-testid="input-email"
                />
              </div>
            </foreignObject>

            {/* Pulley System (Password Trigger) */}
            <g ref={pulleyRef} transform="translate(750, 320)">
              <circle cx="0" cy="0" r="38" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="8" fill="black" className="dark:fill-white" />
            </g>

            <g ref={weightRef} transform="translate(750, 400)">
              <rect x="-28" y="0" width="56" height="65" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-800 dark:stroke-white" />
              <line x1="-18" y1="22" x2="18" y2="22" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <line x1="-18" y1="43" x2="18" y2="43" stroke="black" strokeWidth="2" className="dark:stroke-white" />
            </g>

            <line x1="750" y1="358" x2="750" y2="400" stroke="black" strokeWidth="3" strokeDasharray="5,5" className="dark:stroke-white" />

            {/* Password Input Field */}
            <foreignObject x="280" y="300" width="380" height="100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 px-4 pr-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    data-testid="input-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
            </foreignObject>

            {/* Bottom - Lever, Bottle, Final Mechanism */}
            <g ref={leverRef} transform="translate(140, 500)">
              <line x1="0" y1="0" x2="160" y2="0" stroke="black" strokeWidth="4" className="dark:stroke-white" />
              <circle cx="80" cy="0" r="10" fill="black" className="dark:fill-white" />
              <polygon points="-12,-18 -12,18 12,0" fill="black" className="dark:fill-white" />
            </g>

            <g ref={bottleRef} transform="translate(550, 480)">
              <rect x="0" y="0" width="55" height="85" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-800 dark:stroke-white" />
              <rect x="17" y="-18" width="21" height="22" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-800 dark:stroke-white" />
              <path
                ref={liquidRef}
                d="M 6 22 L 6 75 L 49 75 L 49 22 Z"
                fill="black"
                opacity="0.3"
                className="dark:fill-white"
              />
            </g>

            <circle ref={dropRef} cx="627" cy="585" r="7" fill="black" opacity="0" className="dark:fill-white" />

            {/* Terms Checkbox */}
            <foreignObject x="250" y="430" width="400" height="50">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 border-2 border-black dark:border-white rounded"
                  data-testid="checkbox-terms"
                />
                <label htmlFor="terms" className="text-sm text-black dark:text-white cursor-pointer select-none">
                  I agree to the{' '}
                  <Link href="/terms">
                    <span className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms & Conditions</span>
                  </Link>
                </label>
              </div>
            </foreignObject>

            {/* Sign Up Button */}
            <foreignObject x="250" y="540" width="300" height="80">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                disabled={loading || !agreeTerms}
                data-testid="button-signup"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Complete Machine & Sign Up
                  </div>
                )}
              </Button>
            </foreignObject>

            {/* Connection lines */}
            <path d="M 100 130 Q 180 160, 220 120" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 250 200 Q 350 220, 700 170" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 300 510 Q 400 520, 550 500" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
          </svg>

          {/* Login link */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-login">
                  Log in
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
