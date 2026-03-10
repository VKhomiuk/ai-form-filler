# AI Form Filler

A smart product creation form that uses **Claude AI** to auto-fill product details for an e-commerce web shop. Enter a product name and let AI generate descriptions, pricing, specs, and more.

## Features

- **AI Auto-fill** — type a product name, click "Auto-fill with AI", and Claude fills all fields
- **Structured output** — uses Zod schema + AI SDK `generateObject` for reliable JSON responses
- **13 product fields** — name, description, category, brand, price, SKU, weight, dimensions, material, color, tags, and more
- **Smart context** — preserves already-filled fields and asks Claude to keep them
- **Form validation** — Zod + react-hook-form for type-safe validation
- **Loading states** — spinner feedback while AI is working

## Getting Started

### Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=your_key_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── api/fill-form/route.ts    # POST endpoint — Claude generates product data
│   ├── globals.css                # Tailwind v4 theme variables
│   ├── layout.tsx                 # Root layout with Geist font
│   └── page.tsx                   # Main page with ProductForm
├── components/
│   ├── product-form.tsx           # Product form with AI auto-fill button
│   └── ui/
│       ├── button.tsx             # Button component (CVA variants)
│       ├── card.tsx               # Card layout components
│       ├── input.tsx              # Input component
│       ├── label.tsx              # Label component (Radix)
│       └── textarea.tsx           # Textarea component
└── lib/
    ├── product-schema.ts          # Zod schema + field definitions
    └── utils.ts                   # cn() helper
```

## How It Works

1. User enters a product name (e.g. "iPhone 16 Pro Max")
2. Clicks **"Auto-fill with AI"**
3. The app sends the name + any pre-filled fields to `/api/fill-form`
4. Claude generates structured product data using `generateObject` with a Zod schema
5. The form fields are populated with the AI response

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Your Anthropic API key |

## Tech Stack

- **Next.js 16** — App Router, TypeScript
- **Vercel AI SDK** — `generateObject` with structured output
- **Claude Sonnet 4.6** — Anthropic's latest model
- **Tailwind CSS v4** — styling
- **react-hook-form** + **Zod** — form handling and validation
- **Radix UI** — accessible primitives
- **lucide-react** — icons

## License

MIT
