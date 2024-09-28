import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { FormContainer } from './styles';

const RegistrationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
  });

  const saveStepData = (data: any) => {
    setFormData((prev) => ({
      ...prev,
      [`step${step}`]: data,
    }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <FormContainer>
      {step === 1 && <Step1 onNext={nextStep} saveData={saveStepData} />}
      {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} saveData={saveStepData} />}
      {step === 3 && <Step3 onSubmit={() => alert('Form submitted')} onBack={prevStep} saveData={saveStepData} />}
    </FormContainer>
  );
};

export default RegistrationForm;
