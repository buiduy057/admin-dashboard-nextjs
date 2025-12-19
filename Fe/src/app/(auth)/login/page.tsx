"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/user.service";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push("/");
    },
  });
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ email, password });
    setLoading(false);
  };
  return (
    <form className="max-w-md mx-auto mt-20" onSubmit={handleLogin}>
      <div className="mb-4">
        <Label className="mb-3">Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <Label className="mb-3">Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white"
      >
        {loading ? "Creating..." : "Login"}
      </Button>
      <div className="text-right mt-2 text-[15px] text-blue-400" ><Link  href="/register">Register</Link></div>
    </form>
  );
};

export default Login;
