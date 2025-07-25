"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Star,
  GitFork,
  Eye,
  Calendar,
  MapPin,
  LinkIcon,
  BookOpen,
  ArrowLeft,
  Search,
  TrendingUp,
  Code,
  Activity,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"

interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  location: string
  blog: string
  public_repos: number
  followers: number
  following: number
  created_at: string
}

interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  language: string
  size: number
  updated_at: string
  created_at: string
}

// Color palettes from the provided images
const PIE_COLORS = ["#03a6a1", "#ffe3bb", "#ffa673", "#ff4f0f"]
const CHART_COLORS = ["#932f67", "#d92c54", "#dddeab", "#8abb6c"]

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    "C++": "#f34b7d",
    C: "#555555",
    "C#": "#239120",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Rust: "#dea584",
    Swift: "#ffac45",
    Kotlin: "#F18E33",
    Dart: "#00B4AB",
    HTML: "#e34c26",
    CSS: "#1572B6",
    Shell: "#89e051",
    Vue: "#2c3e50",
    React: "#61dafb",
  }
  return colors[language] || "#6b7280"
}

export default function GitHubPage() {
  const [username, setUsername] = useState("")
  const [userData, setUserData] = useState<GitHubUser | null>(null)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchGitHubData("fabpot")
  }, [])

  const fetchGitHubData = async (user: string) => {
    setLoading(true)
    setError("")

    try {
      // Fetch user data
      const userResponse = await fetch(`/api/github/user?username=${encodeURIComponent(user)}`)
      if (!userResponse.ok) {
        throw new Error("User not found")
      }
      const user_data = await userResponse.json()
      setUserData(user_data)

      // Fetch repositories
      const reposResponse = await fetch(`/api/github/repos?username=${encodeURIComponent(user)}`)
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories")
      }
      const repos_data = await reposResponse.json()
      setRepositories(repos_data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      fetchGitHubData(username.trim())
    }
  }

  // Process data for charts
  const topReposByStars = repositories
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .map((repo) => ({
      repo: repo.name.length > 15 ? repo.name.substring(0, 15) + "..." : repo.name,
      stars: repo.stargazers_count,
    }))

  const languageData = repositories.reduce(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const pieData = Object.entries(languageData).map(([name, value]) => ({
    name,
    value,
  }))

  const repoSizeData = repositories
    .sort((a, b) => b.size - a.size)
    .slice(0, 10)
    .map((repo) => ({
      name: repo.name.length > 15 ? repo.name.substring(0, 15) + "..." : repo.name,
      size: Math.round(repo.size / 1024), // Convert to MB
    }))

  const starsForksData = repositories.slice(0, 10).map((repo) => ({
    name: repo.name.length > 10 ? repo.name.substring(0, 10) + "..." : repo.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm" className="hover:bg-slate-100">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl">
                  <Github className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                    GitHub Analytics
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-slate-500">
                    <Activity className="h-3 w-3" />
                    <span>Developer Insights</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-100 to-zinc-100 px-4 py-2 rounded-full mb-6">
            <Code className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">GitHub Profile Analytics</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-zinc-600 bg-clip-text text-transparent mb-4">
            Explore Developer Profiles
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Analyze GitHub profiles with comprehensive repository insights, language distributions, and contribution
            patterns
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Search className="h-6 w-6 mr-3 text-slate-600" />
              GitHub User Search
            </CardTitle>
            <CardDescription>Enter a GitHub username to analyze their profile and repositories</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-4">
              <Input
                type="text"
                placeholder="Enter GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 h-12 border-2 border-slate-200 focus:border-slate-400 rounded-xl"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white rounded-xl"
              >
                {loading ? "Searching..." : "Analyze"}
              </Button>
            </form>
            {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}
          </CardContent>
        </Card>

        {loading && (
          <Card className="mb-8 border-0 shadow-xl">
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
                  <span className="text-lg font-medium text-slate-700">Fetching GitHub data...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {userData && (
          <>
            {/* User Profile */}
            <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-slate-800 via-slate-700 to-zinc-700 text-white">
              <CardContent className="py-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  <img
                    src={userData.avatar_url || "/placeholder.svg"}
                    alt={userData.name || userData.login}
                    className="w-32 h-32 rounded-full border-4 border-white/20"
                  />
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">{userData.name || userData.login}</h2>
                    <p className="text-slate-300 text-lg mb-4">@{userData.login}</p>
                    {userData.bio && <p className="text-slate-200 mb-4 text-lg">{userData.bio}</p>}
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                      {userData.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{userData.location}</span>
                        </div>
                      )}
                      {userData.blog && (
                        <div className="flex items-center space-x-1">
                          <LinkIcon className="h-4 w-4" />
                          <a href={userData.blog} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {userData.blog}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {new Date(userData.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold">{userData.public_repos}</div>
                      <div className="text-slate-300 text-sm">Repositories</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userData.followers}</div>
                      <div className="text-slate-300 text-sm">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{userData.following}</div>
                      <div className="text-slate-300 text-sm">Following</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Top Repositories by Stars */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-slate-600" />
                    Top Repositories by Stars
                  </CardTitle>
                  <CardDescription>Most starred repositories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topReposByStars}>
                      <defs>
                        <linearGradient id="starsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={CHART_COLORS[1]} stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="repo" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="stars" fill="url(#starsGradient)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Language Distribution */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-slate-600" />
                    Language Distribution
                  </CardTitle>
                  <CardDescription>Programming languages used across repositories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Repository Sizes */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-slate-600" />
                    Repository Sizes
                  </CardTitle>
                  <CardDescription>Largest repositories by size (MB)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={repoSizeData}>
                      <defs>
                        <linearGradient id="sizeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={CHART_COLORS[2]} stopOpacity={0.8} />
                          <stop offset="95%" stopColor={CHART_COLORS[3]} stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="size" fill="url(#sizeGradient)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Stars vs Forks */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-slate-600" />
                    Stars vs Forks
                  </CardTitle>
                  <CardDescription>Repository engagement comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={starsForksData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "none",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="stars"
                        stroke={CHART_COLORS[0]}
                        strokeWidth={3}
                        dot={{ fill: CHART_COLORS[0], strokeWidth: 2, r: 4 }}
                        name="Stars"
                      />
                      <Line
                        type="monotone"
                        dataKey="forks"
                        stroke={CHART_COLORS[1]}
                        strokeWidth={3}
                        dot={{ fill: CHART_COLORS[1], strokeWidth: 2, r: 4 }}
                        name="Forks"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Repository Details */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/30">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-slate-600" />
                  Top Repository Details
                  <Badge variant="secondary" className="ml-auto bg-slate-100 text-slate-700">
                    {repositories.length} Repositories
                  </Badge>
                </CardTitle>
                <CardDescription>List of Repositories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {repositories.map((repo) => (
                    <div
                      key={repo.id}
                      className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-800 mb-1">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-slate-600 hover:underline"
                            >
                              {repo.name}
                            </a>
                          </h3>
                          {repo.description && (
                            <p className="text-slate-600 text-sm mb-3 leading-relaxed">{repo.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        {repo.language && (
                          <div className="flex items-center space-x-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></div>
                            <span className="text-slate-600">{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-slate-600">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GitFork className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-600">{repo.forks_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-600">{repo.watchers_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-500">Size:</span>
                          <span className="text-slate-600">{Math.round(repo.size / 1024)} MB</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-600">
                            Updated {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
