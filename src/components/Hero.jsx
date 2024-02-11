import React from "react";
import styles from "./Hero.module.css";
import { Heading } from "@chakra-ui/react";
const Hero = () => {
  return (
    <div className={styles.hero}>
      <Heading>PinkiePie Backery</Heading>
      <p>Were all cakes are free and friendship is magic!</p>
    </div>
  );
};

export default Hero;
