import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Command, Loader2, Lock, User } from "lucide-react";

import { useLogin } from "../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginParams } from "../../domain/params/auth_params";
import { getError } from "@/core/helpers/error_messages";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const [formData, setFormData] = useState<LoginParams>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    login(formData, {
      onSuccess: () => {
        toast.success("Login successful", {
          description: "Welcome back to the admin panel.",
        });
        navigate("/admin");
      },
      onError: (error) => {
        const { message, status } = getError(error);
        toast.error("Login failed", {
          description: status == 401 ? "Invalid Credentials" : message,
        });
      },
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-8 py-12 lg:px-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-100">
          {/* Logo & Header */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-xl shadow-lg">
              <Command className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email
                </label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-muted/30 focus:bg-background h-11 pl-10 transition-colors"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isPending}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 text-sm font-medium hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-muted/30 focus:bg-background h-11 pl-10 transition-colors"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    disabled={isPending}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              className="h-11 w-full text-base shadow-md transition-all hover:shadow-lg"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-muted-foreground px-8 text-center text-sm">
            Don&apos;t have an account?{" "}
            <span className="text-primary hover:text-primary/90 cursor-pointer font-medium underline transition-colors">
              Contact Support
            </span>
          </p>
        </div>
      </div>

      {/* Visual Side */}
      <div className="relative hidden overflow-hidden bg-zinc-900 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="absolute inset-0 z-10 bg-zinc-900/20" />
        <img
          src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2370&auto=format&fit=crop"
          alt="Modern Architecture"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105 dark:opacity-80"
        />
        <div className="absolute right-10 bottom-10 left-10 z-20 hidden rounded-2xl border border-white/10 bg-black/10 p-6 text-white backdrop-blur-md xl:block">
          <blockquote className="space-y-2">
            <p className="text-lg leading-relaxed font-medium">
              &ldquo;This admin panel has revolutionized how we manage our
              properties. The workflow is seamless and intuitive.&rdquo;
            </p>
            <footer className="text-sm text-white/80">
              — Sofia Davis, Property Manager
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
