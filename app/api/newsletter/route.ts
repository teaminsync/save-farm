import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const googleRes = await fetch(
      "https://script.google.com/macros/s/AKfycbyPeylSzOUqZswg6QvHsbAaz2NOZwEQFx6Zxp-xlYu77fSlkKpncWbIqdwVjir2A0Ji/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    )

    const result = await googleRes.json()
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json({ result: "error", message: (error as Error).toString() }, { status: 500 })
  }
}
