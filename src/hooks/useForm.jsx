import { useState } from "react";

const useForm = (initialState) => {
  const [input, setInput] = useState(initialState);

  // Handle Change Input
  const handleChangeInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const resetForm = () => {
    setInput(initialState);
  };
  return { input, setInput, handleChangeInput, resetForm };
};

export default useForm;
