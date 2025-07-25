import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowLeft, Database, Code, BarChart3, Globe, Cloud, Github } from "lucide-react"

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-semibold text-gray-900">Learning Tutorials</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Visualization Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn how to create a comprehensive web application that demonstrates data visualization through appropriate
            coding practices. This tutorial covers live API integration, data processing, and modern visualization
            techniques using real-world examples.
          </p>
        </div>

        {/* Tutorial Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Data Sourcing & API Integration</CardTitle>
              <CardDescription>
                Learn how to find, access, and integrate live data sources through APIs. Covers both weather data and
                GitHub API implementations with real code examples.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/tutorials/data-sourcing">Start Tutorial</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Visualization Techniques</CardTitle>
              <CardDescription>
                Master the art of selecting and applying suitable visualizations to represent different types of data.
                Includes interactive charts, responsive design, and best practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/tutorials/visualization">Start Tutorial</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Project Overview Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Project Overview
            </CardTitle>
            <CardDescription>Understanding the complete data visualization web application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-purple-600">Application Architecture</h3>
              <p className="text-gray-600 mb-4">
                This web application demonstrates how to visualize data through appropriate coding practices by
                implementing two distinct data visualization dashboards:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Weather Analytics Dashboard</h4>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• OpenWeatherMap API integration</li>
                    <li>• Real-time weather data visualization</li>
                    <li>• Global country and city selection</li>
                    <li>• Temperature trends and forecasting</li>
                    <li>• Interactive charts and maps</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Github className="h-5 w-5 text-gray-800 mr-2" />
                    <h4 className="font-semibold text-gray-800">GitHub Analytics Dashboard</h4>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• GitHub REST API integration</li>
                    <li>• Developer profile analysis</li>
                    <li>• Repository statistics and metrics</li>
                    <li>• Programming language distribution</li>
                    <li>• Interactive data visualizations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-600">Key Learning Outcomes</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-2">Technical Skills</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Live API data integration</li>
                    <li>• Data structure analysis and processing</li>
                    <li>• Error handling and validation</li>
                    <li>• Responsive web design</li>
                    <li>• Modern React development patterns</li>
                    <li>• TypeScript implementation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Visualization Concepts</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Appropriate chart type selection</li>
                    <li>• Interactive data presentation</li>
                    <li>• Color theory and accessibility</li>
                    <li>• Performance optimization</li>
                    <li>• User experience design</li>
                    <li>• Data storytelling techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Sources Section */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Live Data Sources Implementation</CardTitle>
            <CardDescription>
              Two different API sources demonstrating diverse data visualization approaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-800 mb-2">Weather Data Source</h4>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>API:</strong> OpenWeatherMap API
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Data Type:</strong> Real-time environmental data
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Visualizations:</strong> Temperature trends, humidity levels, weather condition distributions,
                  geographic data representation
                </p>
                <div className="bg-blue-50 p-3 rounded text-xs">
                  <strong>Implementation Highlights:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Global country/city selection interface</li>
                    <li>• Real-time data fetching with error handling</li>
                    <li>• Multiple chart types (area, bar, pie charts)</li>
                    <li>• Responsive design with interactive elements</li>
                  </ul>
                </div>
              </div>

              <div className="border-l-4 border-gray-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">Developer Data Source</h4>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>API:</strong> GitHub REST API
                </p>
                <p className="text-gray-600 text-sm mb-2">
                  <strong>Data Type:</strong> Developer profile and repository metrics
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <strong>Visualizations:</strong> Repository statistics, language distributions, contribution patterns,
                  comparative analysis
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs">
                  <strong>Implementation Highlights:</strong>
                  <ul className="mt-1 space-y-1">
                    <li>• Dynamic user profile analysis</li>
                    <li>• Repository data aggregation and processing</li>
                    <li>• Multiple visualization types (bar, pie, line charts)</li>
                    <li>• Comprehensive data presentation interface</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technologies Used */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Technologies & Implementation Stack
            </CardTitle>
            <CardDescription>Modern web development technologies used in this project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Frontend Framework</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 14 (App Router)</li>
                  <li>• React 18 with TypeScript</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• shadcn/ui component library</li>
                  <li>• Responsive design principles</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Visualization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Recharts library</li>
                  <li>• Interactive chart components</li>
                  <li>• Custom tooltip implementations</li>
                  <li>• Responsive chart containers</li>
                  <li>• Color-coded data representation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">API Integration</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• OpenWeatherMap API</li>
                  <li>• GitHub REST API</li>
                  <li>• Next.js API routes</li>
                  <li>• Error handling and validation</li>
                  <li>• Real-time data fetching</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
