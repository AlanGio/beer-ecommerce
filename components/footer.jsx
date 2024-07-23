import { Box, Button, IconButton } from "@mui/material";

export default function Footer({ brand, sku, price }) {
  return (
    <Box
      position="fixed"
      color="primary"
      sx={{
        top: "auto",
        bottom: 0,
        display: "flex",
        alignItems: "center",
        width: "92%",
        gap: 2,
        backgroundColor: "white",
        maxWidth: 1200,
        minWidth: 420,
      }}
    >
      <IconButton color="secondary" aria-label="add an alarm" sx={{ flex: 0 }}>
        <img src="/images/add-to-bag.svg" alt="Back" />
      </IconButton>
      <Button
        variant="contained"
        disableElevation
        size="large"
        onClick={() => alert(`Added ${brand} [${sku}] (${price}) to cart`)}
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
  );
}
