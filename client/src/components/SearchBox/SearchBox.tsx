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
  useAddPageToUserMutation,
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
  const [bgStatus, setBgStatus] = useState("");

  const [page] = useGetPageMutation();
  const [addPageToUserMutation] = useAddPageToUserMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await page({ variables: { data: { url } } })
      .then((p) => {
        setResponse({
          id: p.data?.getPage.id as number,
          status: p.data?.getPage.status as string,
          date: p.data?.getPage.date,
          responseTime: p.data?.getPage.responseTime as number,
          screenshot: p.data?.getPage.screenshot as string,
        });

        if (p.data?.getPage.status.startsWith("2")) {
          setBgStatus("green");
        } else setBgStatus("red");

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const registerHistoryPageToUser = async (e: FormEvent) => {
    e.preventDefault();
    const id = response?.id as number;
    await addPageToUserMutation({ variables: { historyId: id } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="search-box">
      <Box
        sx={{
          width: "100%",
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

          {response !== null ? (
            <div className="card">
              <p style={{ backgroundColor: bgStatus }}>
                Status: {response?.status}
              </p>
              <p>ResponseTime: {response?.responseTime}ms</p>
              <p>Date: {response?.date}</p>
              <img
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
                src={`${process.env.REACT_APP_SCREENSHOT_API}/${response?.screenshot}`}
              />
              <div className="button-wrapper">
                <Button
                  onClick={(e) => registerHistoryPageToUser(e)}
                  variant="contained"
                  disabled={loading}
                  color="success"
                >
                  Enregistrer
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => handleSubmit(e)}
                  disabled={loading}
                >
                  relancer
                </Button>
              </div>
            </div>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
            >
              Recherchez
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default SearchBox;
