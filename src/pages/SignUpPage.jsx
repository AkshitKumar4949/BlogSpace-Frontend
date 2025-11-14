import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://blogspace-backend-blgv.onrender.com";
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { ArrowLeft } from "lucide-react"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
  const res = await axios.post(`${BACKEND_URL}/auth/signup`, {
        email,
        password,
        firstName,
        lastName,
      })

      setSuccess(res.data.msg || "Account created successfully")
      setTimeout(() => navigate("/auth/signin"), 1500)
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg)
      } else {
        setError("Server error. Try again.")
      }
    }
  }

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
            <h1 className="text-2xl font-bold text-foreground mb-2">Join BlogSpace</h1>
            <div className="w-12 h-px bg-foreground mx-auto mb-4"></div>
            <p className="text-muted-foreground">Create your account to start sharing your stories</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum provident dolorum aperiam iusto enim. Tempora minus magni exercitationem adipisci blanditiis! Laboriosam itaque sint ipsum obcaecati modi quisquam sunt incidunt mollitia eum voluptas! Sit natus sunt aliquid ad consequatur vero magnam officia, nam id earum? Repellendus id, dignissimos soluta aperiam fugiat minima! Natus tempora libero quaerat harum voluptas magni aspernatur assumenda iste provident nam at nostrum necessitatibus eius amet eaque accusantium perspiciatis cupiditate, voluptatum deleniti iure consequatur possimus laborum aut quae! Accusantium consectetur molestias reprehenderit ratione, vero corrupti, dolores laborum saepe corporis eius culpa sed doloribus sit! Ratione, dolores. Suscipit ducimus, error adipisci sunt inventore, magni provident nobis delectus expedita velit tempora nostrum modi reprehenderit, obcaecati dolorum. Iusto quis rem voluptatem debitis praesentium ipsam vero quidem enim. Fuga quidem eligendi accusantium, sunt consequuntur rerum ea! Autem tenetur qui blanditiis corporis soluta quisquam quos! Inventore ipsa recusandae fugiat dolores illo sunt mollitia quae nemo, alias natus quasi excepturi velit repudiandae ipsam? Sed quia vitae cum? Cupiditate repudiandae magni voluptates consequatur quibusdam aperiam, beatae quasi pariatur blanditiis doloremque deserunt, optio aspernatur. Totam quia aperiam esse expedita odit cumque saepe hic excepturi doloremque deleniti aspernatur exercitationem ipsam commodi ex dolorem, nostrum sunt labore, ipsum autem? Saepe alias officiis repellat mollitia! Aliquid nulla eveniet, quasi possimus labore cupiditate sit aut vel minima distinctio qui nam praesentium consequatur vero quod commodi quis impedit ab amet tenetur. Quidem commodi deserunt asperiores neque quo libero perspiciatis temporibus similique exercitationem dicta illum, quam ut consequuntur quis laboriosam laborum, non ratione explicabo vitae laudantium tempore perferendis ipsum in autem! Nisi voluptas voluptatibus a! Nemo quod fuga voluptatibus, adipisci aperiam delectus esse est tempora. Mollitia, nostrum nemo. Dolore mollitia cum libero tenetur error deserunt voluptatibus neque in, facilis explicabo aliquid autem recusandae repellat, odit incidunt perspiciatis eos ipsum sequi. Alias sed soluta dicta ab qui quisquam deserunt accusamus, tempore architecto corrupti commodi laborum velit. Rem dolor soluta mollitia ducimus voluptatum temporibus nesciunt aliquid quia ullam architecto? Ullam, dolorem in repellendus magnam magni necessitatibus labore aliquam iure quo sapiente reiciendis autem quis, facere non vitae maxime ut? Esse quo optio necessitatibus officiis ullam tenetur eligendi exercitationem aspernatur cumque, neque, quae odio vel doloremque sed nobis fugiat modi reiciendis, praesentium ratione quam harum earum delectus labore pariatur? Sunt delectus, necessitatibus voluptate sint dolorum, quo quae nam repellat voluptatibus consequuntur itaque maxime aspernatur deserunt nulla dolorem hic totam praesentium autem libero, velit alias labore. Neque, officia pariatur. Aliquid, blanditiis reiciendis velit repudiandae ratione praesentium dolorem animi odio beatae corrupti adipisci ab eos. Debitis eveniet veritatis, aspernatur similique qui nostrum reiciendis corrupti quidem est ullam, nesciunt et eius laboriosam architecto autem sed nihil vitae esse quos quod numquam! Perspiciatis iste, maiores aliquam non ut at, pariatur neque fuga eos molestias harum ex, corrupti commodi error qui sit illum possimus dignissimos eligendi amet reiciendis libero labore quasi! Dignissimos totam iusto esse, facilis officia dolorum, quis facere quia temporibus fugit beatae aut fugiat sit atque numquam deleniti in voluptas! Dolor deleniti animi consequuntur tempore ad explicabo id!</p>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="rounded border-border mt-1" required />
              <label className="text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-foreground hover:text-muted-foreground transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-foreground hover:text-muted-foreground transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-4 text-muted-foreground">or</span>
              </div>
            </div>

            <Button variant="outline" type="button" className="w-full bg-transparent">
              Continue with Google
            </Button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-border">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/auth/signin"
                className="text-foreground hover:text-muted-foreground transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
