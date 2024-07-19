import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Header({ leftButton, rightButton, title }) {
  const router = useRouter();

  const topLeftButton = () => {
    if (leftButton === "back") {
      return router.back();
    } else {
      return router.push("/products");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        pt: 2,
      }}
    >
      <IconButton aria-label="delete" size="small" onClick={topLeftButton}>
        {leftButton === "back" ? (
          <img src="/images/back.svg" alt="Back" />
        ) : (
          <img src="/images/menu-icon.svg" alt="Menu" />
        )}
      </IconButton>

      {title && <Typography variant="h3">{title}</Typography>}

      {rightButton === "more" ? (
        <img src="/images/more.svg" alt="More" />
      ) : (
        <Avatar alt="Remy Sharp" src="/images/avatar.jpg" />
      )}
    </Box>
  );
}
