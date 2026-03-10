"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SparklesIcon, Loader2Icon } from "lucide-react";
import { productSchema, type ProductFormData, PRODUCT_FIELDS } from "@/lib/product-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      currency: "USD",
      sku: "",
      weight: "",
      dimensions: "",
      material: "",
      color: "",
      tags: "",
      shortDescription: "",
    },
  });

  const handleAutoFill = async () => {
    const name = form.getValues("name");
    const description = form.getValues("description");
    const query = name || description;

    if (!query?.trim()) {
      setError("Enter a product name or description first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const existingData: Record<string, string> = {};
      for (const field of PRODUCT_FIELDS) {
        const val = form.getValues(field.key);
        if (val?.trim()) {
          existingData[field.key] = val;
        }
      }

      const res = await fetch("/api/fill-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, existingData }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to auto-fill");
      }

      const data = await res.json();

      for (const [key, value] of Object.entries(data)) {
        if (key in productSchema.shape && typeof value === "string") {
          form.setValue(key as keyof ProductFormData, value, { shouldDirty: true });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Product data:", data);
    alert("Product created! Check the console for data.");
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Create Product</CardTitle>
            <CardDescription className="mt-1.5">
              Enter a product name and let AI fill in the rest
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAutoFill}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <SparklesIcon className="size-4" />
            )}
            {isLoading ? "Filling..." : "Auto-fill with AI"}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {PRODUCT_FIELDS.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>{field.label}</Label>
              {field.type === "textarea" ? (
                <Textarea
                  id={field.key}
                  placeholder={field.placeholder}
                  rows={4}
                  {...form.register(field.key)}
                />
              ) : (
                <Input
                  id={field.key}
                  placeholder={field.placeholder}
                  {...form.register(field.key)}
                />
              )}
              {form.formState.errors[field.key] && (
                <p className="text-sm text-destructive">
                  {form.formState.errors[field.key]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Create Product
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Clear
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
