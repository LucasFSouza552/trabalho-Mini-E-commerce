import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const Navbar = ({ cartCount, categories, selectedCategory, onCategoryChange, isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    onLogout();
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsCategoryDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleUserMenuClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCategoryDropdownOpen(false);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Velora</Logo>
        
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavLinks isOpen={isMenuOpen}>
          <CategoryDropdown>
            <CategoryButton onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}>
              Categorias
            </CategoryButton>
            <DropdownMenu ref={categoryDropdownRef} isOpen={isCategoryDropdownOpen}>
              <DropdownItem
                selected={selectedCategory === ''}
                onClick={() => handleCategorySelect('')}
              >
                Todas as categorias
              </DropdownItem>
              {categories.map((category) => (
                <DropdownItem
                  key={category}
                  selected={selectedCategory === category}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </CategoryDropdown>

          <UserSection>
            {isAuthenticated ? (
              <UserDropdown>
                <UserButton onClick={handleUserMenuClick}>
                  <FaUser />
                  <span>{user?.name?.firstname || 'Usuário'}</span>
                </UserButton>
                <UserMenu ref={userDropdownRef} isOpen={isUserDropdownOpen}>
                  <UserMenuItem onClick={() => {
                    setIsUserDropdownOpen(false);
                    navigate('/perfil');
                  }}>
                    <FaUser />
                    <span>Meu Perfil</span>
                  </UserMenuItem>
                  <Divider />
                  <UserMenuItem onClick={handleLogout}>
                    <FaSignOutAlt />
                    <span>Sair</span>
                  </UserMenuItem>
                </UserMenu>
              </UserDropdown>
            ) : (
              <AuthButton to="/auth">
                <FaUser />
                <span>Entrar</span>
              </AuthButton>
            )}

            <CartLink to="/carrinho">
              <FaShoppingCart />
              {cartCount > 0 && <CartCount>{cartCount}</CartCount>}
            </CartLink>
          </UserSection>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #ffffff;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  color: #5a809e;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #3d6a87;
  }

  svg {
    color: #5a809e;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #333333;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #ffffff;
    padding: 1rem;
    gap: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryDropdown = styled.div`
  position: relative;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  color: #333333;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a809e;
  }
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 0.75rem 1rem;
  color: #333333;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #eef2f6;
    color: #5a809e;
  }
  
  ${({ selected }) => selected && `
    color: #5a809e;
    background-color: #eef2f6;
  `}
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserDropdown = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #333333;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a809e;
  }
`;

const UserMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
`;

const UserMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #333333;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #eef2f6;
    color: #5a809e;
  }
  
  svg {
    font-size: 1.125rem;
    color: #666666;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #cccccc;
  margin: 0.5rem 0;
`;

const AuthButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333333;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a809e;
  }
`;

const CartLink = styled(Link)`
  position: relative;
  color: #333333;
  font-size: 1.25rem;
  padding: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #5a809e;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #5a809e;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  transform: translate(50%, -50%);
`;

export default Navbar;