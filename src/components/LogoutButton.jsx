import React from "react";
import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

const LogoutButton = () => {
  return (
    <Button ml="3rem"
      onClick={() => {
        signOut(auth);
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
