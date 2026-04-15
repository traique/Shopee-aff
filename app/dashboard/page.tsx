"use client";

import { useState } from "react";

export default function Page() {
  const [code, setCode] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setShowList(true);

    const res = await fetch(`/api/search?code=${code}`);
    const json = await res.json();

    setData(json);
    setLoading(false);
  };

  const copy = (link: string) => {
    navigator.clipboard.writeText(link);
    alert("Đã copy link!");
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

      {/* Toggle */}
      {data.length > 0 && (
        <button
          onClick={() => setShowList(!showList)}
          className="mt-3 text-sm text-gray-600"
        >
          {showList ? "Ẩn danh sách" : "Hiện danh sách"}
        </button>
      )}

      {/* Loading */}
      {loading && <p className="mt-3">Đang tải...</p>}

      {/* List */}
      {showList && (
        <div className="mt-4 space-y-3">
          {data.map((item, i) => (
            <div key={i} className="bg-white p-3 rounded shadow">
              <img
                src={`https://cf.shopee.vn/file/${item.image}`}
                className="w-full rounded"
              />

              <p className="font-semibold mt-2">{item.name}</p>

              <p className="text-red-500">{item.price}₫</p>

              <p className="text-xs text-gray-500">
                Đã bán: {item.sold}
              </p>

              <div className="flex gap-2 mt-2">
                <a
                  href={item.affLink}
                  target="_blank"
                  className="flex-1 text-center bg-green-500 text-white p-2 rounded text-sm"
                >
                  Mở link
                </a>

                <button
                  onClick={() => copy(item.affLink)}
                  className="flex-1 bg-gray-200 p-2 rounded text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
