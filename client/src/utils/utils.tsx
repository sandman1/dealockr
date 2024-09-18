export interface UserData {
  userId: string;   // The Cognito identity ID or User Pool sub
  data: string;     // The user's data
  createdAt: string;
}
  
export const currencyMask = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1. $2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ",");
  e.target.value = value;
  console.log(value);
  return e;
}

export const isEmailValid = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
};

export const formatToCurrency = (amount: number): string => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const formatCurrency = (value: string, currency: string) => {
  const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
  if (isNaN(numericValue)) return "";

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(numericValue);
};