import React from "react";
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";


const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navbar = props => {
  const [show, setShow] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const handleToggle = () => setShow(!show);
  React.useEffect(() => {
    if(props.isLoggedIn === true){
      setLoggedIn(true);
    }
  }, [props.isLoggedIn])

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5} mb={-10}>
        <Link to="/">
          <Heading as="h1" size="lg">
            NightKit
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {isLoggedIn ? <div></div> : (<Link to="/login"><MenuItems>Login</MenuItems></Link>)}
        <Link to="/secured-page">
            <MenuItems>Secured Page</MenuItems>
        </Link>
        <Link to="/unsecured-page">
            <MenuItems>Unsecured Page</MenuItems>
        </Link>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {isLoggedIn ? (
        <Link to="/logout">
         <Button bg="transparent" border="1px">
          Logout
        </Button> 
        </Link>
        ) : (
        <Link to="/register">
        <Button bg="transparent" border="1px">
          Create account
        </Button>
        </Link>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
