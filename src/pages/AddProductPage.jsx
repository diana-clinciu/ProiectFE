import React, { useState } from "react";
import {
  FormControl,
  Center,
  Heading,
  Input,
  FormLabel,
  Button,
  Select,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Formik, Form, Field } from "formik";
import productSchema from "../schemas/addProductPage";

const AddProductPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSubmit = async (values, actions) => {
    try {
      // add product image to fire storage
      const storage = getStorage();
      const filename = `${uuidv4()}.${uploadedImage.name.split(".")[1]}`;
      const imageRef = ref(storage, `images/${filename}`);

      await uploadBytes(imageRef, uploadedImage);

      const imageURL = await getDownloadURL(imageRef);
      console.log(`imageURL: ${imageURL}`);

      // add product to firestore
      const product = {
        name: values.name,
        price: values.price,
        description: values.description,
        imageURL: imageURL,
      };

      await addDoc(
        collection(db, "categories", values.category, "products"),
        product
      );

      console.log("Product added!");
    } catch (error) {
      console.error("Eroare while trying to add product:", error);
    }

    actions.setSubmiting(false);
  };

  return (
    <Center flexDirection="column" height="100vh">
      <Center flexDirection="column" p="20">
        <Heading>Add Product</Heading>

        <Formik
          initialValues={{
            name: "",
            category: "",
            price: "",
            description: "",
            image: null,
          }}
          validationSchema={productSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              {/* product name */}
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel>Product name</FormLabel>
                    <Input {...field} placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* product category */}
              <Field name="category">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.category && form.touched.category}
                  >
                    <FormLabel>Categoty</FormLabel>
                    <Select {...field} placeholder="select the category">
                      <option value="cakes">Cakes</option>
                      <option value="cookies">Cookies</option>
                      <option value="cupcakes">Cupcakes</option>
                    </Select>
                    <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* product price */}
              <Field name="price">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.price && form.touched.price}
                  >
                    <FormLabel>Price</FormLabel>
                    <Input {...field} placeholder="price" />
                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* product description */}
              <Field name="description">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel>Description</FormLabel>
                    <Textarea {...field} placeholder="description" />
                    <FormErrorMessage>
                      {form.errors.description}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* product image */}
              <FormLabel>Image</FormLabel>
              <Input
                bg="white"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setUploadedImage(e.target.files[0]);
                  console.log(uploadedImage);
                }}
              />

              <Button mt={4} isLoading={props.isSubmitting} type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Center>
    </Center>
  );
};

export default AddProductPage;
