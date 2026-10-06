'use client';

import React, { useState, useTransition, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Loader2, Check } from 'lucide-react';
import { signupUser } from '@/actions/auth';
import { useLoading } from '@/components/providers/LoadingContext';

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect') || '';
  const { withSkeleton } = useLoading();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const errors: typeof fieldErrors = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errors.fullName = 'Full Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!password || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName.trim());
    formData.append('email', email.trim());
    formData.append('password', password);
    if (redirectParam) {
      formData.append('redirect', redirectParam);
    }

    startTransition(async () => {
      await withSkeleton(
        async () => {
          try {
            const result = await signupUser(undefined, formData);
            if (result?.error) {
              setErrorMessage(result.error);
            } else if (result?.fieldErrors) {
              setFieldErrors(result.fieldErrors);
            } else if (result?.success && result.redirectTo) {
              router.push(result.redirectTo);
              router.refresh();
            }
          } catch {
            setErrorMessage('Unable to register at this time. Please try again.');
          }
        },
        'Creating Atelier Patron Account...',
        'create'
      );
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-block group mb-3">
          <span className="text-xl sm:text-2xl font-light tracking-[0.24em] text-[#F5F5F5] uppercase block group-hover:text-[#C5A059] transition-colors">
            SAAD MEHMOOD
          </span>
          <span className="text-[9px] tracking-[0.35em] text-[#C5A059] uppercase block font-light -mt-0.5">
            FABRICS · LAHORE · PAKISTAN
          </span>
        </Link>
        <div className="h-[1px] w-12 bg-[#C5A059]/60 mx-auto mb-4" />
        <h1 className="text-lg sm:text-xl font-light tracking-[0.14em] uppercase text-[#F5F5F5]">
          REGISTER YOUR ATELIER ACCOUNT
        </h1>
        <p className="text-xs text-[#888888] font-light mt-1">
          Join our distinguished clientele for personalized textile services.
        </p>
      </div>

      {/* Signup Card */}
      <div className="bg-[#111111] border border-[#222222] p-6 sm:p-8 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#C5A059]/40 pointer-events-none" />

        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800 text-xs text-red-200 flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                id="fullName"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: undefined });
                }}
                placeholder="e.g. Nawabzada Tariq Mehmood"
                className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] pl-10 pr-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-[#555555]"
              />
            </div>
            {fieldErrors.fullName && (
              <p className="text-[11px] text-red-400 mt-1.5">{fieldErrors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-wider text-[#A5A5A5] mb-2 font-medium"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                }}
                placeholder="name@domain.com"
                className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] pl-10 pr-4 py-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-[#555555]"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-[11px] text-red-400 mt-1.5">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="block text-xs uppercase tracking-wider text-[#A5A5A5] font-medium"
              >
                Password
              </label>
              <span className="text-[10px] text-[#777777] uppercase tracking-wider">
                Min. 8 characters
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: undefined });
                }}
                placeholder="••••••••"
                className="w-full bg-[#161616] border border-[#2A2A2A] text-xs sm:text-sm text-[#F5F5F5] pl-10 pr-10 py-3 focus:outline-none focus:border-[#C5A059] transition-colors placeholder-[#555555]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#A5A5A5] p-1 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-[11px] text-red-400 mt-1.5">{fieldErrors.password}</p>
            )}
          </div>

          {/* Membership Benefits */}
          <div className="p-3 bg-[#161616] border border-[#222222] space-y-1.5 text-[11px] text-[#888888]">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Direct tracking of unstitched fabric deliveries</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Exclusive access to limited-run seasonal latha cuts</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 text-xs uppercase tracking-[0.22em] font-medium text-[#080808] bg-[#C5A059] hover:bg-[#D8B26E] disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#080808]" />
                <span>CREATING ATELIER ACCOUNT...</span>
              </>
            ) : (
              <>
                <span>REGISTER ACCOUNT</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 pt-5 border-t border-[#1C1C1C] text-center">
          <p className="text-xs text-[#888888] font-light">
            Already registered with us?{' '}
            <Link
              href={redirectParam ? `/login?redirect=${encodeURIComponent(redirectParam)}` : '/login'}
              className="text-[#C5A059] hover:underline font-normal ml-1"
            >
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>

      {/* Security Guarantee */}
      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-[#666666] uppercase tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>Secure PostgreSQL Authentication · Zero Tracking</span>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-[#080808]">
      <Suspense
        fallback={
          <div className="text-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-[#C5A059] mx-auto mb-2" />
            <span className="text-xs text-[#888888] tracking-widest uppercase">Loading Atelier...</span>
          </div>
        }
      >
        <SignupFormContent />
      </Suspense>
    </div>
  );
}
