import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FormContextProps {
  formData: any;
  setFormData: (data: any) => void;
}

interface FormProviderProps {
    children: ReactNode;  // Adding children prop type
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState({});

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error('useFormData must be used within FormProvider');
  return context;
};
