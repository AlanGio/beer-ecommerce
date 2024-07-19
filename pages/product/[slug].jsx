import productStock from "../../apis/stock-price.js";
import products from "../../apis/products";

import { useRouter } from "next/router";
const { useState, useEffect } = require("react");

import {
  Box,
  Button,
  Container,
  Chip,
  Typography,
  ThemeProvider,
  IconButton,
} from "@mui/material";
import Header from "../../components/header";
import { theme } from "../../setup/theme";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Home() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(null);
  const [size, setSize] = useState(null);

  const itemId = router.query.slug && router.query.slug.split("-")[0];

  useEffect(() => {
    if (itemId) {
      const findProd = products.find((item) => item.id.toString() === itemId);
      findProd && setProduct(findProd);

      if (findProd) {
        const findStock = productStock[Number(findProd.skus[0].code)];
        findStock && setStock(findStock);
        setSize(findProd.skus[0].code);
      }
    }
  }, [itemId]);

  useEffect(() => {
    setStock(productStock[size]);
  }, [size]);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header leftButton="back" rightButton="more" title="Detail" />

        {product ? (
          <>
            <Box
              sx={{
                width: "100%",
                height: 240,
                textAlign: "center",
                "& img": { width: "fit-content", height: "90%" },
              }}
            >
              <img
                src={`/images/detail${
                  product.image.substr(0, product.image.lastIndexOf(".")) +
                  ".png"
                }`}
                alt={product.brand}
              />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h2">{product.brand}</Typography>
                <Typography variant="h2" sx={{ color: "primary.main" }}>
                  {formatter.format(stock.price)}
                </Typography>
              </Box>
              <Typography variant="subtitle1">
                Origin: {product.origin} | Stock: {stock.stock}
              </Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                Description
              </Typography>
              <Typography variant="subtitle1">{product.information}</Typography>

              <Typography variant="h3" sx={{ mt: 2 }}>
                Size
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                {product.skus.map((sku) => (
                  <Chip
                    label={sku.name}
                    variant="outlined"
                    color={size === sku.code ? "primary" : "default"}
                    onClick={() => setSize(sku.code)}
                  />
                ))}
              </Box>
            </Box>

            <Box
              position="fixed"
              color="primary"
              sx={{
                top: "auto",
                bottom: 0,
                display: "flex",
                alignItems: "center",
                width: "calc(100% - 50px)",
                gap: 2,
              }}
            >
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                sx={{ flex: 0 }}
              >
                <img src="/images/add-to-bag.svg" alt="Back" />
              </IconButton>
              <Button
                variant="contained"
                disableElevation
                size="large"
                sx={{
                  borderRadius: 3,
                  p: 1.8,
                  flex: 2,
                  textTransform: "none",
                }}
              >
                Add to cart
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h2">Loading...</Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}
