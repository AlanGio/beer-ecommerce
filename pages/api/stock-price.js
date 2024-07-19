import stock from "../../apis/stock-price";

export default function handler(req, res) {
  const { sku } = req.query;

  if (sku) {
    res.status(200).json(stock[sku]);
  } else {
    res.status(200).json(stock);
  }
}
