import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
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
  Spring,
  ConveyorBelt,
  MechanicalArm,
  Switch
} from '@/components/MechanicalAnimations';

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
  const armRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const gear1Ref = useRef<HTMLDivElement>(null);
  const gear2Ref = useRef<HTMLDivElement>(null);
  const gear3Ref = useRef<HTMLDivElement>(null);
  const conveyorRef = useRef<HTMLDivElement>(null);
  const pulleyRef = useRef<HTMLDivElement>(null);
  const chainRef = useRef<HTMLDivElement>(null);
  const weightRef = useRef<HTMLDivElement>(null);
  const leverRef = useRef<HTMLDivElement>(null);
  const springRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const funnelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize all animations as paused
    gsap.set([armRef.current, switchRef.current, gear1Ref.current, gear2Ref.current, gear3Ref.current], {
      rotation: 0,
    });
  }, []);

  // Step 1: Full Name - Mechanical arm activates switch
  const handleNameFocus = () => {
    const tl = gsap.timeline();
    tl.to('#arm1-segment1', {
      rotation: -45,
      transformOrigin: 'bottom center',
      duration: 0.8,
      ease: 'power2.inOut',
    })
      .to(
        '#arm1-segment2',
        {
          rotation: -30,
          transformOrigin: 'top center',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
      .to(
        '#arm1-hand',
        {
          x: 20,
          duration: 0.4,
        },
        '-=0.2'
      );
  };

  const handleNameBlur = () => {
    if (fullName) {
      gsap.to('#switch1-toggle', {
        x: 20,
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to(switchRef.current, {
        backgroundColor: '#000',
        duration: 0.3,
      });
    }
  };

  // Step 2: Email - Switch activates conveyor belt
  const handleEmailFocus = () => {
    if (fullName) {
      // Start conveyor belt movement
      gsap.to(conveyorRef.current, {
        x: -30,
        duration: 2,
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % 30),
        },
      });

      // Item on belt moves
      gsap.to('#conveyor1-item', {
        x: 100,
        duration: 3,
        ease: 'linear',
        repeat: -1,
      });

      // Gears start rotating
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
    }
  };

  const handleEmailBlur = () => {
    if (email) {
      gsap.to([conveyorRef.current, '#conveyor1-item'], {
        x: 0,
        duration: 0.5,
      });
    }
  };

  // Step 3: Password - Gears drive pulley system
  const handlePasswordFocus = () => {
    if (email) {
      gsap.to(gear3Ref.current, {
        rotation: 360,
        duration: 1.5,
        ease: 'linear',
        repeat: -1,
      });

      gsap.to(pulleyRef.current, {
        rotation: -360,
        duration: 2,
        ease: 'linear',
        repeat: -1,
      });

      gsap.to(weightRef.current, {
        y: -80,
        duration: 2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(chainRef.current, {
        scaleY: 0.6,
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
      gsap.to([gear3Ref.current, pulleyRef.current, weightRef.current, chainRef.current], {
        rotation: 0,
        y: 0,
        scaleY: 1,
        duration: 0.5,
      });
    }
  };

  // Step 4: Terms checkbox - Major lever activation
  const handleTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
    if (checked && password) {
      // Big lever activation
      const tl = gsap.timeline();
      tl.to(leverRef.current, {
        rotation: -35,
        transformOrigin: 'center',
        duration: 1,
        ease: 'power3.out',
      })
        .to(
          springRef.current,
          {
            scaleY: 0.4,
            transformOrigin: 'bottom',
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.6'
        )
        .to(
          buttonRef.current,
          {
            scale: 1.1,
            duration: 0.4,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
    } else {
      gsap.to([leverRef.current, springRef.current, buttonRef.current], {
        rotation: 0,
        scaleY: 1,
        scale: 1,
        duration: 0.6,
      });
    }
  };

  // Step 5: Final signup - Ultimate machine sequence
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

    // Ultimate complex animation sequence
    const masterTimeline = gsap.timeline();

    // Phase 1: Weight drops dramatically
    masterTimeline.to(weightRef.current, {
      y: 100,
      duration: 1.2,
      ease: 'bounce.out',
    });

    // Phase 2: Chain reaction - lever rotates further
    masterTimeline.to(
      leverRef.current,
      {
        rotation: -50,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    // Phase 3: Spring fully compresses
    masterTimeline.to(
      springRef.current,
      {
        scaleY: 0.2,
        duration: 0.6,
        ease: 'power3.in',
      },
      '-=0.4'
    );

    // Phase 4: Bottle tips dramatically
    masterTimeline.to(
      bottleRef.current,
      {
        rotation: 90,
        transformOrigin: 'bottom right',
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '-=0.3'
    );

    // Phase 5: Liquid flows
    masterTimeline.to(
      '#bottle1-liquid',
      {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power1.in',
      },
      '-=0.5'
    );

    // Phase 6: Funnel receives and drops
    masterTimeline.to(
      '#funnel1-drop',
      {
        opacity: 1,
        y: 15,
        duration: 0.25,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      },
      '-=0.6'
    );

    // Phase 7: Button gets pressed
    masterTimeline.to(
      '#button1-top',
      {
        y: 8,
        duration: 0.3,
        ease: 'power4.in',
      },
      '-=0.2'
    );

    // Phase 8: Victory celebration - all gears spin
    masterTimeline.to(
      [gear1Ref.current, gear2Ref.current, gear3Ref.current],
      {
        rotation: '+=1080',
        duration: 1.5,
        ease: 'power2.out',
      },
      '-=0.1'
    );

    // Phase 9: Pulley celebrates
    masterTimeline.to(
      pulleyRef.current,
      {
        rotation: '+=720',
        duration: 1.5,
        ease: 'power2.out',
      },
      '<'
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
      // Reset all animations on error
      gsap.to(
        [
          weightRef.current,
          leverRef.current,
          springRef.current,
          bottleRef.current,
          gear1Ref.current,
          gear2Ref.current,
          gear3Ref.current,
          pulleyRef.current,
        ],
        {
          rotation: 0,
          y: 0,
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Complex Mechanical Animation */}
        <div className="hidden lg:block relative h-[700px] border-2 border-black dark:border-white rounded-lg p-8">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <svg className="w-full h-full" viewBox="0 0 500 700">
              <defs>
                <pattern id="grid-signup" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-signup)" />
            </svg>
          </div>

          {/* Top - Mechanical arm and switch (Name trigger) */}
          <div ref={armRef} className="absolute top-12 left-12">
            <MechanicalArm id="arm1" />
          </div>
          <div ref={switchRef} className="absolute top-24 left-36">
            <Switch id="switch1" />
          </div>

          {/* Upper-middle - Conveyor belt and gears (Email trigger) */}
          <div ref={conveyorRef} className="absolute top-36 left-8">
            <ConveyorBelt width={180} id="conveyor1" />
          </div>
          <div ref={gear1Ref} className="absolute top-32 right-24">
            <Gear size={70} id="gear1" />
          </div>
          <div ref={gear2Ref} className="absolute top-40 right-12">
            <Gear size={55} id="gear2" />
          </div>

          {/* Middle - Third gear and pulley system (Password trigger) */}
          <div ref={gear3Ref} className="absolute top-60 left-32">
            <Gear size={65} id="gear3" />
          </div>
          <div ref={pulleyRef} className="absolute top-64 right-28">
            <Pulley size={75} id="pulley1" />
          </div>
          <div ref={chainRef} className="absolute top-76 right-36">
            <Chain length={140} id="chain1" />
          </div>
          <div ref={weightRef} className="absolute" style={{ top: '380px', right: '120px' }}>
            <Weight size={55} id="weight1" />
          </div>

          {/* Lower section - Lever, spring, bottle, funnel, button (Terms & Submit) */}
          <div ref={leverRef} className="absolute bottom-56 left-16">
            <Lever width={160} id="lever1" />
          </div>
          <div ref={springRef} className="absolute bottom-36 left-48">
            <Spring height={90} id="spring1" />
          </div>
          <div ref={bottleRef} className="absolute bottom-44 right-36">
            <Bottle id="bottle1" />
          </div>
          <div ref={funnelRef} className="absolute bottom-20 right-20">
            <Funnel size={75} id="funnel1" />
          </div>
          <div ref={buttonRef} className="absolute bottom-12 left-36">
            <MechButton id="button1" />
          </div>

          {/* Connection lines */}
          <svg className="absolute inset-0 pointer-events-none" viewBox="0 0 500 700">
            <path
              d="M 100 60 L 160 80"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="dark:stroke-white"
            />
            <path
              d="M 180 100 Q 200 120, 220 140"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="dark:stroke-white"
            />
            <path
              d="M 380 180 L 380 220"
              stroke="black"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,5"
              className="dark:stroke-white"
            />
          </svg>
        </div>

        {/* Right side - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-black dark:text-white">Create Account</h1>
            <p className="text-gray-600 dark:text-gray-400">Join Solvezyo Tools Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-black dark:text-white">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                className="h-12 border-2 border-black dark:border-white bg-white dark:bg-gray-800"
                data-testid="input-fullname"
              />
            </div>

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
                  placeholder="Create a strong password"
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={handleTermsChange}
                className="border-2 border-black dark:border-white"
                data-testid="checkbox-terms"
              />
              <label
                htmlFor="terms"
                className="text-sm text-black dark:text-white cursor-pointer select-none"
              >
                I agree to the{' '}
                <Link href="/terms">
                  <span className="underline hover:text-gray-700 dark:hover:text-gray-300">
                    Terms & Conditions
                  </span>
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
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
                  Sign Up
                </div>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/login">
                <span className="font-semibold text-black dark:text-white hover:underline cursor-pointer" data-testid="link-login">
                  Log in
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
