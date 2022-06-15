import { memo } from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.dark, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.3),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

function SearchComponent({ height = 1, data }: SearchComponentProps) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <Search>
        <Autocomplete
          freeSolo
          id="search"
          onChange={(event: any, newValue: string | null) => {
            const address = newValue.split("- ")[1];
            router.push(`/program/${address}`);
          }}
          options={data.map(
            (option: any) => `${option.name} - ${option.address}`
          )}
          renderInput={(params) => {
            return (
              <StyledInputBase
                {...params.InputProps}
                sx={{
                  paddingTop: height,
                  paddingBottom: 1,
                  width: 500,
                }}
                placeholder="Search for programs or apps"
                {...params}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                  </InputAdornment>
                }
              />
            );
          }}
        />
      </Search>
    </Box>
  );
}

interface SearchComponentProps {
  data: object[];
  height?: number;
}

export default memo(SearchComponent);
