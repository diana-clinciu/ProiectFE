import * as yup from "yup";

const productSchema = yup.object({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Invalid price value"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(
      ["cakes", "cupcakes", "cookies"],
      'Category must be "cakes", "cupcakes", or "cookies"'
    ),
  description: yup
    .string()
    .required("Description is required")
    .max(200, "Description should have at most 200 characters"),
  // image: yup.mixed().required("Product image is required"),
});

export default productSchema;
