import { useEffect, useState } from "react";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://blogspace-backend-blgv.onrender.com";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });
  const navigate = useNavigate(); // ✅ remove "new"
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;
    const fetchUser = async () => {
      try {
  const res = await axios.get(`${BACKEND_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
        // If user not found (500 error from old "adminId"), clear and redirect
        if (err.response?.status === 500) {
          localStorage.clear();
          navigate("/auth/signin");
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
  `${BACKEND_URL}/users/${userId}`, // ✅ fixed: missing "//"
        {
          firstName: user.firstName,
          lastName: user.lastName,
          bio: user.bio,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Profile updated successfully");
      navigate("/profile"); // ✅ proper redirect
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/profile" className="flex items-center gap-2 text-foreground">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold">Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Edit Profile</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Email
              </label>
              <Input name="email" value={user.email} disabled />
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">
                Bio
              </label>
              <Textarea
                name="bio"
                value={user.bio || ""}
                onChange={handleChange}
                rows="4"
                placeholder="Tell something about yourself..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
