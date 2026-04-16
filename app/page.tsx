const handleSearch = async () => {
  setLoading(true);

  try {
    const keyword = code.replaceAll("-", " ");

    const api = `https://shopee.vn/api/v4/search/search_items?by=relevancy&keyword=${encodeURIComponent(
      keyword
    )}&limit=10`;

    const res = await fetch(
      "https://corsproxy.io/?" + encodeURIComponent(api)
    );

    const data = await res.json();

    if (!data || !data.items) {
      alert("Không lấy được dữ liệu");
      setLoading(false);
      return;
    }

    const items = data.items.map((item: any) => ({
      id: item.item_basic.itemid,
      shopid: item.item_basic.shopid,
      name: item.item_basic.name,
      price: item.item_basic.price / 100000,
      image: item.item_basic.image,
      sold: item.item_basic.historical_sold || 0,
      affLink: `https://shopee.vn/product/${item.item_basic.shopid}/${item.item_basic.itemid}`,
    }));

    setData(items);
  } catch (err) {
    console.error(err);
    alert("Lỗi fetch");
  }

  setLoading(false);
};
