import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com'
});

const AuthPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    username: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (isLogin) {
      if (!formData.username || !formData.password) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return false;
      }
    } else {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return false;
      }
      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await api.post('/auth/login', {
          username: formData.username,
          password: formData.password
        });
        onLogin(response.data.token);
        navigate('/');
      } else {
        await api.post('/users', {
          email: formData.email,
          username: formData.email,
          password: formData.password,
          name: {
            firstname: formData.name.split(' ')[0],
            lastname: formData.name.split(' ').slice(1).join(' ')
          }
        });
        const loginResponse = await api.post('/auth/login', {
          username: formData.email,
          password: formData.password
        });
        onLogin(loginResponse.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      if (error.response?.status === 401) {
        setError('Nome de usuário ou senha inválidos.');
      } else if (error.response?.status === 400) {
        setError('Dados inválidos. Por favor, verifique as informações.');
      } else {
        setError(isLogin ? 'Erro ao fazer login. Tente novamente.' : 'Erro ao criar conta. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
      username: ''
    });
  };

  return (
    <Container>
      <AuthCard>
        <Logo>Velora</Logo>
        <Title>{isLogin ? 'Bem-vindo de volta!' : 'Criar conta'}</Title>
        <Description>
          {isLogin
            ? 'Entre com suas credenciais para acessar sua conta'
            : 'Preencha os dados abaixo para criar sua conta'}
        </Description>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <InputGroup>
                <InputLabel>
                  <FaUser />
                  <span>Nome completo</span>
                </InputLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                />
              </InputGroup>

              <InputGroup>
                <InputLabel>
                  <FaEnvelope />
                  <span>Email</span>
                </InputLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                />
              </InputGroup>
            </>
          )}

          {isLogin && (
            <InputGroup>
              <InputLabel>
                <FaUser />
                <span>Nome de usuário</span>
              </InputLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Digite seu nome de usuário"
              />
            </InputGroup>
          )}

          <InputGroup>
            <InputLabel>
              <FaLock />
              <span>Senha</span>
            </InputLabel>
            <PasswordInput>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua senha"
              />
              <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </PasswordInput>
          </InputGroup>

          {!isLogin && (
            <InputGroup>
              <InputLabel>
                <FaLock />
                <span>Confirmar senha</span>
              </InputLabel>
              <PasswordInput>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirme sua senha"
                />
                <PasswordToggle type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInput>
            </InputGroup>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </SubmitButton>
        </Form>

        <ToggleButton onClick={toggleMode}>
          {isLogin
            ? 'Não tem uma conta? Cadastre-se'
            : 'Já tem uma conta? Entre'}
        </ToggleButton>
      </AuthCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
`;

const AuthCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 28rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #5a809e;
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  color: #666666;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333333;
  font-weight: 500;
  
  svg {
    color: #666666;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #cccccc;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #5a809e;
    box-shadow: 0 0 0 2px rgba(90, 128, 158, 0.2);
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const PasswordInput = styled.div`
  position: relative;

  ${Input} {
    padding-right: 3rem;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  z-index: 10;

  &:hover {
    color: #5a809e;
  }
`;

const ErrorMessage = styled.div`
  color: #e57373;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #eef2f6;
  border-radius: 0.375rem;
`;

const SubmitButton = styled.button`
  background-color: #5a809e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    background-color: #3d6a87;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ToggleButton = styled.button`
  display: block;
  width: 100%;
  text-align: center;
  color: #5a809e;
  background: none;
  border: none;
  padding: 1rem 0 0;
  margin-top: 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    color: #3d6a87;
  }
`;

export default AuthPage; 