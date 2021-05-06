import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

function FormInput({ register, control, name, label, errorobj }) {
  let isError = false;
  let errorMessage = "";

  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
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
          {...field} />
      } />
  );
}

export default FormInput;