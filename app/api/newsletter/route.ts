export async function POST(req) {
    try {
      const body = await req.json();
  
      const googleRes = await fetch("https://script.google.com/macros/s/AKfycbyPeylSzOUqZswg6QvHsbAaz2NOZwEQFx6Zxp-xlYu77fSlkKpncWbIqdwVjir2A0Ji/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      const result = await googleRes.json();
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ result: "error", message: error.toString() }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  