import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, ButtonContainer, CheckboxContainer, Container, FormWrapper, Input, Label, PrivacyLink, Select, StyledCheckbox } from './styles';
import FileUpload from './FileUpload';
import { ModalButtonContainer } from '../../Transactions/styles';
  
type Step3Data = {
    verificationMethod: string;
    socialSecurityNumber?: string;
    documentType1?: string;
    documentType2?: string;
    documentFileName1?: File;
    documentFileName2?: File;
    privacyPolicyConsent?: boolean;
};

const schema = yup.object().shape({
    verificationMethod: yup.string().required('Verification method is required'),
    socialSecurityNumber: yup.string(), // Optional validation
    documentType1: yup.string(),        // Optional validation
    documentType2: yup.string(),        // Optional validation
    documentFileName1: yup.mixed(),     // File validation if needed
    documentFileName2: yup.mixed(),     // File validation if needed
    privacyPolicyConsent: yup.mixed(),
    // privacyPolicyConsent: yup.boolean().required('Privacy policy consent is required').oneOf([true], 'You must accept the privacy policy'),
});

const Step3Form: React.FC<{ onSubmit: () => void; onBack: () => void; saveData: (data: Step3Data) => void }> = ({ onSubmit, onBack, saveData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: yupResolver(schema),
  });

  const [verificationMethodSelected, setVerificationMethodSelected] = React.useState('Select a verification method');
  const [documentTypeSelected, setDocumentTypeSelected] = React.useState('Select document type');
  const [addressProofTypeSelected, setAddressProofTypeSelected] = React.useState('Document Type');
  const [isChecked, setIsChecked] = React.useState(false);

  const verificationMethodTypes = [
    {
        value: 'SSN',
        label: 'Social Security Number (SSN)',
    },
    {
        value: 'document',
        label: 'Upload a Document',
    },
  ]

  const documentTypes = [
    {
        value: 'passport',
        label: 'Passport',
    },
    {
        value: 'driversLicence',
        label: 'Driver\'s Licence',
    },
    {
        value: 'nationalIdCard',
        label: 'National ID card',
    },
    {
        value: 'taxId',
        label: 'Tax ID',
    },
    {
        value: 'proofOfAgeCard',
        label: 'Proof of Age Card',
    },
    {
        value: 'professionalLicenseID',
        label: 'Professional License ID',
    },
    {
        value: 'stateId',
        label: 'State ID',
    },
    {
        value: 'otherGovermentIssuedId',
        label: 'Other Goverment-Issued ID',
    },
  ];

  const adressProofTypes = [
    {
        value: 'bankStatement',
        label: 'Bank Statement',
    },
    {
        value: 'incomeTaxReturnForm',
        label: 'Income Tax Return Form',
    },
    {
        value: 'residenceIdOrPermit',
        label: 'Residence ID or Permit',
    },
    {
        value: 'notarizedLeaseAgreement',
        label: 'Notarized Lease Agreement',
    },
    {
        value: 'IdCard',
        label: 'ID Card (different to card used in proof of identity)',
    },
    {
        value: 'electricityBill',
        label: 'Electricity Bill',
    },
    {
        value: 'waterBill',
        label: 'Water Bill',
    },
    {
        value: 'internetBill',
        label: 'Internet Bill',
    },
    {
        value: 'cableBill',
        label: 'Cable Bill',
    },
    {
        value: 'landlineBill',
        label: 'Landline Bill',
    },
    {
        value: 'mobilePhoneBill',
        label: 'Mobile Phone Bill',
    },
    {
        value: 'otherUtilityBill',
        label: 'Other Utility Bill',
    },
  ];

  const handleFinalSubmit = (data: Step3Data) => {
    saveData(data);
    onSubmit();
  };

  const handleFileUpload = (files: File[]) => {
    console.log('Uploaded files:', files);
    // You can now do whatever you need with the files
  };

  useEffect(() => {
        // set the selected methods to the state if previously saved DB here
        setVerificationMethodSelected('Select a verification method');
        setDocumentTypeSelected('Select document type');
        setAddressProofTypeSelected('Document Type');
    }, []);

  const verificationMethodChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    console.log('Selected verification method:', target.value);
    setVerificationMethodSelected(target.value);
  };

  const documentTypeChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    console.log('Selected document type:', target.value);
    setDocumentTypeSelected(target.value);
  };

  const proofTypeChangeHandler = (e: React.FormEvent<HTMLSelectElement>) => {
    const target = e.target as HTMLSelectElement;
    console.log('Selected document type:', target.value);
    setAddressProofTypeSelected(target.value);
  };

  return (
    <Container>
        <FormWrapper onSubmit={handleSubmit(handleFinalSubmit)}>
        <h4>Verification Method</h4>

        <Select {...register('verificationMethod')} onChange={verificationMethodChangeHandler}>
            <option value="" disabled selected>
                Select a verification method
            </option>
            {verificationMethodTypes.map((method, index) => (
                <option key={index} value={method.value}>
                {method.label}
                </option>
            ))}
        </Select>
        
        {verificationMethodSelected === 'SSN' && (
            <>
                <h4>Social Security Number (SSN) Information</h4>
                <Input {...register('socialSecurityNumber')} placeholder="Last 4 Digits of SSN" />
                <CheckboxContainer>
                <StyledCheckbox
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
                <Label>
                    I consent to verifying my identity as outlined in the{' '}
                    <PrivacyLink href="/privacy-policy">privacy policy</PrivacyLink>.
                </Label>
                </CheckboxContainer>   
            </>
        )}
        
        {verificationMethodSelected === 'document' && (
            <>
                <h4>Proof of Identity</h4>
                <p>Important guidelines for your ID. Please ensure it has the following:</p>
                <ul>
                    <li>Your photo and details are visible and free of any blurs or image glare</li>
                    <li>The expiry date must be visible</li>
                    <li>Your name, date of birth, and address must be readable</li>
                </ul>

                <Select onChange={documentTypeChangeHandler}>
                    <option value="" disabled selected>
                        Select document type
                    </option>
                {documentTypes.map((doc, index) => (
                    <option key={index} value={doc.value}>
                    {doc.label}
                    </option>
                ))}
                </Select>
                {documentTypeSelected !== 'Select document type' && (
                    <>
                        <h4>Upload the front of your ID</h4>
                        <FileUpload 
                            onFileUpload={handleFileUpload}  // Pass the callback function here
                            label="front of your ID"         // Pass a label for the input
                            acceptedFormats={['.jpg', '.png', '.pdf']} // Optional: pass accepted formats
                            maxFileSizeMB={100}              // Optional: pass max file size
                        />
                        {documentTypeSelected === 'passport' && (
                            <>
                            <h4>Proof of Address</h4>
                            <label>Your proof of address should show the same address in your personal details.</label>
                            <Select onChange={proofTypeChangeHandler}>
                                <option value="" disabled selected>
                                    Select document type
                                </option>
                            {adressProofTypes.map((proof, index) => (
                                <option key={index} value={proof.value}>
                                {proof.label}
                                </option>
                            ))}
                            </Select>
                            <FileUpload 
                                onFileUpload={handleFileUpload}  // Pass the callback function here
                                label="front of your ID"         // Pass a label for the input
                                acceptedFormats={['.jpg', '.png', '.pdf']} // Optional: pass accepted formats
                                maxFileSizeMB={100}              // Optional: pass max file size
                            />
                            </>
                        )}
                    </>
                )}
            </>
        )}
        
        <ButtonContainer>
            <Button type="button" onClick={onBack}>Back</Button>
            <Button type="submit">Submit</Button>
        </ButtonContainer>
        </FormWrapper>
    </Container>
  );
};

export default Step3Form;
