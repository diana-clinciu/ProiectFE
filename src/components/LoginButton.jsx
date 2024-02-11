import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      ml="3rem"
      onClick={() => {
        navigate("/login");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
