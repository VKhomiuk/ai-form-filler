import { ProductForm } from "@/components/product-form";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">AI Form Filler</h1>
        <p className="mt-2 text-muted-foreground">
          Enter a product name and let Claude fill in the details
        </p>
      </header>
      <main className="w-full max-w-3xl">
        <ProductForm />
      </main>
    </div>
  );
}
