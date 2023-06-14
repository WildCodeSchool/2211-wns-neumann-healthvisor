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
  useGetProfileQuery,
} from "../../gql/generated/schema";
import { Stack } from "@mui/system";
import CardPage from "../CardPage/CardPage";
import { message } from "../../functions/addFlash";

interface ApiResponse {
  status: string;
  date: string;
  responseTime: number;
  screenshot: string;
}

const SearchBox = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [urlRequested, setUrlRequested] = useState("");

  const { data: currentUser, refetch } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  const [getPage] = useGetPageMutation();
  const [addPageToUser] = useAddPageToUserMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const p = await getPage({ variables: { data: { url } } });
      setResponse({
        status: p.data?.getPage.status as string,
        date: p.data?.getPage.date,
        responseTime: p.data?.getPage.responseTime as number,
        screenshot: p.data?.getPage.screenshot as string,
      });
      setUrlRequested(url);
      setLoading(false);
      message("ca marche", "success");
    } catch (err) {
      console.log(err);
      setLoading(false);
      message(err?.toString() as string, "error");
    }
  };

  const registerHistoryPageToUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await addPageToUser({
        variables: {
          url: {
            url,
          },
        },
      });

      setResponse({
        status: res.data?.addPageToUser.status as string,
        date: res.data?.addPageToUser.date,
        responseTime: res.data?.addPageToUser.responseTime as number,
        screenshot: res.data?.addPageToUser.screenshot as string,
      });
      await refetch();
      setUrlRequested(url);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
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
          onSubmit={
            currentUser !== null ? registerHistoryPageToUser : handleSubmit
          }
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
            <CardPage infos={response} url={urlRequested} />
          ) : (
            <div></div>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
          >
            Recherchez
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default SearchBox;
