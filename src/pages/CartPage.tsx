import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeFromCart,
  selectCartItems,
  selectTotalPrice,
  updateQuantity,
} from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotalPrice);

  if (items.length === 0) {
    return (
      <p className="note">
        Giỏ hàng đang trống. <Link to="/">Xem sản phẩm</Link>
      </p>
    );
  }

  return (
    <>
      <h1>Giỏ hàng</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-row">
            <img src={product.image} alt={product.title} />
            <div className="cart-info">
              <Link to={`/products/${product.id}`}>{product.title}</Link>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="qty">
              <button className="btn btn-ghost" onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }))}>−</button>
              <span>{quantity}</span>
              <button className="btn btn-ghost" onClick={() => dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }))}>+</button>
            </div>
            <strong className="line-total">${(product.price * quantity).toFixed(2)}</strong>
            <button className="btn btn-ghost" onClick={() => dispatch(removeFromCart(product.id))}>Xoá</button>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Tổng tiền: <strong>${total.toFixed(2)}</strong></span>
        <Link to="/checkout" className="btn btn-primary">Thanh toán</Link>
      </div>
    </>
  );
}
