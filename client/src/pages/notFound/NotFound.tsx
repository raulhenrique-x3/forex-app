import { Box, Heading, Text, Button, Link, Image } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <Box>
      <Heading as="h1" size="xl">
        Página não encontrada
      </Heading>
      <Text>A página que você está tentando acessar não foi encontrada.</Text>
      <Image src="https://media.giphy.com/media/3og0IPx8bTUCRM7tDe/giphy.gif" />
      <Link href="/">
        <Button colorScheme="green" variant="outline">
          Voltar para Home
        </Button>
      </Link>
    </Box>
  );
};
