import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectTotalQuantity } from '../features/cart/cartSlice';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Header() {
  const totalQty = useAppSelector(selectTotalQuantity);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">ShopMini</Link>
        <nav className="nav">
          <Link to="/cart" className="cart-link">
            Giỏ hàng <span className="badge">{totalQty}</span>
          </Link>
          {user ? (
            <>
              <span className="username">Xin chào, {user.username}</span>
              <button className="btn btn-ghost" onClick={handleLogout}>Đăng xuất</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost">Đăng nhập</Link>
          )}
          <button className="btn btn-ghost" onClick={toggleTheme} aria-label="Đổi giao diện">
            {theme === 'light' ? 'Tối' : 'Sáng'}
          </button>
        </nav>
      </div>
    </header>
  );
}
