import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const topic = (await request.json())['topic']
  if (!topic) return new Response('Invalid input', {status: 400})

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: `A bright illustration of '${topic}' without any text with smooth edges using this color pallete: #faf6ee, #ffffff, rgb(253, 127, 127), #746bd3, #d6ccff. Do not generate colors in circles.`,
    n: 1,
    size: "1024x1024",
  });
  const image_url = response.data[0].url;

  return new Response(JSON.stringify({image_url}), {
    status: 200,
  });
}
