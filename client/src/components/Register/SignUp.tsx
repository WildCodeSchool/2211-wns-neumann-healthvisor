import React, { FormEvent, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import {
  useLoginUserMutation,
  useGetProfileQuery,
  useCreateUserMutation,
} from "../../gql/generated/schema";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

interface SignUpComponentProps {
  isLogged: () => void;
}

const SignUp: React.FC<SignUpComponentProps> = ({ isLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const [createUser] = useCreateUserMutation();
  const [loginUser] = useLoginUserMutation();
  const { client } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!errorPassword) {
      await createUser({ variables: { data: { email, password } } });
      await loginUser({ variables: { data: { email, password } } });
      client.resetStore();
      isLogged();
    }
  };

  const verifyPassword = (confirmedPassword: string) => {
    setConfirmPassword(confirmedPassword);
    if (password !== confirmPassword) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
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
          Inscription
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
            inputProps={{ minLength: 8 }}
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            inputProps={{ minLength: 8 }}
            error={errorPassword}
            helperText={
              errorPassword ? "Les mots de passes ne correspondent pas." : ""
            }
            name="confirmPassword"
            label="Confirmation du mot de passe"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => verifyPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            S'inscrire
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
