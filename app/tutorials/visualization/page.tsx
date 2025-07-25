"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, PieChart, TrendingUp, Palette, Zap, Monitor, Cloud, Github } from "lucide-react"

export default function VisualizationTutorial() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
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
                <BarChart3 className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-gray-900">Visualization Techniques</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Visualization Techniques</h1>
          <p className="text-xl text-gray-600">
            Learn how to select and apply suitable visualizations to represent different types of data effectively. This
            tutorial covers real implementations from our weather and GitHub analytics dashboards.
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
                <h4 className="font-semibold mb-2">Part 1: Chart Selection & Implementation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Choosing appropriate chart types for data</li>
                  <li>• Real examples from weather & GitHub dashboards</li>
                  <li>• Interactive chart implementation</li>
                  <li>• Responsive design considerations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Part 2: Design & User Experience</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Color theory and accessibility</li>
                  <li>• Performance optimization techniques</li>
                  <li>• Interactive features and tooltips</li>
                  <li>• Mobile-responsive visualizations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Chart Type Selection */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              1. Selecting Appropriate Chart Types
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Data-Driven Chart Selection</h3>
              <p className="text-gray-600 mb-4">
                The key to effective data visualization is matching the right chart type to your data characteristics
                and the story you want to tell. Here's how we approached this in our implementations:
              </p>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center mb-2">
                    <Cloud className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-semibold text-blue-800">Weather Data Visualizations</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                        <h5 className="font-semibold text-sm">Area Charts - Temperature Trends</h5>
                      </div>
                      <p className="text-xs text-blue-700 mb-2">
                        <strong>Why:</strong> Perfect for showing temperature changes over time with smooth transitions
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> 24-hour temperature forecast with gradient fill to emphasize
                        the trend direction
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <BarChart3 className="h-4 w-4 text-blue-600 mr-1" />
                        <h5 className="font-semibold text-sm">Bar Charts - Humidity Levels</h5>
                      </div>
                      <p className="text-xs text-blue-700 mb-2">
                        <strong>Why:</strong> Ideal for comparing discrete humidity values across time periods
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Hourly humidity percentages with gradient bars for visual
                        appeal
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <PieChart className="h-4 w-4 text-blue-600 mr-1" />
                        <h5 className="font-semibold text-sm">Pie Charts - Weather Conditions</h5>
                      </div>
                      <p className="text-xs text-blue-700 mb-2">
                        <strong>Why:</strong> Shows the distribution of different weather conditions as parts of a whole
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Weather condition breakdown with custom color coding
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <Monitor className="h-4 w-4 text-blue-600 mr-1" />
                        <h5 className="font-semibold text-sm">Metric Cards - Current Conditions</h5>
                      </div>
                      <p className="text-xs text-blue-700 mb-2">
                        <strong>Why:</strong> Provides immediate access to key current weather metrics
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Temperature, humidity, wind speed, and visibility cards with
                        icons
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <div className="flex items-center mb-2">
                    <Github className="h-5 w-5 text-gray-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">GitHub Data Visualizations</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <BarChart3 className="h-4 w-4 text-gray-600 mr-1" />
                        <h5 className="font-semibold text-sm">Horizontal Bar Charts - Repository Stars</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        <strong>Why:</strong> Excellent for ranking repositories by popularity with easy label reading
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Top 10 repositories sorted by star count with gradient colors
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <PieChart className="h-4 w-4 text-gray-600 mr-1" />
                        <h5 className="font-semibold text-sm">Pie Charts - Language Distribution</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        <strong>Why:</strong> Shows programming language usage as proportions of total repositories
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Language breakdown with percentage labels and custom colors
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <BarChart3 className="h-4 w-4 text-gray-600 mr-1" />
                        <h5 className="font-semibold text-sm">Vertical Bar Charts - Repository Sizes</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        <strong>Why:</strong> Compares repository sizes effectively with clear magnitude differences
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Repository size comparison in MB with gradient fill
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <div className="flex items-center mb-1">
                        <TrendingUp className="h-4 w-4 text-gray-600 mr-1" />
                        <h5 className="font-semibold text-sm">Line Charts - Stars vs Forks</h5>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">
                        <strong>Why:</strong> Shows relationship between two related metrics across repositories
                      </p>
                      <div className="bg-white p-2 rounded text-xs">
                        <strong>Implementation:</strong> Dual-line comparison with different colors and interactive dots
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Implementation with Recharts */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              2. Implementation with Recharts Library
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Real Implementation Examples</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Weather Temperature Area Chart</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`<ResponsiveContainer width="100%" height={300}>
  <AreaChart data={temperatureData}>
    <defs>
      <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#00809d" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#00809d" stopOpacity={0.1} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="#fcecdd" />
    <XAxis dataKey="time" stroke="#6b7280" />
    <YAxis stroke="#6b7280" />
    <Tooltip contentStyle={{
      backgroundColor: "white",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    }} />
    <Area
      type="monotone"
      dataKey="temperature"
      stroke="#00809d"
      strokeWidth={3}
      fill="url(#temperatureGradient)"
    />
  </AreaChart>
</ResponsiveContainer>`}</pre>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    <strong>Key Features:</strong> Gradient fill, custom tooltip styling, responsive container, and
                    smooth curves for temperature data.
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">GitHub Repository Horizontal Bar Chart</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`<ResponsiveContainer width="100%" height={350}>
  <BarChart data={topReposByStars} layout="horizontal" margin={{ left: 100 }}>
    <defs>
      <linearGradient id="starsGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="5%" stopColor="#932f67" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#d92c54" stopOpacity={0.8} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
    <XAxis type="number" stroke="#64748b" />
    <YAxis dataKey="name" type="category" stroke="#64748b" width={100} />
    <Tooltip contentStyle={{
      backgroundColor: "white",
      border: "none",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    }} />
    <Bar dataKey="stars" fill="url(#starsGradient)" radius={[0, 4, 4, 0]} />
  </BarChart>
</ResponsiveContainer>`}</pre>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Key Features:</strong> Horizontal layout for better label readability, gradient colors,
                    rounded corners, and proper margins.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Data Processing for Visualizations</h3>
              <p className="text-gray-600 mb-4">
                Proper data processing is crucial for effective visualizations. Here's how we transform raw API data:
              </p>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <pre>{`// Weather data processing for charts
const temperatureData = forecastData?.list.slice(0, 8).map((item) => ({
  time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { 
    hour: "2-digit", 
    minute: "2-digit" 
  }),
  temperature: Math.round(item.main.temp),
  humidity: item.main.humidity,
})) || []

// GitHub data processing for top repositories
const topReposByStars = repositories
  .sort((a, b) => b.stargazers_count - a.stargazers_count)
  .slice(0, 10)
  .map((repo) => ({
    name: repo.name.length > 15 ? repo.name.substring(0, 15) + "..." : repo.name,
    stars: repo.stargazers_count,
  }))`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Design Principles */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              3. Design Principles & User Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Color Strategy Implementation</h3>
              <p className="text-gray-600 mb-4">
                We implemented distinct color palettes for each dashboard to create visual identity and improve user
                experience:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Weather Dashboard Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#fdfbee] border rounded"></div>
                      <span className="text-sm">#fdfbee - Background cream</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#57b4ba] rounded"></div>
                      <span className="text-sm">#57b4ba - Primary teal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#015551] rounded"></div>
                      <span className="text-sm">#015551 - Dark teal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-[#fe4f2d] rounded"></div>
                      <span className="text-sm">#fe4f2d - Accent coral</span>
                    </div>
                  </div>
                  <p className="text-xs text-blue-700 mt-2">
                    <strong>Strategy:</strong> Ocean-inspired palette reflecting weather and environmental themes
                  </p>
                </div>

                <div className="border-l-4 border-gray-500 pl-4">
                  <h4 className="font-semibold text-gray-800 mb-2">GitHub Dashboard Colors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-slate-50 border rounded"></div>
                      <span className="text-sm">Slate-50 - Background</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-slate-700 rounded"></div>
                      <span className="text-sm">Slate-700 - Primary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-slate-900 rounded"></div>
                      <span className="text-sm">Slate-900 - Dark</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-zinc-600 rounded"></div>
                      <span className="text-sm">Zinc-600 - Accent</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    <strong>Strategy:</strong> Professional monochromatic scheme reflecting developer/technical themes
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Responsive Design Implementation</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800 text-sm mb-2">
                  <strong>Key Principle:</strong> All visualizations must work seamlessly across devices
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <h5 className="font-semibold text-sm mb-1">ResponsiveContainer Usage</h5>
                    <div className="bg-white p-2 rounded text-xs">
                      <code>{'<ResponsiveContainer width="100%" height={300}>'}</code>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Grid Layout Adaptation</h5>
                    <div className="bg-white p-2 rounded text-xs">
                      <code>{"grid md:grid-cols-2 lg:grid-cols-4"}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Interactive Features</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-800 text-sm">Custom Tooltips</h4>
                  <p className="text-blue-700 text-xs">
                    Enhanced tooltips with custom styling, rounded corners, and shadows for better user experience
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-green-800 text-sm">Hover Effects</h4>
                  <p className="text-green-700 text-xs">
                    Interactive elements with hover states, scale transforms, and color transitions
                  </p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <h4 className="font-semibold text-purple-800 text-sm">Loading States</h4>
                  <p className="text-purple-700 text-xs">
                    Smooth loading animations and skeleton states while data is being fetched
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Performance Optimization */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>4. Performance Optimization Techniques</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Optimization Strategies Implemented</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Data Processing</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Limit data points for large datasets (slice(0, 8))</li>
                    <li>• Use useMemo for expensive calculations</li>
                    <li>• Process data on the client side efficiently</li>
                    <li>• Implement data caching strategies</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Rendering Optimization</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Use React.memo for chart components</li>
                    <li>• Implement proper loading states</li>
                    <li>• Optimize re-renders with proper dependencies</li>
                    <li>• Use responsive containers for better performance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Code Example: Optimized Data Processing</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <pre>{`// Optimized data processing with useMemo
const filteredCountries = useMemo(() => {
  return WORLD_COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.continent.toLowerCase().includes(countrySearch.toLowerCase()),
  )
}, [countrySearch])

// Efficient chart data processing
const temperatureData = useMemo(() => 
  forecastData?.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit" 
    }),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
  })) || [], [forecastData]
)`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Implementation Success</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You've now learned how to create effective data visualizations by selecting appropriate chart types,
              implementing them with modern libraries, and optimizing for performance and user experience. The
              combination of weather and GitHub analytics demonstrates how different data types require different
              visualization approaches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/weather">Explore Weather Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/github">Explore GitHub Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
