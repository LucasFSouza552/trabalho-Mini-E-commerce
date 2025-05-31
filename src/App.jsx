import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get('https://fakestoreapi.com/users/1'); // Simulando busca do usuário atual
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          if (error.response?.status === 401) {
            handleLogout();
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [isAuthenticated]);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setUser(null);
    setCart([]);
  };

  const addToCart = async (productId) => {
    if (!isAuthenticated) {
      return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setCart([...cart, { ...response.data, quantity: 1 }]);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (isLoading) {
    return <LoadingContainer>Carregando...</LoadingContainer>;
  }

  return (
    <Router>
      <AppContainer>
        <Navbar 
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
        <Main>
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  onAddToCart={addToCart}
                  selectedCategory={selectedCategory}
                  isAuthenticated={isAuthenticated}
                />
              } 
            />
            <Route 
              path="/produto/:id" 
              element={
                <ProductPage 
                  onAddToCart={addToCart}
                  isAuthenticated={isAuthenticated}
                />
              } 
            />
            <Route 
              path="/carrinho" 
              element={
                isAuthenticated ? (
                  <CartPage 
                    cart={cart} 
                    onRemove={removeFromCart}
                    onUpdateQuantity={updateCartQuantity}
                    onClearCart={clearCart}
                  />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
            <Route 
              path="/auth" 
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthPage onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/perfil" 
              element={
                isAuthenticated ? (
                  <ProfilePage user={user} />
                ) : (
                  <Navigate to="/auth" replace />
                )
              } 
            />
          </Routes>
        </Main>
        <Footer />
      </AppContainer>
    </Router>
  );
};

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eef2f6;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: #666666;
`;

export default App;