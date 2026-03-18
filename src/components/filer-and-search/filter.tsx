"use client";

import { useState } from "react";
import Button from '@mui/material/Button';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function FilterMenu({ onFilter }: any) {

    // filter state
    const [year, setYear] = useState("");
    const [major, setMajor] = useState("");

    // menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        // filter button
        <div>
            <Button
                variant="outlined"
                onClick={openMenu}
            >
                Filter
            </Button>

            {/* Filter Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
            >
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
            </Menu>
        </div>
    )
};