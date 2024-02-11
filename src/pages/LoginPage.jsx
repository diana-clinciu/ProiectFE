import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const onLogin = async () => {
    try {

      // if (email === "admin@gmail.com") {
      //   dispatch(setRole("admin"));
      // } else {
      //   dispatch(setRole("user"));
      // }

      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
      setLoginError(error.message);
    }
  };

  return (
    <Center flexDirection="column" height="100vh">
      <Center
        flexDirection="column"
        p="20"
        bg="red.200"
        boxShadow="2"
        borderRadius="lg"
      >
        <Heading>Login</Heading>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            bg="white"
            type="email"
          />
        </FormControl>

        <FormControl mt="5">
          <FormLabel>Password</FormLabel>
          <Input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            bg="white"
            type="password"
          />
        </FormControl>

        {loginError && <Text color="red">{loginError}</Text>}

        <Text
          color="blue"
          onClick={() => {
            navigate("/register");
          }}
        >
          Do you need an account?
        </Text>

        <Button mt="5" onClick={onLogin}>
          Log in
        </Button>
      </Center>
    </Center>
  );
};

export default LoginPage;
