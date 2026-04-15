
import { Product } from "@/types/product";

export function generateAffLink(product: Product): string {
  return `https://shopee.vn/product/${product.shopid}/${product.id}?utm_source=aff&utm_medium=tool`;
}
