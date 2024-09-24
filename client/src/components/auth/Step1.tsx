import React from 'react';
import { useFormData } from './FormContext';
import { Container, FormWrapper, Input, Button } from './styles';
import { useNavigate } from 'react-router-dom';

const Step1: React.FC = () => {
  const { formData, setFormData } = useFormData();
  const navigate = useNavigate();
  const [accountType, setAccountType] = React.useState(formData.accountType || 'individual');

  const handleNext = () => {
    setFormData({ ...formData, accountType });
    navigate('/step2');
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Select Account Type</h2>
        <label>
          <input
            type="radio"
            name="accountType"
            value="individual"
            checked={accountType === 'individual'}
            onChange={(e) => setAccountType(e.target.value)}
          />
          Individual
        </label>
        <label>
          <input
            type="radio"
            name="accountType"
            value="company"
            checked={accountType === 'company'}
            onChange={(e) => setAccountType(e.target.value)}
          />
          Company
        </label>
        <Button onClick={handleNext}>Next</Button>
      </FormWrapper>
    </Container>
  );
};

export default Step1;
