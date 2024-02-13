import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  Image,
  Text,
  Heading,
  SimpleGrid,
  Button,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart.reducer";

const ProductPage = () => {
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(
          db,
          "categories",
          category,
          "products",
          productId
        );
        const productSnapshot = await getDoc(productDoc);

        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        } else {
          console.error(`Product with ID ${productId} not found`);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [category, productId]);

  const handleAddToCart = () => {
    dispatch(addToCart({product, quantity}));
  };

  const handleAdd = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleSubstract = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box px="6rem" py="3rem">
      <SimpleGrid columns={2} spacing="6rem">
        <Box>
          <Image src={product.imageURL} alt={product.name} mb="2rem" />
          <Text>{product.description}</Text>
        </Box>
        <Box>
          <Heading fontSize="6xl" mb="1rem">
            {product.name}
          </Heading>
          <Text fontSize="3xl" mb="1rem">
            ${product.price}
          </Text>

          <Button onClick={handleSubstract} borderRadius="3xl">
            -
          </Button>

          <Box display="inline-block" width="2rem" textAlign="center" mx="1rem">{quantity}</Box>

          <Button onClick={handleAdd} borderRadius="3xl">
            +
          </Button>

          <Button onClick={handleAddToCart} ml="1rem">Add to cart</Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ProductPage;
