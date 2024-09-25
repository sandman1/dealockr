import * as yup from 'yup';
  
export interface Item {
    name: string;
    price: number;
    description: string;
}

export interface Step1Data {
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

export interface Step2Data {
    companyName: string;
    companyCountry: string;
    companyAddress: string;
    companyCity: string;
    companyState: string;
    companyZip: string;
}

export interface Step3Data {
    verificationMethod: string;
    socialSecurityNumber?: string;
    documentType1?: string;
    documentType2?: string;
    documentFileName1?: File;
    documentFileName2?: File;
    privacyPolicyConsent: boolean;
}

export interface FormData {
    // id: string
    title: string 
    amount: string 
    currency: string
    category: string
    role: string
    status: string
    inspectionPeriod: number
    items: Item[]
    subTotal: number
    feeSplit: string
    feeAmount: number
    buyerPrice: number
    sellerProceeds: number
    sellerEmail: string
    sellerPhone: string
}

export const categoryTypes = [
    { code: 'TELCOM', name: 'Telecom' },
    { code: 'MOTOR', name: 'Motor' },
    { code: 'JEWELS', name: 'Jewlery' },
    { code: 'REALTY', name: 'Realty' },
]

export const currencyTypes = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
]

export const feeSplitTypes = [
    { code: 'BUYER', name: 'Buyer' },
    { code: 'SELLER', name: 'Seller' },
    { code: '50/50', name: '50% Buyer / 50% Seller' },
]

export const roleTypes = [
    { code: 'BUYER', name: 'Buyer' },
    { code: 'SELLER', name: 'Seller' },
    { code: 'BROKER', name: 'Broker' },
];

export const registrationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    dateOfBirth: yup.string().required('Date of birth is required'),
    phoneNumber: yup
        .string()
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Phone number is not valid')
        .required('Phone number is required'),
    country: yup.string().required('Country is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State/Province/Region is required'),
    zipCode: yup.string().required('Zip/Postal code is required'),
});