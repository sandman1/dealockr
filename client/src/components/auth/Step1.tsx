import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, ButtonContainer, Container, ErrorContainer, FormWrapper, Label, Select } from './styles';
import countryList from 'react-select-country-list'

interface Step1Data {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  country: yup.string().required('Country is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('Zip Code is required'),
});

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Step1Form: React.FC<{ onNext: () => void; saveData: (data: Step1Data) => void }> = ({ onNext, saveData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Step1Data) => {
    saveData(data);
    onNext();
  };

  const countryOptions = useMemo(() => countryList().getData(), [])

  return (
    <Container>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>Please verify your account</h2>
        <p>We protect both sides of the transaction by verifying the identity of all users.
        Your verified identity must be the same as the account holder's name on any bank account used to pay or receive funds from Escrow.com</p>
        
        <h4>Details</h4>
        <Label>First name {errors.firstName && <ErrorContainer>{errors.firstName.message}</ErrorContainer>}</Label>
        <Input {...register('firstName')} placeholder="Enter first name"  />
        
        <Input {...register('middleName')} placeholder="Middle Name" />

        <Input {...register('lastName')} placeholder="Last Name" />
        {errors.lastName && <ErrorContainer>{errors.lastName.message}</ErrorContainer>}

        <Input {...register('dateOfBirth')} placeholder="Date of Birth" type="date" />
        {errors.dateOfBirth && <ErrorContainer>{errors.dateOfBirth.message}</ErrorContainer>}

        <Input {...register('phoneNumber')} placeholder="Phone Number" />
        {errors.phoneNumber && <ErrorContainer>{errors.phoneNumber.message}</ErrorContainer>}

        <Select {...register('country')}>
          <option value="" disabled>
              Select a country
          </option>
           {countryOptions.map((country, index) => (
             <option key={index} value={country.value}>
               {country.label}
             </option>
           ))}
        </Select>
        {errors.country && <ErrorContainer>{errors.country.message}</ErrorContainer>}

        <Input {...register('address')} placeholder="Address" />
        {errors.address && <ErrorContainer>{errors.address.message}</ErrorContainer>}

        <Input {...register('city')} placeholder="City" />
        {errors.city && <ErrorContainer>{errors.city.message}</ErrorContainer>}

        <Input {...register('state')} placeholder="State" />
        {errors.state && <ErrorContainer>{errors.state.message}</ErrorContainer>}

        <Input {...register('zipCode')} placeholder="Zip Code" />
        {errors.zipCode && <ErrorContainer>{errors.zipCode.message}</ErrorContainer>}

        <Button type="submit">Save and Next</Button>
      </FormWrapper>
    </Container>
  );
};

export default Step1Form;
