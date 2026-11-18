import { Link } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types';

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <article className="card">
      <Link to={`/products/${product.id}`} className="card-img">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <Link to={`/products/${product.id}`} className="card-title">{product.title}</Link>
        <p className="card-cat">{product.category}</p>
        <div className="card-foot">
          <strong>${product.price.toFixed(2)}</strong>
          <button className="btn btn-primary" onClick={() => dispatch(addToCart(product))}>
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </article>
  );
}
