import { Link, Outlet, useMatch } from "react-router-dom";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { Icon } from "@chakra-ui/react";
import { MdOutlineShoppingCart } from "react-icons/md";


const Navbar = () => {
  const homeMatch = useMatch("/");
  const counterMatch = useMatch("/counter");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <HStack bg="red.200" p="3" spacing="10">
        <Box p="3">
          <Link to="/">
            <Text
              color={homeMatch ? "white" : "black"}
              fontWeight="bold"
              fontSize="lg"
            >
              Home
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/addproduct">
            <Text
              color={counterMatch ? "white" : "black"}
              fontWeight="bold"
              fontSize="lg"
            >
              Add product
            </Text>
          </Link>
        </Box>

        <Box>
          <Link to="/products">
            <Text
              color={counterMatch ? "white" : "black"}
              fontWeight="bold"
              fontSize="lg"
            >
              Products
            </Text>
          </Link>
        </Box>

        <Box ml="auto">
          <Link to="/cart">
            <Icon as={MdOutlineShoppingCart} boxSize="1.5rem" color="white"/>
          </Link>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </Box>
      </HStack>

      <Outlet />
    </>
  );
};

export default Navbar;
