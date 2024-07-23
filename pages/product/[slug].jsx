import Footer from "../../components/footer";

import { useRouter } from "next/router";
const { useState, useEffect } = require("react");

import {
  Box,
  CircularProgress,
  Container,
  Chip,
  Typography,
  ThemeProvider,
} from "@mui/material";
import Header from "../../components/header";
import { theme } from "../../setup/theme";
import { getProducts, getSku } from "../../setup/connection";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function Home() {
  const router = useRouter();
  const [stock, setStock] = useState(null);
  const [size, setSize] = useState(null);
  const itemId = router.query.slug && router.query.slug.split("-")[0];

  const [{ data: product, loading, error }, refetch] = getProducts(
    `/?id=${itemId}`,
    { manual: !itemId }
  );

  const [{ data: sku, loading: loadingSku, error: errorSku }, refetchSku] =
    getSku(`/?sku=${size}`, { manual: !size });

  useEffect(() => {
    itemId && refetch();
  }, [itemId]);

  useEffect(() => {
    size && refetchSku();
  }, [size]);

  useEffect(() => {
    setStock(sku);
  }, [sku]);

  useEffect(() => {
    if (product && product.skus) {
      setSize(product.skus[0].code);
    }
  }, [product]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      size && refetchSku();
    }, 5000);

    return () => clearInterval(intervalId); //This is important
  }, [size]);

  if (error || errorSku) {
    return (
      <pre>
        <h3>Error</h3>
        <h4>Status code: {error?.response.status}</h4>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </pre>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ minWidth: 420 }}>
        <Header leftButton="back" rightButton="more" title="Detail" />

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
                product?.image.substr(0, product?.image.lastIndexOf(".")) +
                ".png"
              }`}
              alt={product?.brand}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 14 }}
          >
            {stock && (
              <>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h2">{product.brand}</Typography>
                  <Typography variant="h2" sx={{ color: "primary.main" }}>
                    {formatter.format(stock.price)}
                  </Typography>
                </Box>
                <Typography variant="subtitle1">
                  Origin: {product?.origin} | Stock: {stock.stock}
                </Typography>
              </>
            )}

            <Typography variant="h3" sx={{ mt: 2 }}>
              Description
            </Typography>
            <Typography variant="subtitle1">{product?.information}</Typography>

            <Typography variant="h3" sx={{ mt: 2 }}>
              Size
            </Typography>

            {stock && (
              <>
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
                <Footer
                  brand={product?.brand}
                  sku={size}
                  price={formatter.format(stock.price)}
                />
              </>
            )}

            {(loading || loadingSku) && (
              <CircularProgress
                sx={{
                  position: "absolute",
                  bottom: 80,
                  left: "calc(50% - 25px)",
                }}
              />
            )}
          </Box>
        </>
      </Container>
    </ThemeProvider>
  );
}
