import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchProducts());
  }, [status, dispatch]);

  const filtered = items.filter((p) => p.title.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <>
      <input
        className="input search"
        type="search"
        placeholder="Tìm sản phẩm theo tên..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status === 'loading' && <p className="note">Đang tải sản phẩm...</p>}
      {status === 'failed' && (
        <p className="note error">
          {error} <button className="btn btn-ghost" onClick={() => dispatch(fetchProducts())}>Thử lại</button>
        </p>
      )}
      {status === 'succeeded' && filtered.length === 0 && (
        <p className="note">Không có sản phẩm nào khớp với “{query}”.</p>
      )}
      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
