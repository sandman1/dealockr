import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
`;

function Home(): React.ReactElement {
  return (
    <HomeContainer>
      <Logo>Paradigm Financial Services</Logo>
      <Description>
        We provide trusted financial escrow services to ensure secure transactions for both parties. Protect your investments and transactions with ease.
      </Description>
    </HomeContainer>
  );
};

export default Home;
