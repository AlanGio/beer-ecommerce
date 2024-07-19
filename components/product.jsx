import { Button, Box, Typography } from "@mui/material";

export default function Product({ brand, image, id }) {
  return (
    <Box
      component="li"
      sx={{
        width: 155,
        height: 195,
        bgcolor: "white",
        borderRadius: "12px 32px 12px 12px",
        "&:hover": {
          bgcolor: "#eee",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="subtitle1" sx={{ textAlign: "center", p: 1 }}>
        {brand}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: 122,
          textAlign: "center",
          "& img": { width: "fit-content", height: "90%" },
        }}
      >
        <img src={`/images/${image}`} alt="Modelo Especial" />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" sx={{ ml: 2 }}>
          $28.65
        </Typography>
        <Button
          variant="primary"
          sx={{
            width: "40px",
            height: "40px",
            minWidth: "40px",
            borderRadius: "8px 0px 8px 0px",
            fontSize: "1.6rem",
          }}
          size="small"
        >
          +
        </Button>
      </Box>
    </Box>
  );
}
