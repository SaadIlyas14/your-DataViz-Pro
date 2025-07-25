import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get("username")

  if (!username) {
    return Response.json({ error: "Username parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "DataViz-App",
      },
    })

    if (!response.ok) {
      throw new Error("Repositories not found")
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    return Response.json({ error: "Failed to fetch repositories" }, { status: 500 })
  }
}
