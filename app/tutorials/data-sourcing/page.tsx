import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Database, Globe, Key, AlertCircle, CheckCircle, Code, Cloud, Github } from "lucide-react"

export default function DataSourcingTutorial() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" size="sm">
                <Link href="/tutorials">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tutorials
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900">Data Sourcing & API Integration</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Sourcing & API Integration</h1>
          <p className="text-xl text-gray-600">
            Learn how to find, access, and integrate live data sources into your web applications using real-world
            examples from our weather and GitHub analytics implementations.
          </p>
        </div>

        {/* Table of Contents */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Tutorial Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Part 1: Finding & Selecting Data Sources</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Identifying suitable APIs for your project</li>
                  <li>• Understanding data content and structure</li>
                  <li>• Evaluating API reliability and documentation</li>
                  <li>• Real examples: Weather & GitHub APIs</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Part 2: Implementation & Integration</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• API authentication and access methods</li>
                  <li>• Data fetching and processing techniques</li>
                  <li>• Error handling and validation strategies</li>
                  <li>• Live implementation examples</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Data Source Selection */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              1. Selecting Appropriate Data Sources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Project Requirements Analysis</h3>
              <p className="text-gray-600 mb-4">
                For this data visualization project, we needed two different data sources that would demonstrate diverse
                visualization techniques and API integration patterns. Here's how we selected our sources:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Weather Data Source</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">
                    <strong>Why chosen:</strong> Provides real-time, continuously changing data perfect for
                    demonstrating time-series visualizations and geographic data representation.
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>
                      • <strong>API:</strong> OpenWeatherMap API
                    </li>
                    <li>
                      • <strong>Data Type:</strong> Environmental/meteorological
                    </li>
                    <li>
                      • <strong>Update Frequency:</strong> Real-time
                    </li>
                    <li>
                      • <strong>Geographic Scope:</strong> Global coverage
                    </li>
                    <li>
                      • <strong>Visualization Potential:</strong> High (trends, maps, comparisons)
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Github className="h-5 w-5 text-gray-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">Developer Profile Data</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Why chosen:</strong> Offers structured, relationship-rich data ideal for demonstrating
                    statistical analysis and comparative visualizations.
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>
                      • <strong>API:</strong> GitHub REST API
                    </li>
                    <li>
                      • <strong>Data Type:</strong> Developer metrics/statistics
                    </li>
                    <li>
                      • <strong>Update Frequency:</strong> Dynamic (user-driven)
                    </li>
                    <li>
                      • <strong>Data Relationships:</strong> Complex (repos, languages, stats)
                    </li>
                    <li>
                      • <strong>Visualization Potential:</strong> High (distributions, comparisons)
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Data Content & Structure Analysis</h3>
              <p className="text-gray-600 mb-4">
                Understanding your data structure is crucial for effective visualization. Here's how we analyzed our
                chosen APIs:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Weather API Data Structure</h4>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// Current Weather Response Structure
{
  "name": "London",
  "main": {
    "temp": 15.2,
    "feels_like": 14.8,
    "humidity": 72,
    "pressure": 1013
  },
  "weather": [{
    "main": "Clouds",
    "description": "scattered clouds"
  }],
  "wind": { "speed": 3.5 },
  "visibility": 10000,
  "sys": { "country": "GB" }
}`}</pre>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>Key Insights:</strong> Nested structure with numerical data perfect for charts, categorical
                    data for grouping, and temporal data for trends.
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">GitHub API Data Structure</h4>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// Repository Response Structure
{
  "name": "awesome-project",
  "description": "An awesome project",
  "stargazers_count": 1250,
  "forks_count": 89,
  "language": "TypeScript",
  "size": 2048,
  "created_at": "2023-01-15T10:30:00Z",
  "updated_at": "2024-01-20T15:45:00Z"
}`}</pre>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Key Insights:</strong> Rich metadata with counts for statistical analysis, categorical
                    language data for distributions, and timestamps for activity tracking.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: API Access Implementation */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2" />
              2. API Access & Authentication Implementation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Authentication Methods Used</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">OpenWeatherMap API - API Key Authentication</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    Simple API key authentication passed as a query parameter or header.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// Weather API Route Implementation
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")
  
  const API_KEY = process.env.WEATHER_API_KEY
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
  
  const response = await fetch(url)
  const data = await response.json()
  return Response.json(data)
}`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold">GitHub API - Public Access</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    GitHub's public API allows unauthenticated requests with rate limiting, perfect for demonstration
                    purposes.
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// GitHub API Route Implementation
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")
  
  const response = await fetch(\`https://api.github.com/users/\${username}/repos\`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'DataViz-App'
    }
  })
  
  const data = await response.json()
  return Response.json(data)
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Best Practices Implementation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Environment Variables</h4>
                    <p className="text-gray-600 text-sm">Store API keys securely using Next.js environment variables</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Server-Side API Routes</h4>
                    <p className="text-gray-600 text-sm">
                      Use Next.js API routes to hide API keys from client-side code
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Error Handling</h4>
                    <p className="text-gray-600 text-sm">Implement comprehensive error handling for API failures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">Rate Limiting Awareness</h4>
                    <p className="text-gray-600 text-sm">Respect API rate limits and implement appropriate handling</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Data Processing */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              3. Data Processing & Transformation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Frontend Data Processing Examples</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Weather Data Processing</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Processing forecast data for temperature trend visualization:
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// Processing forecast data for charts
const temperatureData = forecastData?.list.slice(0, 8).map((item) => ({
  time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit" 
  }),
  temperature: Math.round(item.main.temp),
  humidity: item.main.humidity,
})) || []

// Processing weather conditions for pie chart
const weatherConditions = forecastData?.list.slice(0, 8).reduce((acc, item) => {
  const condition = item.weather[0].main
  acc[condition] = (acc[condition] || 0) + 1
  return acc
}, {} as Record<string, number>) || {}`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">GitHub Data Processing</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Aggregating repository data for language distribution analysis:
                  </p>
                  <div className="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto">
                    <pre>{`// Processing repositories for top starred projects
const topReposByStars = repositories
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 10)
  .map((repo) => ({
    name: repo.name.length > 15 ? repo.name.substring(0, 15) + "..." : repo.name,
    stars: repo.stargazers_count,
  }))

// Processing language distribution
const languageData = repositories.reduce((acc, repo) => {
  if (repo.language) {
    acc[repo.language] = (acc[repo.language] || 0) + 1
  }
  return acc
}, {} as Record<string, number>)`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Error Handling */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              4. Error Handling & Data Validation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Comprehensive Error Handling Strategy</h3>
              <div className="space-y-3">
                <div className="bg-red-50 border border-red-200 p-3 rounded">
                  <h4 className="font-semibold text-red-800">API Errors</h4>
                  <p className="text-red-700 text-sm">
                    Handle network failures, invalid responses, and API rate limits
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <h4 className="font-semibold text-yellow-800">Data Validation</h4>
                  <p className="text-yellow-700 text-sm">Validate API responses and handle missing or malformed data</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <h4 className="font-semibold text-blue-800">User Experience</h4>
                  <p className="text-blue-700 text-sm">Provide meaningful error messages and loading states</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Implementation Example</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <pre>{`// Frontend error handling implementation
const fetchWeatherData = async (cityName: string) => {
  setLoading(true)
  setError("")
  
  try {
    const response = await fetch(\`/api/weather?city=\${encodeURIComponent(cityName)}\`)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "Weather data not found")
    }
    
    const data = await response.json()
    setWeatherData(data)
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred")
  } finally {
    setLoading(false)
  }
}`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Now that you understand how to source and integrate live data from APIs, learn how to create effective
              visualizations to represent this data.
            </p>
            <Button asChild>
              <Link href="/tutorials/visualization">Continue to Visualization Tutorial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
