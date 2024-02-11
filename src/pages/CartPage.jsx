import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Text, Button } from '@chakra-ui/react';
import { removeFromCart } from '../store/cart.reducer';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Box px="4rem" py="3rem">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Shopping Cart
      </Text>

      {cartItems.length === 0 ? (
        <Text>No items in the cart.</Text>
      ) : (
        <Box>
          {cartItems.map((item) => (
            <Box key={item.product.id} mb="4">
              <Text>{item.product.name}</Text>
              <Text>${item.product.price} x {item.quantity}</Text>
              <Button onClick={() => handleRemoveFromCart(item.product.id)} ml="2">
                Remove
              </Button>
            </Box>
          ))}

          <Button mt="4">
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;