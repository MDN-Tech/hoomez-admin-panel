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
    <div className="lg:grid lg:grid-cols-2 w-full lg:min-h-screen">
      <div className="flex flex-col justify-center items-center px-8 lg:px-12 py-12">
        <div className="flex flex-col justify-center space-y-8 mx-auto w-full sm:w-100">
          {/* Logo & Header */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <div className="flex justify-center items-center bg-primary shadow-lg rounded-xl w-12 h-12 text-primary-foreground">
              <Command className="w-6 h-6" />
            </div>
            <h1 className="font-bold text-3xl tracking-tight">Welcome back</h1>
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
                  className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
                >
                  Email
                </label>
                <div className="relative">
                  <User className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-muted/30 focus:bg-background pl-10 h-11 transition-colors"
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
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="peer-disabled:opacity-70 font-medium text-sm leading-none peer-disabled:cursor-not-allowed"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary/80 text-sm hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="top-1/2 left-3 absolute w-5 h-5 text-muted-foreground -translate-y-1/2" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-muted/30 focus:bg-background pl-10 h-11 transition-colors"
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
              className="shadow-md hover:shadow-lg w-full h-11 text-base transition-all"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 w-5 h-5 animate-spin" />}
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="px-8 text-muted-foreground text-sm text-center">
            Don&apos;t have an account?{" "}
            <span className="font-medium text-primary hover:text-primary/90 underline transition-colors cursor-pointer">
              Contact Support
            </span>
          </p>
        </div>
      </div>

      {/* Visual Side */}
      <div className="hidden relative lg:flex lg:flex-col lg:justify-center lg:items-center bg-zinc-900 overflow-hidden">
        <div className="z-10 absolute inset-0 bg-zinc-900/20" />
        <img
          src="https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=2370&auto=format&fit=crop"
          alt="Modern Architecture"
          className="dark:opacity-80 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="hidden xl:block right-10 bottom-10 left-10 z-20 absolute bg-black/10 backdrop-blur-md p-6 border border-white/10 rounded-2xl text-white">
          <blockquote className="space-y-2">
            <p className="font-medium text-lg leading-relaxed">
              &ldquo;This admin panel has revolutionized how we manage our
              properties. The workflow is seamless and intuitive.&rdquo;
            </p>
            <footer className="text-white/80 text-sm">
              — Sofia Davis, Property Manager
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
