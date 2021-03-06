import React from 'react';
import { Controller } from "react-hook-form";
import { TextField } from '@material-ui/core';

const FormDatePicker = ({ register, control, name, label, errorobj, ...otherProps }) => {

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
          type="date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          inputRef={register}
          error={isError}
          helperText={errorMessage}
          // InputProps={{ readOnly: true }}
          {...field}
          {...otherProps} />
      } />
  );
};

export default FormDatePicker;
