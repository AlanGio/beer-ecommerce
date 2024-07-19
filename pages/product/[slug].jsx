import stock from "../../apis/stock-price.js";
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

export default function Home() {
  const router = useRouter();
  const [size, setSize] = useState("12 - 24oz");
  const [product, setProduct] = useState(null);

  const itemId = router.query.slug && router.query.slug.split("-")[0];
  console.log(itemId);

  useEffect(() => {
    if (itemId) {
      const findProd = products.find((item) => item.id.toString() === itemId);
      findProd && setProduct(findProd);
    }
  }, [itemId]);

  console.log(product, "product!!");

  product && console.log();

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
                  $36.90
                </Typography>
              </Box>
              <Typography variant="subtitle1">
                Origin: {product.origin} | Stock: 456
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
