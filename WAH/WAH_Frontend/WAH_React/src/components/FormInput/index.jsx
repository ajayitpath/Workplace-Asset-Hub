import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import clsx from "clsx";

const FormInput = ({
  label,
  type = "text",
  name,
  register,
  error,
  className,
}) => {
  return (
    <div className={clsx("w-full", className)}>
      <TextField
        className={clsx("form-input")}
        label={label}
        type={type}
        error={!!error}
        helperText={error}
        {...register(name)}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default FormInput;
