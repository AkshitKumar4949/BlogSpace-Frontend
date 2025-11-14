import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";
import { Button } from "../components/ui/button";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
  await axios.post(`${BACKEND_URL}/users/reset-password/${token}`, { newPassword });
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => navigate("/auth/signin"), 2000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-lg border border-border">
        <h1 className="text-3xl font-bold text-foreground mb-6 text-center">Reset Password</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-input text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        <p className="mt-6 text-center text-muted-foreground text-sm">
          Back to{" "}
          <a href="/auth/signin" className="text-primary hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
