import { useNavigate } from "react-router-dom";
import {
  Button,
  VStack,
  Input,
  Center,
  Text,
  Heading,
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Stack,
  LinkBox,
  LinkOverlay,
  Container,
} from "@chakra-ui/react";
import Hero from "../components/Hero";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <Hero />
      </header>
      <Container my="4rem" textAlign={"center"}>
        <Heading mb="1rem">Our Products</Heading>
        <Text>
          Step into the delectable world of PinkiePie Backery, where we craft
          artisanal perfection and transform every moment into a celebration of
          flavor. Welcome to a place where every bite tells a story, and joy is
          always freshly baked.
        </Text>
      </Container>
      <Container maxW="7xl" mb="4rem">
        <SimpleGrid columns={{ sm: 1, md: 4 }} spacing="3rem">
          <LinkBox>
            <LinkOverlay href="/products">
              <Card variant={"unstyled"}>
                <CardBody>
                  <Image
                    src={require("../images/strawbery_short_cake.jpg")}
                    alt="product"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                  <Stack mt="6">
                    <Heading size="md">Cakes</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </LinkOverlay>
          </LinkBox>

          <LinkBox>
            <LinkOverlay href="/products">
              <Card variant={"unstyled"}>
                <CardBody>
                  <Image
                    src={require("../images/strawbery_short_cake.jpg")}
                    alt="product"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                  <Stack mt="6">
                    <Heading size="md">Cookies</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </LinkOverlay>
          </LinkBox>

          <LinkBox>
            <LinkOverlay href="/products">
              <Card variant={"unstyled"}>
                <CardBody>
                  <Image
                    src={require("../images/strawbery_short_cake.jpg")}
                    alt="product"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                  <Stack mt="6">
                    <Heading size="md">Cupcakes</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </LinkOverlay>
          </LinkBox>

          <LinkBox>
            <LinkOverlay href="/products">
              <Card variant={"unstyled"}>
                <CardBody>
                  <Image
                    src={require("../images/strawbery_short_cake.jpg")}
                    alt="product"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                  <Stack mt="6">
                    <Heading size="md">Ice cream</Heading>
                  </Stack>
                </CardBody>
              </Card>
            </LinkOverlay>
          </LinkBox>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default HomePage;
