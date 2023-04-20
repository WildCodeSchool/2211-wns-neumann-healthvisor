import React, { FormEvent, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import "./SearchBox.scss";
import {
  useGetPageMutation,
  // useFetchLastHistoryPageByIdQuery,
} from "../../gql/generated/schema";
import { Stack } from "@mui/system";

interface ApiResponse {
  id: number;
  status: string;
  date: string;
  responseTime: number;
  screenshot: string;
}

const SearchBox = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const [page] = useGetPageMutation();

  // const getLastHistory = async (id: number) => {
  //   const history = useFetchLastHistoryPageByIdQuery({
  //     variables: {
  //       fetchLastHistoryPageById: id,
  //     },
  //   });
  // };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await page({ variables: { data: { url } } }).then((p) => {
      setResponse({
          id: p.data?.getPage.id as number,
          status: p.data?.getPage.status as string,
          date: p.data?.getPage.date,
          responseTime: p.data?.getPage.responseTime as number,
          screenshot: p.data?.getPage.screenshot as string
      });
      // getLastHistory(p.data?.getPage.id)
      setLoading(false);
    });
    
    // console.log(await pageCreated);
  };

  return (
    <Box
      sx={{
        width: "50%",
        height: "fit-content",
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
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Saisissez l'URL internet de site que vous voulez verifier
        </Typography>
        <TextField
          fullWidth
          required
          label="https://example.ltd/"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          variant="outlined"
        />
        <Stack sx={{ width: "100%" }}>
          {loading ? <LinearProgress color="secondary" /> : ""}
        </Stack>
        {response !== null ? <div>
          <p>Status: {response?.status}</p>
          <p>ResponseTime: {response?.responseTime}ms</p>
          <p>Date: {response?.date}</p>
          <img style={{width: "100%", height: "auto", objectFit: "contain"}} src={`http://localhost:4000/screenshot/${response?.screenshot}.png`} />
        </div> : <div></div>}
        <Button type="submit" variant="contained" disabled={loading} fullWidth>
          Recherchez
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBox;
