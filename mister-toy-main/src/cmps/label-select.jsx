import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import React from 'react'

export function LabelSelect({ label, options, value, onChange }) {

    return (
        <Select
            value={value}
            onChange={onChange}
            displayEmpty
            inputProps={{ 'aria-label': label }}
        >
            <MenuItem value="">
                <em>{label}</em>
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </Select>
    )
}


