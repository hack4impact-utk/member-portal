"use client";

import TextField from "@mui/material/TextField";

//search bar element
export default function Search({ onSearch }: any){
    
    return (
        <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => onSearch(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
    },
  }}
        />
    )
};