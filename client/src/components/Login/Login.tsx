import React, { FormEvent, useState } from "react";
import {
  Container,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Avatar,
  Link,
} from "@mui/material";
import {
  useLoginUserMutation,
  useGetProfileQuery,
} from "../../gql/generated/schema";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface LoginComponentProps {
  isLogged: () => void;
}

const Login: React.FC<LoginComponentProps> = ({ isLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useLoginUserMutation();
  const { client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await loginUser({ variables: { data: { email, password } } });
    client.resetStore();
    isLogged();
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Se souvenir de moi"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Mot de passe oublié?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Pas de compte? Enregistrez-vous"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
