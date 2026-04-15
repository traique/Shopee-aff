import { ShopeeResponseSchema } from "./schema";
import { Product } from "@/types/product";

export async function searchShopee(keyword: string): Promise<Product[]> {
  try {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 5000);

    const url = `https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword=${encodeURIComponent(
      keyword
    )}&limit=10`;

    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0",
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error("Shopee fetch failed");
    }

    const json = await res.json();

    const parsed = ShopeeResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error("Invalid Shopee data");
      return [];
    }

    return parsed.data.items.map((item) => ({
      id: item.item_basic.itemid,
      shopid: item.item_basic.shopid,
      name: item.item_basic.name,
      price: item.item_basic.price / 100000,
      image: item.item_basic.image,
      sold: item.item_basic.historical_sold || 0,
    }));
  } catch (err) {
    console.error("Shopee error:", err);
    return [];
  }
  }
