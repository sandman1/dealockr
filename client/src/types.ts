
  
export interface Item {
    name: string;
    price: number;
    description: string;
}

// export interface Seller {
//     email: string;
//     phone: string;
// }

export interface FormData {
    id: string
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