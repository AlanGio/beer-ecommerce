import { Avatar, Box, IconButton, Typography } from "@mui/material";

export default function Header({ leftButton, rightButton, title }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        pt: 2,
      }}
    >
      <IconButton aria-label="delete" size="small">
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
