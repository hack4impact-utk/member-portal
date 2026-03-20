"use client";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { useState } from "react";

type Props = {
  onFilter: (filters: { year: string; major: string }) => void;
};

export default function FilterMenu({ onFilter }: Props): React.ReactElement {
  // filter state
  const [year, setYear] = useState("");
  const [major, setMajor] = useState("");

  // menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (): void => {
    setAnchorEl(null);
  };

  //handles clearing filters
  const handleClear = (): void => {
    setYear("");
    setMajor("");
    onFilter({ year: "", major: "" }); // Sends empty strings to parent to reset table
    closeMenu();
  };

  return (
    // filter button
    <div>
      <Button variant="outlined" onClick={openMenu}>
        Filter
      </Button>

      {/* Filter Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {/* Year Search */}
        <MenuItem>
          <TextField
            label="Year"
            variant="outlined"
            onChange={(e) => setYear(e.target.value)}
            size="small"
          />
        </MenuItem>

        {/* Major Search */}
        <MenuItem>
          <TextField
            label="Major"
            variant="outlined"
            onChange={(e) => setMajor(e.target.value)}
            size="small"
          />
        </MenuItem>

        {/* Apply Filters */}
        <MenuItem
          onClick={() => {
            closeMenu();
            onFilter({ year, major });
          }}
        >
          Apply Filters
        </MenuItem>
        <MenuItem onClick={handleClear}>Clear All</MenuItem>
      </Menu>
    </div>
  );
}
