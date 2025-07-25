import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")

  if (!city) {
    return Response.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    // Use the provided API key directly
    const API_KEY = "ee5223a1a88cbfa5d39174e08dbc676e"

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

    console.log("Fetching weather data for:", city)
    console.log("API URL:", url.replace(API_KEY, "***API_KEY***"))

    const response = await fetch(url, {
      headers: {
        "User-Agent": "DataViz-Platform/1.0",
      },
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.text()
      console.error("API Error Response:", errorData)

      if (response.status === 404) {
        throw new Error("City not found. Please check the spelling and try again.")
      } else if (response.status === 401) {
        throw new Error("Weather service authentication failed. Please try again later.")
      } else if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.")
      } else {
        throw new Error(`Weather data not available (Status: ${response.status})`)
      }
    }

    const data = await response.json()
    console.log("Successfully fetched weather data for:", data.name)
    return Response.json(data)
  } catch (error) {
    console.error("Weather API Error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 },
    )
  }
}
