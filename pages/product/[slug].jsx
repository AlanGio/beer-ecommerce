import { useRouter } from "next/router";

import { Container, Box, Typography, ThemeProvider } from "@mui/material";
import Header from "../../components/header";
import { theme } from "../../setup/theme";

export default function Home() {
  const router = useRouter();

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: "#FAFAFA" }}>
        <Header leftButton="back" rightButton="more" title="Detail" />

        {router.query.slug}

        <Box
          sx={{
            width: "100%",
            height: 240,
            textAlign: "center",
            "& img": { width: "fit-content", height: "90%" },
          }}
        >
          <img src={`/images/Budweiser-img.png`} alt="Modelo Especial" />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h2">Budweiser</Typography>
            <Typography variant="h2" sx={{ color: "primary.main" }}>
              $36.90
            </Typography>
          </Box>
          <Typography variant="subtitle1">
            Origin: Import | Stock: 456
          </Typography>

          <Typography variant="h3" sx={{ mt: 2 }}>
            Description
          </Typography>
          <Typography variant="subtitle1">Bla bla</Typography>

          <Typography variant="h3" sx={{ mt: 2 }}>
            Size
          </Typography>
          <Typography variant="subtitle1">Bla bla</Typography>
        </Box>

        <Box
          sx={{ gap: 2, display: "flex", flexDirection: "column", p: 2 }}
        ></Box>
      </Container>
    </ThemeProvider>
  );
}
