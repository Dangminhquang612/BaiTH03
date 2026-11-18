import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { clearCart, selectCartItems, selectTotalPrice } from '../features/cart/cartSlice';

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectTotalPrice);
  const [success, setSuccess] = useState(false);

  if (success) {
    return (
      <p className="note success">
        Đặt hàng thành công! Cảm ơn bạn đã mua sắm. <Link to="/">Tiếp tục mua sắm</Link>
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="note">
        Chưa có sản phẩm để thanh toán. <Link to="/">Xem sản phẩm</Link>
      </p>
    );
  }

  const handleOrder = () => {
    dispatch(clearCart());
    setSuccess(true);
  };

  return (
    <>
      <h1>Thanh toán</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-row">
            <img src={product.image} alt={product.title} />
            <div className="cart-info"><span>{product.title}</span></div>
            <span>x{quantity}</span>
            <strong className="line-total">${(product.price * quantity).toFixed(2)}</strong>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <span>Tổng tiền: <strong>${total.toFixed(2)}</strong></span>
        <button className="btn btn-primary" onClick={handleOrder}>Đặt hàng</button>
      </div>
    </>
  );
}
