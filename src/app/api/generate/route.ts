export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://api.together.xyz/v1/images/generations",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "black-forest-labs/FLUX.1-schnell",
        prompt,
        steps: 10,
        n: 1,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(`Error: ${response.status} - ${errorText}`, {
      status: response.status,
    });
  }

  const data = await response.json();
  console.log("API response:", data);

  // Inspect data to find correct image URL path:
  // e.g. data.data[0].url or similar
  const imageUrl = data.data?.[0]?.url || "";

  return Response.json({ imageUrl });
}
