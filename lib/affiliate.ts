export function generateAffLink(product: any) {
  const base = `https://shopee.vn/product/${product.shopid}/${product.id}`;

  // TODO: thay bằng link aff thật của bạn
  return `${base}?utm_source=aff&utm_medium=tool&utm_campaign=auto`;
}
