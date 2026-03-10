import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.string(),
  currency: z.string(),
  sku: z.string(),
  weight: z.string(),
  dimensions: z.string(),
  material: z.string(),
  color: z.string(),
  tags: z.string(),
  shortDescription: z.string(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const PRODUCT_FIELDS: {
  key: keyof ProductFormData;
  label: string;
  placeholder: string;
  type: "input" | "textarea";
}[] = [
  { key: "name", label: "Product Name", placeholder: "e.g. iPhone 16 Pro Max", type: "input" },
  { key: "shortDescription", label: "Short Description", placeholder: "Brief one-liner for the product", type: "input" },
  { key: "description", label: "Full Description", placeholder: "Detailed product description...", type: "textarea" },
  { key: "category", label: "Category", placeholder: "e.g. Electronics > Smartphones", type: "input" },
  { key: "brand", label: "Brand", placeholder: "e.g. Apple", type: "input" },
  { key: "price", label: "Price", placeholder: "e.g. 1199.00", type: "input" },
  { key: "currency", label: "Currency", placeholder: "e.g. USD", type: "input" },
  { key: "sku", label: "SKU", placeholder: "e.g. IPHONE-16PM-256-BLK", type: "input" },
  { key: "weight", label: "Weight", placeholder: "e.g. 227g", type: "input" },
  { key: "dimensions", label: "Dimensions", placeholder: "e.g. 163 x 77.6 x 8.25 mm", type: "input" },
  { key: "material", label: "Material", placeholder: "e.g. Titanium, Glass", type: "input" },
  { key: "color", label: "Color", placeholder: "e.g. Black Titanium", type: "input" },
  { key: "tags", label: "Tags", placeholder: "e.g. smartphone, apple, 5g, premium", type: "input" },
];
