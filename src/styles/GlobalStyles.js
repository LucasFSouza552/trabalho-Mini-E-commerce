import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f8fafc;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
  }

  .product-card {
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .page-transition {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .cart-item {
    transition: all 0.3s ease;
  }
  
  .cart-item:hover {
    background-color: #f8fafc;
  }
  
  .dropdown:hover .dropdown-menu {
    display: block;
  }
`;

export default GlobalStyles;