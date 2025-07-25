import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Mail, Github, Linkedin, GraduationCap, Code, Award, BookOpen } from "lucide-react"

export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
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
                <User className="h-6 w-6 text-indigo-600" />
                <span className="text-lg font-semibold text-gray-900">About the Author</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <User className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Aisha Yaqub</h1>
          <p className="text-xl text-gray-600">Software Development Student & Data Visualization Enthusiast</p>
        </div>

        {/* About Section */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              I'm a passionate Software Development student at the University of Glasgow with a keen interest in data
              visualization and modern web technologies. This project represents my exploration into creating
              comprehensive web applications that demonstrate data visualization through appropriate coding practices
              using real-world APIs and modern development frameworks.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through this data visualization platform, I've gained hands-on experience in integrating live APIs,
              processing diverse data types, and creating interactive visualizations that tell meaningful stories. The
              project showcases my ability to work with different data sources - from environmental data through weather
              APIs to developer metrics via GitHub's API - and transform them into engaging, user-friendly interfaces.
            </p>
            <p className="text-gray-700 leading-relaxed">
              My focus on creating educational tutorial content alongside the technical implementation demonstrates my
              commitment to knowledge sharing and helping others understand the principles of effective data
              visualization and API integration.
            </p>
          </CardContent>
        </Card>

        {/* Academic Background */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Academic Background
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900">Glasgow Caledonian University</h3>
                  <p className="text-indigo-700">Software Development</p>
                </div>
              </div>
              <p className="text-indigo-800 mb-4">
                Currently pursuing comprehensive studies in software development, with particular focus on:
              </p>
              <ul className="text-indigo-700 space-y-2">
                <li>• Modern web development frameworks and technologies</li>
                <li>• Data science, Data structures, algorithms, and software engineering principles</li>
                <li>• API design and integration methodologies</li>
                <li>• User interface design and user experience optimization</li>
                <li>• Database design and data management systems</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Technologies */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Technical Skills & Technologies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Frontend Development</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React & Next.js 14</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• HTML5 & CSS3</li>
                  <li>• Responsive Design</li>
                  <li>• Component Libraries (shadcn/ui)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Data & APIs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• RESTful API Integration</li>
                  <li>• Data Processing & Transformation</li>
                  <li>• Error Handling & Validation</li>
                  <li>• Real-time Data Fetching</li>
                  <li>• API Authentication Methods</li>
                  <li>• Data Structure Analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-purple-600">Data Visualization</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Recharts Library</li>
                  <li>• Interactive Chart Design</li>
                  <li>• Chart Type Selection</li>
                  <li>• Color Theory Application</li>
                  <li>• Performance Optimization</li>
                  <li>• Responsive Visualizations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Highlights */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Project Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Technical Implementation</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Successfully integrated two distinct live APIs</li>
                  <li>• Implemented responsive, interactive visualizations</li>
                  <li>• Created comprehensive error handling systems</li>
                  <li>• Developed user-friendly interfaces with modern design</li>
                  <li>• Applied performance optimization techniques</li>
                  <li>• Implemented proper TypeScript typing throughout</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Educational Content</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Created comprehensive tutorial documentation</li>
                  <li>• Explained data sourcing methodologies</li>
                  <li>• Demonstrated visualization technique selection</li>
                  <li>• Provided real-world implementation examples</li>
                  <li>• Covered best practices and optimization strategies</li>
                  <li>• Made complex concepts accessible to learners</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mt-6">
              <h4 className="font-semibold mb-3 text-indigo-900">Project Impact</h4>
              <p className="text-indigo-800 text-sm leading-relaxed">
                This data visualization platform demonstrates the practical application of software development
                principles in creating meaningful, interactive web applications. By combining two different data sources
                (weather and GitHub APIs), the project showcases versatility in handling diverse data types and
                implementing appropriate visualization strategies for each context.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Connect With Me</CardTitle>
            <CardDescription>
              Feel free to reach out for collaboration, questions, or discussions about this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-gray-600 text-sm">aisha.yaqub@student.gla.ac.uk</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Github className="h-5 w-5 text-gray-800" />
                <div>
                  <p className="font-semibold text-sm">GitHub</p>
                  <p className="text-gray-600 text-sm">github.com/aishayaqub</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Linkedin className="h-5 w-5 text-blue-700" />
                <div>
                  <p className="font-semibold text-sm">LinkedIn</p>
                  <p className="text-gray-600 text-sm">linkedin.com/in/aishayaqub</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-semibold text-sm">University</p>
                  <p className="text-gray-600 text-sm">Glasgow Caledonian University</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-center">
              <p className="text-sm">
                <strong>Academic Year:</strong> Currently enrolled in Software Development programme
              </p>
              <p className="text-sm mt-1">
                <strong>Project Focus:</strong> Data visualization through appropriate coding practices
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
