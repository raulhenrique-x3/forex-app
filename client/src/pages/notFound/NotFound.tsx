import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <Box>
      <Heading as="h1" size="xl">
        Página não encontrada
      </Heading>
      <Text>A página que você está tentando acessar não foi encontrada.</Text>
      <Link href="/">
        <Button colorScheme="green" variant="outline">
          Voltar para Home
        </Button>
      </Link>
    </Box>
  );
};
