"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.push("/login");
    },
  });
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await mutate({ email, password });
    setLoading(false);
  };
  return (
    <form className="max-w-md mx-auto mt-20" onSubmit={handleRegister}>
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
        {loading ? "Creating..." : "Register"}
      </Button>
    </form>
  );
};

export default Register;
