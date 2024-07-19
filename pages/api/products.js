import products from "../../apis/products";

export default function handler(req, res) {
  const { id } = req.query;

  if (id) {
    const productsFiltered = products.find((item) => item.id.toString() === id);
    res.status(200).json({ ...productsFiltered });
  } else {
    res.status(200).json([...products]);
  }
}
