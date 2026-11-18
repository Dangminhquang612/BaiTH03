import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const product = items.find((p) => String(p.id) === id);

  if (status === 'idle' || status === 'loading') return <p className="note">Đang tải sản phẩm...</p>;
  if (!product) {
    return (
      <p className="note">
        Không tìm thấy sản phẩm. <Link to="/">Về trang chủ</Link>
      </p>
    );
  }

  return (
    <div className="detail">
      <div className="detail-img"><img src={product.image} alt={product.title} /></div>
      <div className="detail-info">
        <p className="card-cat">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>Thêm vào giỏ</button>
      </div>
    </div>
  );
}
