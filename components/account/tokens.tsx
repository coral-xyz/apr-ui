import { memo, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import formatDate from "../../utils/format-date";
import { Key } from "@mui/icons-material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey["700"],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

/**
 * Delete specific access token
 * @param id access token key id
 */
async function deleteTokenOnClick(id: string) {
  await fetch(`/api/keys/`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}

function Tokens() {
  const [accessTokenName, setAccessTokenName] = useState("");
  const [accessTokenError, setAccessTokenError] = useState(false);
  const [newAccessToken, setNewAccessToken] = useState("");
  const { data: keys = [] } = useSWR("/api/keys", fetcher, {
    refreshInterval: 5000,
  });

  async function generateNewTokenOnClick() {
    if (accessTokenName.length === 0) {
      setAccessTokenError(true);
      return;
    }

    setAccessTokenError(false);

    const response = await fetch("/api/keys/", {
      method: "POST",
      body: JSON.stringify({ name: accessTokenName }),
    });

    const data = await response.json();

    setNewAccessToken(data.plaintext);
  }
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box mb={2}>
          {newAccessToken && (
            <TextField
              label="Access Token"
              value={newAccessToken}
              sx={{ width: 500 }}
              variant="outlined"
              helperText="This token never will be displayed again."
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Key />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            marginBottom: 3,
            gap: 2,
            display: "flex",
          }}
        >
          <TextField
            error={accessTokenError}
            helperText={accessTokenError ? "Access token name is required" : ""}
            label="Give it a name"
            variant="filled"
            size="small"
            value={accessTokenName}
            sx={{ height: 20 }}
            onChange={(e) => setAccessTokenName(e.target.value)}
          />
          <button
            onClick={() => generateNewTokenOnClick()}
            className="rounded-md bg-gray-900 py-3 px-5 text-sm uppercase text-gray-100"
          >
            Generate new Access Token
          </button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Token</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Created</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.token_name}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(row.created_at)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16, width: 100 }}
                    onClick={() => deleteTokenOnClick(row.id)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

interface TokensProps {
  keys: Token[];
}

interface Token {
  token_name: string;
  id: string;
  name: string;
  created_at: string;
}

export default memo(Tokens);
