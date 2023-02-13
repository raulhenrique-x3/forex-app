import { Link } from "react-router-dom";
import { Box, Text, Button, Stack, Container } from "@chakra-ui/react";

export const Unauthorized = () => {
  return (
    <Container>
      <Box textAlign="center" height="100vh" padding="2rem">
        <Stack spacing="1rem">
          <Text as="h1" fontSize="2rem">
            Sorry, you are not authorized to access this page.
          </Text>
          <Text fontSize="1.5rem" fontWeight="500">
            Please go back to the homepage
          </Text>
          <Button
            as={Link}
            to="/"
            variant="outline"
            _hover={{ bg: "#8236FD", color: "#ffffff" }}
            _active={{ bg: "teal.600" }}
          >
            Back to Home page
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};
