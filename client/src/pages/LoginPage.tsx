import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
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
        opacity: 0.1,
        y: 30,
        duration: 0.8,
      },
      '-=0.4'
    );

    // Drops fall
    finalTimeline.to(
      dropRef.current,
      {
        opacity: 1,
        y: 25,
        duration: 0.25,
        repeat: 4,
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
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Fill the form to activate the machine</p>
        </div>

        {/* Integrated Animation + Form Container */}
        <form onSubmit={handleSubmit}>
        <div className="relative border-2 border-black dark:border-white rounded-lg p-8 bg-white dark:bg-gray-900">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-login" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-login)" />
            </svg>
          </div>

          {/* Mechanical Diagram with Integrated Form */}
          <svg className="w-full h-[600px]" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
            {/* Top Section - Gears (Email Trigger) */}
            <g ref={gear1Ref} transform="translate(150, 80)">
              <circle cx="0" cy="0" r="40" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-3"
                  y="-50"
                  width="6"
                  height="20"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="15" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            <g ref={gear2Ref} transform="translate(250, 90)">
              <circle cx="0" cy="0" r="30" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <rect
                  key={i}
                  x="-2"
                  y="-38"
                  width="4"
                  height="15"
                  fill="black"
                  className="dark:fill-white"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="10" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-900 dark:stroke-white" />
            </g>

            {/* Email Input Field - Positioned in the diagram */}
            <foreignObject x="350" y="40" width="400" height="100">
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

            {/* Middle Section - Pulley System (Password Trigger) */}
            <g ref={pulleyRef} transform="translate(650, 200)">
              <circle cx="0" cy="0" r="35" fill="none" stroke="black" strokeWidth="3" className="dark:stroke-white" />
              <circle cx="0" cy="0" r="8" fill="black" className="dark:fill-white" />
              <line x1="0" y1="-35" x2="0" y2="-60" stroke="black" strokeWidth="2" className="dark:stroke-white" />
            </g>

            <g ref={weightRef} transform="translate(650, 280)">
              <rect x="-25" y="0" width="50" height="60" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-800 dark:stroke-white" />
              <line x1="-15" y1="20" x2="15" y2="20" stroke="black" strokeWidth="2" className="dark:stroke-white" />
              <line x1="-15" y1="40" x2="15" y2="40" stroke="black" strokeWidth="2" className="dark:stroke-white" />
            </g>

            <line x1="650" y1="235" x2="650" y2="280" stroke="black" strokeWidth="3" strokeDasharray="5,5" className="dark:stroke-white" />

            {/* Password Input Field */}
            <foreignObject x="350" y="180" width="250" height="100">
              <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white block">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
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

            {/* Bottom Section - Final Mechanism (Submit Trigger) */}
            <g ref={leverRef} transform="translate(120, 400)">
              <line x1="0" y1="0" x2="140" y2="0" stroke="black" strokeWidth="4" className="dark:stroke-white" />
              <circle cx="70" cy="0" r="8" fill="black" className="dark:fill-white" />
              <polygon points="-10,-15 -10,15 10,0" fill="black" className="dark:fill-white" />
            </g>

            <g ref={bottleRef} transform="translate(500, 380)">
              <rect x="0" y="0" width="50" height="80" fill="white" stroke="black" strokeWidth="3" className="dark:fill-gray-800 dark:stroke-white" />
              <rect x="15" y="-15" width="20" height="20" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-800 dark:stroke-white" />
              <path
                ref={liquidRef}
                d="M 5 20 L 5 70 L 45 70 L 45 20 Z"
                fill="black"
                opacity="0.3"
                className="dark:fill-white"
              />
            </g>

            <circle ref={dropRef} cx="575" cy="480" r="6" fill="black" opacity="0" className="dark:fill-white" />

            <g transform="translate(600, 500)">
              <rect x="0" y="10" width="80" height="15" fill="black" className="dark:fill-white" />
              <rect ref={buttonTopRef} x="5" y="0" width="70" height="15" fill="white" stroke="black" strokeWidth="2" className="dark:fill-gray-700 dark:stroke-white" />
            </g>

            {/* Login Button - Positioned in the diagram */}
            <foreignObject x="280" y="480" width="220" height="80">
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                disabled={loading}
                data-testid="button-login"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-5 h-5" />
                    Activate Machine & Login
                  </div>
                )}
              </Button>
            </foreignObject>

            {/* Connection lines */}
            <path d="M 180 110 Q 250 140, 350 120" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
            <path d="M 260 420 Q 350 430, 500 400" stroke="black" strokeWidth="2" fill="none" strokeDasharray="5,5" className="dark:stroke-white" />
          </svg>

          {/* Sign up link below the integrated machine */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-signup">
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
