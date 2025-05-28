import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import clsx from "clsx";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <div className={clsx("mb-4 w-full", className)}>
      <TextField
        className={clsx("form-input")}
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default FormInput;
