export async function searchShopee(keyword: string) {
  try {
    const url = `https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword=${encodeURIComponent(
      keyword
    )}&limit=10`;

    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    const data = await res.json();

    return (
      data?.items?.map((item: any) => ({
        id: item.item_basic.itemid,
        shopid: item.item_basic.shopid,
        name: item.item_basic.name,
        price: item.item_basic.price / 100000,
        image: item.item_basic.image,
        sold: item.item_basic.historical_sold,
      })) || []
    );
  } catch (e) {
    console.error("Shopee error:", e);
    return [];
  }
}
