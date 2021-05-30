import React from "react";
import { MenuItem, TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import "./styles.css";

function FormSelect({ register, control, name, label, options, errorobj, onSelect, ...otherProps }) {
  let isError = false;
  let errorMessage = "";

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  const handleSelect = (value) => {
    if (onSelect){
      onSelect(value);
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) =>
        <TextField
          label={label}
          fullWidth={true}
          variant="outlined"
          inputRef={register}
          error={isError}
          helperText={errorMessage}
          select
          {...field}
          onChange={(value) => {field.onChange(value); handleSelect(value);} }
          {...otherProps} >
          {options.map((option, i) => {
            return (
              <MenuItem key={i} value={option.value}>
                {option.label}
              </MenuItem>
            )
          })}
        </TextField>
        } />
  );
}

export default FormSelect;