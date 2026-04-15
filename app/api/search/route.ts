export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { parseCode } from "@/lib/parser";
import { searchShopee } from "@/lib/shopee";
import { generateAffLink } from "@/lib/affiliate";
import { getCache, setCache } from "@/lib/cache";
import { Product } from "@/types/product";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || "";

    const cached = getCache(code);
    if (cached) {
      return Response.json(cached as Product[]);
    }

    const parsed = parseCode(code);
    if (!parsed) {
      return Response.json({ error: "Invalid code" }, { status: 400 });
    }

    const products: Product[] = await searchShopee(parsed.keyword);

    const result: Product[] = products
      .sort((a, b) => b.sold - a.sold)
      .map((p) => ({
        ...p,
        affLink: generateAffLink(p),
      }));

    setCache(code, result);

    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
      }
