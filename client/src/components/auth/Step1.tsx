import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { Button, Container, FormWrapper, Select } from './styles';
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

const ErrorMessage = styled.p`
  color: red;
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

        <Input {...register('firstName')} placeholder="First Name" />
        {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}

        <Input {...register('middleName')} placeholder="Middle Name" />

        <Input {...register('lastName')} placeholder="Last Name" />
        {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}

        <Input {...register('dateOfBirth')} placeholder="Date of Birth" type="date" />
        {errors.dateOfBirth && <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>}

        <Input {...register('phoneNumber')} placeholder="Phone Number" />
        {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>}

        <Select {...register('country')}>
          <option value="" disabled selected>
              Select a country
          </option>
           {countryOptions.map((country, index) => (
             <option key={index} value={country.value}>
               {country.label}
             </option>
           ))}
        </Select>
        {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}

        <Input {...register('address')} placeholder="Address" />
        {errors.address && <ErrorMessage>{errors.address.message}</ErrorMessage>}

        <Input {...register('city')} placeholder="City" />
        {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

        <Input {...register('state')} placeholder="State" />
        {errors.state && <ErrorMessage>{errors.state.message}</ErrorMessage>}

        <Input {...register('zipCode')} placeholder="Zip Code" />
        {errors.zipCode && <ErrorMessage>{errors.zipCode.message}</ErrorMessage>}

        <Button type="submit">Save and Next</Button>
      </FormWrapper>
    </Container>
  );
};

export default Step1Form;
