import React from 'react';
import { PageContainer } from './styles';

interface AboutPageProps {
  isAuthenticated: boolean;
}

function About({isAuthenticated}: AboutPageProps): React.ReactElement {
  return (
    <PageContainer>
      <h1>About Page</h1>
      <p>Welcome to the About page.</p>
    </PageContainer>
  );
};

export default About;