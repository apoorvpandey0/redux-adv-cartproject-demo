import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const productsList = [
  {
    id: 1,
    name: "Test Iteme",
    description: "Description!",
    quantity: 3,
    totalPrice: 18,
    price: 6,
  },
  {
    id: 2,
    name: "Test Item2",
    description: "Description!",
    quantity: 3,
    totalPrice: 18,
    price: 7,
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productsList.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
