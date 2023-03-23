import React, { FormEvent, useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import "./SearchBox.scss";

const SearchBox = () => {
  const [adresse, setAdresse] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Adresse internet de site recherchée : ${adresse}`);
    // Ici, ajoutez le code pour effectuer la recherche
  };

  return (
    <Box
      sx={{
        width: "50%",
        height: "15%",
        maxWidth: "600px",
        bgcolor: "background.paper",
        borderRadius: "4px",
        boxShadow: 8,
        p: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: 'space-between', 
          height: '100%',
          width: '100%'
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Saisissez l’adresse internet de site
          que vous voulez verifier
        </Typography>
        <TextField
          fullWidth
          required
          label="https://example.ltd/"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" fullWidth>
          Recherchez
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBox;
