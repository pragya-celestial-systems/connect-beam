"use client";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { redirect } from "next/navigation";

const useStyles = makeStyles({
  navbar: {
    background: "#222222",
    color: "lightgrey",
  },
});

export function Navbar() {
  const styles = useStyles();

  function handleNavigateToSignIn() {
    redirect('/sign-in');
  }

  function handleNaviagateToHome() {
    redirect('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className={styles.navbar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={handleNaviagateToHome}
          >
            ConnectBeam
          </Typography>
          <Button color="inherit" onClick={handleNavigateToSignIn}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
