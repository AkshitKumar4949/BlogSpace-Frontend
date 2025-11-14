import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import HomePage from "./pages/HomePage"
import BlogDetailPage from "./pages/BlogDetailPage"
import CreateBlogPage from "./pages/CreateBlogPage"
import ProfilePage from "./pages/ProfilePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AdminDashboard from "./pages/AdminDashboard"
import EditProfile from "./pages/EditProfile"
import EditBlog from "./pages/EditBlog"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/create" element={<CreateBlogPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/auth/signin" element={<SignInPage />} />
            <Route path="/auth/signup" element={<SignUpPage />} />
            <Route path="/edit-blog/:id" element={<EditBlog />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/users/forgot-password" element={<ForgotPassword/>} />
            <Route path="/reset-password/:token" element={<ResetPassword/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
