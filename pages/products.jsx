import products from "../apis/products";
import Item from "../components/item";

import { Container, Box, Typography, ThemeProvider } from "@mui/material";
import Header from "../components/header";
import { theme } from "../setup/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ minWidth: 420 }}>
        <Header />
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
            {products.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                image={product.image}
                brand={product.brand}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
