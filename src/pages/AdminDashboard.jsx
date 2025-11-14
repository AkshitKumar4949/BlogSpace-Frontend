import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Trash2, User, Search } from "lucide-react"
import { Input } from "../components/ui/input"
import axios from "axios"
export default function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:5050/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    }
  };

  fetchUsers();
}, []);
    const handleLogout = () => {
        localStorage.clear(); // clears all localStorage items (token, userId, etc.)
        window.location.href = "/auth/signin"; // redirect to login page
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5050/admin/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setUsers(users.filter(u => u._id !== id))
            } else {
                console.error("Failed to delete user")
            }
        } catch (err) {
            console.error(err)
        }
    }

    const filteredUsers = users.filter(u =>
        u?.name?.toLowerCase().includes(search.toLowerCase()) ||
        u?.email?.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div className="min-h-screen bg-black text-white p-8">
            <header className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Input
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 text-black"
                    icon={<Search className="w-4 h-4 text-gray-500" />}
                />
                <Button variant="outline" className='bg-red-500' onClick={handleLogout}>
                    Logout
                </Button>
            </header>

            <main className="grid gap-6">
                {filteredUsers.length === 0 && (
                    <p className="text-gray-400 text-center mt-12">No users found.</p>
                )}

                {filteredUsers.map(user => (
                    <Card key={user._id} className="flex items-center justify-between p-6 bg-gray-900 border border-gray-700 hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleDelete(user._id)}
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete
                        </Button>
                    </Card>
                ))}
            </main>
        </div>
    )
}
