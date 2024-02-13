import React, { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Text,
  Heading,
  SimpleGrid,
  Spacer,
  Box,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

const ProductList = ({ category, bgColor }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(
        db,
        "categories",
        category,
        "products"
      );
      const q = query(productsCollection);

      try {
        const querySnapshot = await getDocs(q);
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
        console.log(productList);
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <Box px="6rem" bg={bgColor} py="3rem">
      <Heading
        textAlign={"center"}
        textTransform={"capitalize"}
        mb="3rem"
        id={category}
      >
        {category}
      </Heading>
      <Spacer />
      <SimpleGrid columns={{ sm: 2, md: 4 }} spacing="2rem">
        {products.map((product) => (
          <LinkBox>
            <LinkOverlay
              href={`/categories/${category}/products/${product.id}`}
            >
              <Card variant={"unstyled"} bg={bgColor}>
                <CardBody>
                  <Image
                    src={product.imageURL}
                    alt="product"
                    borderRadius="lg"
                    objectFit="cover"
                  />
                  <Stack mt="6">
                    <Heading size="md">{product.name}</Heading>
                    <Text>{product.description.slice(0, 60)}...</Text>
                    <Text fontSize="2xl">${product.price}</Text>
                  </Stack>
                </CardBody>
              </Card>
            </LinkOverlay>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
