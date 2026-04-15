export const dynamic = "force-dynamic";

import { parseCode } from "@/lib/parser";
import { searchShopee } from "@/lib/shopee";
import { generateAffLink } from "@/lib/affiliate";
import { getCache, setCache } from "@/lib/cache";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code") || "";

  const cached = getCache(code);
  if (cached) return Response.json(cached);

  const parsed = parseCode(code);
  if (!parsed) {
    return Response.json({ error: "Invalid code" });
  }

  const products = await searchShopee(parsed.keyword);

  const result = products
    .sort((a, b) => b.sold - a.sold)
    .map((p) => ({
      ...p,
      affLink: generateAffLink(p),
    }));

  setCache(code, result);

  return Response.json(result);
}
