"use client";

import { useState } from "react";
import TextField from "@mui/material/TextField";

//search bar element
export default function Search(){
    
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <TextField
            label="Search"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
    },
  }}
        />
    )
};