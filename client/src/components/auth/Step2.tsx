import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonContainer, Container, ErrorContainer, FormWrapper, Input } from './styles';

interface Step2Data {
  companyName: string;
  companyCountry: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
}

const schema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  companyCountry: yup.string().required('Company Country is required'),
  companyAddress: yup.string().required('Company Address is required'),
  companyCity: yup.string().required('Company City is required'),
  companyState: yup.string().required('Company State is required'),
  companyZip: yup.string().required('Company Zip is required'),
});

const Step2Form: React.FC<{ onNext: () => void; onBack: () => void; saveData: (data: Step2Data) => void }> = ({ onNext, onBack, saveData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: Step2Data) => {
        saveData(data);
        onNext();
    };

    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <h4>Business Details</h4>

            <Input {...register('companyName')} placeholder="Company Name" />
            {errors.companyName && <ErrorContainer>{errors.companyName.message}</ErrorContainer>}

            <Input {...register('companyCountry')} placeholder="Country" />
            {errors.companyCountry && <ErrorContainer>{errors.companyCountry.message}</ErrorContainer>}

            <Input {...register('companyAddress')} placeholder="Address" />
            {errors.companyAddress && <ErrorContainer>{errors.companyAddress.message}</ErrorContainer>}

            <Input {...register('companyCity')} placeholder="City" />
            {errors.companyCity && <ErrorContainer>{errors.companyCity.message}</ErrorContainer>}

            <Input {...register('companyState')} placeholder="State/Province/Region" />
            {errors.companyState && <ErrorContainer>{errors.companyState.message}</ErrorContainer>}

            <Input {...register('companyZip')} placeholder="Zip/Postal code" />
            {errors.companyZip && <ErrorContainer>{errors.companyZip.message}</ErrorContainer>}

            <ButtonContainer>
                <Button type="button" onClick={onBack}>Back</Button>
                <Button type="submit">Save and Next</Button>
            </ButtonContainer>
            </FormWrapper>
        </Container>
    );
};

export default Step2Form;
