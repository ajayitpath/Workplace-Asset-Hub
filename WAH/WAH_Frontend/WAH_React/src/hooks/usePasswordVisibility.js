import { useState } from 'react';

const usePasswordVisibility = (initialState = false) => {
  const [showPassword, setShowPassword] = useState(initialState);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return {
    showPassword,
    togglePasswordVisibility
  };
};

export default usePasswordVisibility;