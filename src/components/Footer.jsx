import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterInfo>
          <FooterTitle>Velora</FooterTitle>
          <FooterDescription>Sua loja online favorita</FooterDescription>
        </FooterInfo>
        <SocialLinks>
          <SocialLink href="#">
            <FaFacebookF />
          </SocialLink>
          <SocialLink href="#">
            <FaTwitter />
          </SocialLink>
          <SocialLink href="#">
            <FaInstagram />
          </SocialLink>
        </SocialLinks>
      </FooterContent>
      <FooterBottom>
        <Copyright>&copy; 2025 Velora. Todos os direitos reservados.</Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #ffffff; /* White background */
  padding: 2rem 1rem;
  margin-top: auto;
  color: #333333; /* Primary Text */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FooterInfo = styled.div`
  text-align: center;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #333333; /* Primary Text */
  margin-bottom: 1rem;
`;

const FooterDescription = styled.p`
  font-size: 1rem;
  color: #666666; /* Secondary Text */
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const SocialLink = styled.a`
  color: #666666; /* Secondary Text */
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a809e; /* Primary Accent */
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #cccccc; /* Secondary Text/Borders */
  text-align: center;
  color: #666666; /* Secondary Text */
`;

const Copyright = styled.p`
  font-size: 0.875rem;
`;

export default Footer;