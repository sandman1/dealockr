import React from 'react';
import { useFormData } from './FormContext';
import { Container, FormWrapper, Input, Button } from './styles';
import { useNavigate } from 'react-router-dom';

const Step3: React.FC = () => {
  const { formData, setFormData } = useFormData();
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = () => {
    console.log(formData); // Submit formData to server
    navigate('/success');
  };

  return (
    <Container>
      <FormWrapper>
        <h2>Upload Proof of Identity</h2>
        <Input type="file" onChange={handleFileUpload} />
        <Button onClick={handleSubmit}>Submit</Button>
      </FormWrapper>
    </Container>
  );
};

export default Step3;
