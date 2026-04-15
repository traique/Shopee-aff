export async function searchShopee(keyword: string) {
  try {
    const api = `https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword=${encodeURIComponent(
      keyword
    )}&limit=10`;

    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(api)}`;

    const res = await fetch(proxyUrl, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
        "accept-language": "vi-VN,vi;q=0.9",
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
        sold: item.item_basic.historical_sold || 0,
      })) || []
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
