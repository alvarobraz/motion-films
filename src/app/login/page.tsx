'use client';

import Link from 'next/link';
import { Loader2, Lock } from 'lucide-react';
import { useLogin } from '@/app/hooks/use-login';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

export default function LoginPage() {
  const { register, onSubmit, errors, isSubmitting } = useLogin();

  return (
    <main className="relative mx-7 flex min-h-screen items-center justify-center bg-zinc-950 px-4">
      <div className="flex w-full max-w-md flex-col items-center space-y-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tighter text-white"
        >
          MOTIN<span className="text-primary">FILMS</span>
        </Link>

        <div className="w-full space-y-8">
          <div className="mb-4 text-center">
            <div className="text-primary mx-auto mb-1 flex h-14 w-14 items-center justify-center rounded-full">
              <Lock size={28} />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-white">
              Área <span className="text-primary">Restrita</span>
            </h2>
            <p className="text-base text-zinc-400">
              Identifique-se para acessar o painel.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-white/5 bg-zinc-900/50 p-8 shadow-xl"
          >
            <Input
              {...register('email')}
              type="email"
              placeholder="E-mail"
              error={errors.email?.message}
              className="h-12"
            />

            <Input
              {...register('password')}
              type="password"
              placeholder="Senha"
              error={errors.password?.message}
              className="h-12"
            />

            <Button
              type="submit"
              variant="brand"
              className="h-12 w-full text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-4 animate-spin" />
                  Validando...
                </>
              ) : (
                'Entrar no Painel'
              )}
            </Button>

            <div className="pt-2 text-center">
              <p className="text-[10px] tracking-widest text-zinc-600 uppercase">
                Motion Films &copy; 2026
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
