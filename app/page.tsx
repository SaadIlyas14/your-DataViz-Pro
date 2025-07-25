import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Cloud, Github, BookOpen, User, TrendingUp, Database, Code } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DataViz Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/weather" className="text-gray-600 hover:text-blue-600 transition-colors">
                Weather Analytics
              </Link>
              <Link href="/github" className="text-gray-600 hover:text-blue-600 transition-colors">
                GitHub Analytics
              </Link>
              <Link href="/tutorials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Tutorials
              </Link>
              <Link href="/author" className="text-gray-600 hover:text-blue-600 transition-colors">
                Author
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Live Data <span className="text-blue-600">Visualization</span> Platform
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Explore real-time data through beautiful, interactive visualizations. Learn how to source, process, and
              visualize data from live APIs with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/weather">
                  <Cloud className="mr-2 h-5 w-5" />
                  Weather Analytics
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                <Link href="/github">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Analytics
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform demonstrating modern data visualization techniques with live API integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Real-time Data</CardTitle>
                <CardDescription>
                  Live API integration with weather and GitHub data sources for up-to-date visualizations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Interactive Charts</CardTitle>
                <CardDescription>
                  Beautiful, responsive charts and graphs built with modern visualization libraries
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Learning Tutorials</CardTitle>
                <CardDescription>
                  Comprehensive guides on data sourcing, API integration, and visualization techniques
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Multiple Data Sources</CardTitle>
                <CardDescription>
                  Integration with weather APIs and GitHub API demonstrating diverse data handling
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>Modern Tech Stack</CardTitle>
                <CardDescription>
                  Built with Next.js, TypeScript, and modern visualization libraries for optimal performance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Responsive Design</CardTitle>
                <CardDescription>
                  Fully responsive interface that works seamlessly across all devices and screen sizes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Data Sources</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore two different data visualization dashboards powered by real-time APIs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Weather Analytics</CardTitle>
                <CardDescription>
                  Real-time weather data visualization with temperature trends, humidity levels, and atmospheric
                  conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild className="w-full">
                  <Link href="/weather">Explore Weather Data</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Github className="h-8 w-8 text-gray-800" />
                </div>
                <CardTitle className="text-xl">GitHub Analytics</CardTitle>
                <CardDescription>
                  Repository statistics, commit activity, and development metrics from GitHub's public API
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild className="w-full">
                  <Link href="/github">Explore GitHub Data</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Learn?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Dive into our comprehensive tutorials to understand data sourcing, API integration, and visualization
            techniques
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/tutorials">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BarChart3 className="h-6 w-6" />
            <span className="text-lg font-semibold">DataViz Pro</span>
          </div>
          <p className="text-gray-400">
            A comprehensive data visualization platform demonstrating modern web development practices
          </p>
        </div>
      </footer>
    </div>
  )
}
