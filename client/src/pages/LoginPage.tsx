import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import gsap from 'gsap';
import {
  Gear,
  Pulley,
  Weight,
  Lever,
  Chain,
  Funnel,
  Button as MechButton,
  Bottle,
  Spring
} from '@/components/MechanicalAnimations';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation refs
  const gear1Ref = useRef<HTMLDivElement>(null);
  const gear2Ref = useRef<HTMLDivElement>(null);
  const pulleyRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  const leverRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize GSAP timeline on mount
  useEffect(() => {
    timelineRef.current = gsap.timeline({ paused: true });
  }, []);

  // Step 1: Email input animation
  const handleEmailFocus = () => {
    if (timelineRef.current) {
      gsap.to(gear1Ref.current, {
        rotation: 360,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
      });
      gsap.to(gear2Ref.current, {
        rotation: -360,
        duration: 1.5,
        ease: 'power2.inOut',
        repeat: -1,
      });
    }
  };

  const handleEmailBlur = () => {
    if (email) {
      gsap.to([gear1Ref.current, gear2Ref.current], {
        rotation: 0,
        duration: 0.5,
      });
    }
  };

  // Step 2: Password input animation
  const handlePasswordFocus = () => {
    if (email) {
      gsap.to(pulleyRef.current, {
        rotation: 360,
        duration: 2,
        ease: 'power1.inOut',
        repeat: -1,
      });
      gsap.to(weightRef.current, {
        y: -60,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
      gsap.to(chainRef.current, {
        scaleY: 0.7,
        transformOrigin: 'top',
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });
    }
  };

  const handlePasswordBlur = () => {
    if (password) {
      gsap.to([pulleyRef.current, weightRef.current, chainRef.current], {
        rotation: 0,
        y: 0,
        scaleY: 1,
        duration: 0.5,
      });
    }
  };

  // Step 3: Submit button - Final complex animation
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

    // Complex final animation sequence
    const finalTimeline = gsap.timeline();

    // Step 1: Weight drops and triggers lever
    finalTimeline.to(weightRef.current, {
      y: 50,
      duration: 0.8,
      ease: 'bounce.out',
    });

    // Step 2: Lever activates
    finalTimeline.to(
      leverRef.current,
      {
        rotation: -25,
        transformOrigin: 'center center',
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Step 3: Spring compresses
    finalTimeline.to(
      springRef.current,
      {
        scaleY: 0.5,
        transformOrigin: 'bottom',
        duration: 0.4,
      },
      '-=0.2'
    );

    // Step 4: Bottle tips and liquid flows
    finalTimeline.to(
      bottleRef.current,
      {
        rotation: 45,
        transformOrigin: 'bottom right',
        duration: 0.5,
      },
      '-=0.1'
    );

    finalTimeline.to(
      '#bottle1-liquid',
      {
        opacity: 0.1,
        y: 20,
        duration: 0.6,
      },
      '-=0.3'
    );

    // Step 5: Funnel receives liquid with drops
    finalTimeline.to(
      '#funnel1-drop',
      {
        opacity: 1,
        y: 10,
        duration: 0.3,
        repeat: 3,
        yoyo: true,
      },
      '-=0.3'
    );

    // Step 6: Button press
    finalTimeline.to(
      '#button1-top',
      {
        y: 5,
        duration: 0.2,
      },
      '-=0.1'
    );

    // Step 7: All elements celebrate
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
      gsap.to([weightRef.current, leverRef.current, springRef.current, bottleRef.current], {
        rotation: 0,
        y: 0,
        scaleY: 1,
        duration: 0.5,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Mechanical Animation */}
        <div className="hidden lg:block relative h-[600px] border-2 border-black dark:border-white rounded-lg p-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 600">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Top section - Gears (Email trigger) */}
          <div ref={gear1Ref} className="absolute top-16 left-20">
            <Gear size={80} id="gear1" />
          </div>
          <div ref={gear2Ref} className="absolute top-24 left-36">
            <Gear size={60} id="gear2" />
          </div>

          {/* Middle section - Pulley system (Password trigger) */}
          <div ref={pulleyRef} className="absolute top-40 right-24">
            <Pulley size={70} id="pulley1" />
          </div>
          <div ref={chainRef} className="absolute top-52 right-36">
            <Chain length={120} id="chain1" />
          </div>
          <div ref={weightRef} className="absolute top-80 right-28">
            <Weight size={50} id="weight1" />
          </div>

          {/* Bottom section - Final mechanism (Submit trigger) */}
          <div ref={leverRef} className="absolute bottom-48 left-16">
            <Lever width={140} id="lever1" />
          </div>
          <div ref={springRef} className="absolute bottom-32 left-44">
            <Spring height={80} id="spring1" />
          </div>
          <div ref={bottleRef} className="absolute bottom-40 right-32">
            <Bottle id="bottle1" />
          </div>
          <div ref={funnelRef} className="absolute bottom-20 right-16">
            <Funnel size={70} id="funnel1" />
          </div>
          <div ref={buttonRef} className="absolute bottom-12 left-32">
            <MechButton id="button1" />
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 400 600">
            <path
              d="M 100 90 Q 150 90, 170 110"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="dark:stroke-white"
            />
            <path
              d="M 330 150 L 330 200"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="dark:stroke-white"
            />
          </svg>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Log in to access Solvezyo Tools</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                className="h-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800"
                data-testid="input-email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  className="h-12 pr-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800"
                  data-testid="input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
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

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
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
                  Login
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-signup">
                  Sign up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
