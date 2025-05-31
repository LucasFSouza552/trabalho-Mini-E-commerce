import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import styled from 'styled-components';

const ProfilePage = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstname: user?.name?.firstname || '',
    lastname: user?.name?.lastname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      number: user?.address?.number || '',
      city: user?.address?.city || '',
      zipcode: user?.address?.zipcode || ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false);
  };

  return (
    <Container>
      <ProfileCard>
        <Header>
          <Title>Meu Perfil</Title>
          <EditButton onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </EditButton>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Section>
            <SectionTitle>Informações Pessoais</SectionTitle>
            <InputGroup>
              <InputLabel>
                <FaUser />
                <span>Nome</span>
              </InputLabel>
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nome"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>
                <FaUser />
                <span>Sobrenome</span>
              </InputLabel>
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Sobrenome"
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
                disabled={!isEditing}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>
                <FaPhone />
                <span>Telefone</span>
              </InputLabel>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Telefone"
              />
            </InputGroup>
          </Section>

          <Section>
            <SectionTitle>Endereço</SectionTitle>
            <InputGroup>
              <InputLabel>
                <FaMapMarkerAlt />
                <span>Rua</span>
              </InputLabel>
              <Input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Rua"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>
                <FaMapMarkerAlt />
                <span>Número</span>
              </InputLabel>
              <Input
                type="text"
                name="address.number"
                value={formData.address.number}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Número"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>
                <FaMapMarkerAlt />
                <span>Cidade</span>
              </InputLabel>
              <Input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Cidade"
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>
                <FaMapMarkerAlt />
                <span>CEP</span>
              </InputLabel>
              <Input
                type="text"
                name="address.zipcode"
                value={formData.address.zipcode}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="CEP"
              />
            </InputGroup>
          </Section>

          {isEditing && (
            <ButtonGroup>
              <SaveButton type="submit">Salvar Alterações</SaveButton>
            </ButtonGroup>
          )}
        </Form>
      </ProfileCard>
    </Container>
  );
};

const Container = styled.div`
  min-height: calc(100vh - 4rem);
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
`;

const ProfileCard = styled.div`
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 32rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #5a809e;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #3d6a87;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333333;
  margin-bottom: 0.5rem;
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
  
  &:focus {
    outline: none;
    border-color: #5a809e;
    box-shadow: 0 0 0 2px rgba(90, 128, 158, 0.2);
  }
  
  &:disabled {
    background-color: #eef2f6;
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: #999999;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  background-color: #5a809e;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #3d6a87;
  }
`;

export default ProfilePage; 