import { createAnthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

export const maxDuration = 60;

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

const productResponseSchema = z.object({
  name: z.string().describe("Full product name"),
  shortDescription: z.string().describe("Brief one-liner marketing description"),
  description: z.string().describe("Detailed product description for a web shop, 2-4 paragraphs"),
  category: z.string().describe("Product category hierarchy, e.g. Electronics > Smartphones"),
  brand: z.string().describe("Brand or manufacturer name"),
  price: z.string().describe("Estimated retail price as a number string, e.g. 1199.00"),
  currency: z.string().describe("Currency code, e.g. USD, EUR"),
  sku: z.string().describe("Generated SKU code based on product attributes"),
  weight: z.string().describe("Product weight with unit, e.g. 227g"),
  dimensions: z.string().describe("Product dimensions, e.g. 163 x 77.6 x 8.25 mm"),
  material: z.string().describe("Primary materials used"),
  color: z.string().describe("Product color or color options"),
  tags: z.string().describe("Comma-separated tags for search and filtering"),
});

export async function POST(req: Request) {
  try {
    const { query, existingData } = (await req.json()) as {
      query: string;
      existingData?: Record<string, string>;
    };

    if (!query?.trim()) {
      return new Response(
        JSON.stringify({ error: "Product name or description is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const filledFields = existingData
      ? Object.entries(existingData)
          .filter(([, v]) => v?.trim())
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      : "";

    const prompt = `You are a product data specialist for an e-commerce web shop. Based on the user's input, generate complete and accurate product information.

User input: "${query}"

${filledFields ? `Already filled fields (keep these values unless they seem incorrect):\n${filledFields}\n` : ""}

Fill in ALL fields with realistic, accurate data. For the price, use your best knowledge of current market prices. Generate a professional product description suitable for an online store. If you're unsure about specific values, provide reasonable estimates based on similar products.`;

    const result = await generateObject({
      model: anthropic("claude-sonnet-4-6"),
      schema: productResponseSchema,
      prompt,
    });

    return new Response(JSON.stringify(result.object), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[fill-form] Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
