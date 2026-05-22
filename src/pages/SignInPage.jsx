import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://blogspace-backend-blgv.onrender.com";


export default function SignInPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
  const res = await axios.post(`${BACKEND_URL}/auth/signin`, {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = res.data;

      // Save token and user info in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("role", user.role); // save role

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      if (e.response) {
        setError(e.response.data.msg);
      } else {
        setError("Server Error. Try Again.");
      }
    }
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to BlogSpace</span>
          </Link>
        </div>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
            <div className="w-12 h-px bg-foreground mx-auto mb-4"></div>
            <p className="text-muted-foreground">Sign in to your account to continue writing</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} >
            {error && <p className="text-red-500 text-sm"> {error}</p>}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input id="email" type="email" placeholder="Enter your email" className="w-full" required onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Enter your password" className="w-full" required
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <Link
                to="/users/forgot-password"
                className="text-foreground hover:text-muted-foreground transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">or</span>
              </div>
            </div>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/auth/signup"
                className="text-foreground hover:text-muted-foreground transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
