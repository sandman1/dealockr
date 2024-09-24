import React, { useState, useEffect } from 'react';
import { useFormData } from './FormContext';
import { Container, FormWrapper, Input, Button, Select } from './styles';
import { useNavigate } from 'react-router-dom';

const countries: { Ireland: string[]; USA: string[] } = {
    Ireland: ['Dublin', 'Cork'],
    USA: ['New York', 'Los Angeles'],
};

const Step2: React.FC = () => {
    const { formData, setFormData } = useFormData();
    const navigate = useNavigate();
    const [country, setCountry] = useState<'Ireland' | 'USA'>('Ireland');
    const [state, setState] = useState('');

    useEffect(() => {
    setState('');
    }, [country]);

    const handleNext = () => {
    setFormData({ ...formData, country, state });
    navigate('/step3');
    };

    return (
    <Container>
        <FormWrapper>
        <h2>Address Details</h2>
        <label>Country</label>
        <Select value={country} onChange={(e) => setCountry(e.target.value as 'Ireland' | 'USA')}>
            {Object.keys(countries).map((country) => (
            <option key={country} value={country}>
                {country}
            </option>
            ))}
        </Select>

        <label>State</label>
        <Select value={state} onChange={(e) => setState(e.target.value)}>
            {countries[country].map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
            ))}
        </Select>

        <Button onClick={handleNext}>Next</Button>
        </FormWrapper>
    </Container>
    );
};

export default Step2;
