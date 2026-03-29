"use client";

import TextField from "@mui/material/TextField";

type Props = {
  onSearch: (value: string) => void;
};

//search bar element
export default function Search({ onSearch }: Props): React.ReactElement {
  return (
    <TextField
      label="Search"
      variant="outlined"
      size="small"
      onChange={(e) => onSearch(e.target.value)}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "25px",
        },
      }}
    />
  );
}
