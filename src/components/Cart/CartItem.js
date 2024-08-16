import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { title, quantity, totalPrice, price } = props.item;
  const dispatch = useDispatch();

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={() => dispatch(cartActions.removeItem(props.item))}>
            -
          </button>
          <button onClick={() => dispatch(cartActions.addItem(props.item))}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
