import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <div>
      <ProductList category={"cakes"} />
      <ProductList category={"cookies"} bgColor={"#dac4f7"}/>
      <ProductList category={"cupcakes"}/>
    </div>
  );
};

export default ProductsPage;
