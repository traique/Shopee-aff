"use client";

import { useState } from "react";

export default function Page() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

      const json = await res.json();

      const items =
        json?.items?.map((item: any) => ({
          id: item.item_basic.itemid,
          shopid: item.item_basic.shopid,
          name: item.item_basic.name,
          price: item.item_basic.price / 100000,
          image: item.item_basic.image,
          sold: item.item_basic.historical_sold || 0,
          affLink: `https://shopee.vn/product/${item.item_basic.shopid}/${item.item_basic.itemid}`,
        })) || [];

      setData(items);
    } catch (err) {
      console.error(err);
      alert("Lỗi fetch");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-lg font-bold mb-2">Shopee Aff Tool</h1>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="VD: CET-QTD-VAG"
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleSearch}
        className="w-full mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Tìm sản phẩm
      </button>

      {loading && <p className="mt-3">Đang tải...</p>}

      <div className="mt-4 space-y-3">
        {data.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded shadow">
            <img
              src={`https://cf.shopee.vn/file/${item.image}`}
              className="w-full rounded"
            />

            <p className="font-semibold mt-2">{item.name}</p>

            <p className="text-red-500">{item.price}₫</p>

            <button
              onClick={() => navigator.clipboard.writeText(item.affLink)}
              className="mt-2 w-full bg-green-500 text-white p-2 rounded"
            >
              Copy link
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
