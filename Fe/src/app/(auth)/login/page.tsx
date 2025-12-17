"use client";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      const res = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
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
      <Button type="submit"  className="w-full bg-black text-white">Login</Button>
    </form>
  )
}

export default Login