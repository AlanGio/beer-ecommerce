import Item from "../components/item";

import {
  CircularProgress,
  Container,
  Box,
  Typography,
  ThemeProvider,
} from "@mui/material";
import Header from "../components/header";
import { theme } from "../setup/theme";
import { getProducts } from "../setup/connection";

export default function Home() {
  const [{ data, loading, error }] = getProducts();

  if (error) {
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
        <Header />
        {!loading ? (
          <Box sx={{ gap: 2, display: "flex", flexDirection: "column", p: 2 }}>
            <Typography variant="subtitle1">Hi Mr. Michael,</Typography>
            <Typography variant="h2">Welcome Back!</Typography>
            <Typography variant="h3">Our Products</Typography>

            <Box
              component="ul"
              sx={{
                display: "flex",
                p: 0,
                gap: 2,
                flexWrap: "wrap",
                "& > li": { flex: "calc(50% - 16px)" },
                justifyContent: "center",
              }}
            >
              {data.map((product) => (
                <Item
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  brand={product.brand}
                />
              ))}
            </Box>
          </Box>
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc(50% - 25px)",
              left: "calc(50% - 25px)",
            }}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}
