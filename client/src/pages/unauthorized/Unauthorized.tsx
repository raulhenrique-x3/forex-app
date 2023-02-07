import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Stack, Image, useTheme } from "@chakra-ui/react";

export const Unauthorized = () => {
  const theme = useTheme();

  return (
    <Box textAlign="center" height="100vh" padding="2rem" backgroundColor={theme.colors.gray[600]}>
      <Image
        src="https://images.unsplash.com/photo-1593837293639-3f3f7e9741b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80"
        width="100%"
      />
      <Stack spacing="1rem">
        <Heading as="h1" fontSize="2rem">
          Desculpe, você não está autorizado a acessar esta página
        </Heading>
        <Text fontSize="1.5rem" fontWeight="500">
          Por favor, volte para a página inicial
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="teal"
          variant="outline"
          _hover={{ bg: "teal.500" }}
          _active={{ bg: "teal.600" }}
        >
          Voltar para a página Inicial
        </Button>
      </Stack>
    </Box>
  );
};
