"use client";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  input: {
    color: "white !important",
    border: "grey",
    background: "#282828",
  },
});

export function AuthForm({ isSignInPage, data, action }) {
  const styles = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {data.error && <p style={{ color: "red" }}>{data.error}</p>}
      <form action={action}>
      <TextField
          className={styles.input}
          placeholder="Email or username"
          name="email"
          id="outlined-adornment-password"
        />
        <TextField
          id="outlined-start-adornment"
          placeholder="Password"
          type={showPassword ? "password" : "text"}
          name="password"
          className={styles.input}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Button type="submit" variant="contained">
          SignIn
        </Button>
      </form>
    </>
  );
}
