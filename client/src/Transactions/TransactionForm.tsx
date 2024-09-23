import React, { useEffect, useState } from 'react';
// import { generateClient } from 'aws-amplify/api';
// import { createTransaction } from '../../graphql/mutations';
// import { v4 as uuid } from 'uuid';
import { formatCurrency } from '../utils/utils'

import { PageContainer,
  Form,
  Label,
  Input,
  Select,
  Button,
  TransactionDetailsContainer,
  TransactionDetailsRow,
  TransactionDetailsInfo,
  TransactionDetailsLeft,
  TransactionDetailsRight,
  ErrorMessage, } from './styles';
import { useCustomToast } from '../hooks/useCustomToast';
import { useNavigate } from 'react-router-dom';
import { currencyTypes, feeSplitTypes, FormData, Item, roleTypes, categoryTypes } from '../types';
import TransactionModal from './TransactionModal';

export interface NewTransactionProps {
  isAuthenticated: boolean;
}

function TransactionForm({isAuthenticated}: NewTransactionProps): React.ReactElement {
  const navigate = useNavigate();
  // const client = generateClient();

  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [buyerPrice, setBuyerPrice] = useState(0);
  const [sellerProceeds, setSellerProceeds] = useState(0);
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [tempItem, setTempItem] = useState<Item>({
    name: '',
    price: 0,
    description: '',
  });
  const { showToast } = useCustomToast();

  const [formData, setFormData] = useState<FormData>({ 
    // id: uuid(),
    title: '', 
    amount: '', 
    currency: 'USD',
    category: '',
    role: 'Buyer',
    status: "Pending",
    inspectionPeriod: 1,
    items: items,
    subTotal: 0,
    feeSplit: 'Buyer',
    feeAmount: 50,
    buyerPrice: 0,
    sellerProceeds: 0,
    sellerEmail: '',
    sellerPhone: ''
  });

  const [formErrors, setFormErrors] = useState({
    title: false,  
    amount: false,
    email: false,
    phone: false,
  });


  const validateName = (name: string) => name.length >= 3;
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhoneNumber = (phone: string) => /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(phone);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    switch (name) {
      case "title":
        setFormErrors({ ...formErrors, title: !validateName(value) });
        break;
      case "email":
        setFormErrors({ ...formErrors, email: !validateEmail(value) });
        break;
      case "phone":
        setFormErrors({ ...formErrors, phone: !isValidPhoneNumber(value) });
        break;
    }
    console.log('formData:', formData);
    
  };

  useEffect(() => {
    const isFormValid = Object.values(formErrors).every((error) => error === false) &&
      Object.values(formData).every((field) => field !== "");

    setSubmitEnabled(isFormValid);

    updateTotals();
    
  }, [formData.feeSplit, formData.items, formErrors]);
  

  const submitTransaction = async () => {
   
    const {title, amount, subTotal, currency, category, role, status, inspectionPeriod, items, feeSplit, feeAmount, buyerPrice, sellerProceeds, sellerEmail, sellerPhone} = formData;
    const newTransaction = {
      title,
      amount,
      currency,
      category,
      role,
      status,
      inspectionPeriod,
      items,
      subTotal, 
      feeSplit,
      feeAmount,
      buyerPrice,
      sellerProceeds,
      sellerEmail,
      sellerPhone,
    };

    // try {
    //   await client.graphql({
    //     query: createTransaction,
    //     variables: { input: newTransaction }
    //   });

    //   showToast("Transaction successfully created.", { type: 'success', autoClose: 2000 });
    //   setTimeout(() => {
    //     navigate('/dashboard');
    //   }, 2000);
      
    // } catch(err) {
    //   console.log(err);
    //     showToast("There was an error creating your transaction.", { type: 'error', autoClose: 2000 });
    // }
  }

  const updateTotals = () => {

    if (formData.feeSplit.toLowerCase() === 'buyer') {
      const updatedBuyerPrice = formData.subTotal + formData.feeAmount;
      setFormData({ ...formData, buyerPrice: updatedBuyerPrice });
      setFormData({ ...formData, sellerProceeds: formData.subTotal });
      setBuyerPrice(updatedBuyerPrice);
      setSellerProceeds(formData.subTotal)
    } else if (formData.feeSplit.toLowerCase() === 'seller') {
      const updatedSellerPrice = formData.subTotal > formData.feeAmount ? formData.subTotal - formData.feeAmount : formData.feeAmount - formData.subTotal;
      setFormData({ ...formData, buyerPrice: formData.subTotal });
      setFormData({ ...formData, sellerProceeds: updatedSellerPrice });
      setBuyerPrice(formData.subTotal);
      setSellerProceeds(updatedSellerPrice);
    } else if (formData.feeSplit === '50/50') {
      const updatedSplitPrice = formData.feeAmount/2;
      setFormData({ ...formData, buyerPrice: formData.subTotal + updatedSplitPrice });
      setFormData({ ...formData, sellerProceeds: updatedSplitPrice });
      setBuyerPrice(formData.subTotal + updatedSplitPrice);
      setSellerProceeds(formData.subTotal > updatedSplitPrice ? formData.subTotal - updatedSplitPrice : updatedSplitPrice - formData.subTotal);
    }
  }

  const addArrayItem = (newItem: Item) => {
    setFormData(prevData => ({
      ...prevData,
      items: [...formData.items, newItem] 
    }));

    setFormData(prevData => ({
      ...prevData,
      subTotal: formData.subTotal + newItem.price
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      category: selectedCategory
    }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      currency: selectedCurrency
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      role: selectedRole
    }));
  };

  const handleSplitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSplit = e.target.value;
    setFormData(prevData => ({
      ...prevData,
      feeSplit: selectedSplit
    }));
  };

  //setIsEditMode
  const handleEditModal = (item: Item, index: number) => {
    setEditingItemIndex(index);
    setCurrentItemIndex(index);
    setTempItem(item);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleAddModal = () => {
    const updatedItem: Item = {
      name: '',
      price: 0,
      description: ''
    }
    setEditingItemIndex(null);
    setTempItem(updatedItem);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const deleteItemByIndex = () => {
    
    const confirmed = window.confirm("Are you sure you want to delete this item?");

    if (confirmed) {
      setIsModalOpen(false);
      setEditingItemIndex(null);
    }
  };

  const editItemByIndex = () => {
    
    const confirmed = window.confirm("Are you sure you want to edit this item?");
    if (confirmed) {

      setIsModalOpen(false);
      setEditingItemIndex(null);
    }
  };

  const handleSaveItem = (item: Item, index: number | null) => {
    if (index !== null) {

      const updatedItems = items.map((existingItem, i) => (i === index ? item : existingItem));
      // setItems(updatedItems);
      // setFormData((prevData) => ({ ...prevData, items: items }));
      setFormData((prevData) => ({ ...prevData, items: updatedItems }));

      console.log('updatedItems:', updatedItems);
      console.log('items:', items);
      console.log('formData:', formData.items);
      console.log('formData:', formData.subTotal);


    } else {
      // Add new item
      setItems((prevItems) => [...prevItems, item]);
      setFormData((prevData) => ({
        ...prevData,
        items: [...prevData.items, item],
        subTotal: prevData.subTotal + item.price,
      }));
    }
    setIsModalOpen(false);
  };

  // Deleting the item
  const handleDeleteItem = (index: number) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      setFormData((prevData) => ({
        ...prevData,
        items: updatedItems,
        subTotal: prevData.subTotal - items[index].price,
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <PageContainer>
      <h2>Create Transaction</h2>
      <Form>
        <Label>Transaction Title:</Label>
        <Input 
          name="title"
          type="text" 
          value={formData.title}
          placeholder="Enter transaction title" 
          onChange={handleInputChange}
          isvalid={!formErrors.title}
        />
        {formErrors.title && (
          <ErrorMessage>Name must be at least 3 characters long.</ErrorMessage>
        )}

        <Label htmlFor="role">My Role:</Label>
        <Select
          id="role" 
          name="role"
          value={formData.role}
          onChange={handleRoleChange}
        >
          {roleTypes.map((role) => (
            <option key={role.code} value={role.code}>
              {role.name}
            </option>
          ))}
        </Select>

        <Label htmlFor="currency">Currency:</Label>
        <Select 
          id="currency" 
          name="currency"
          value={formData.currency}
          onChange={handleCurrencyChange}
          >
          {currencyTypes.map((role) => (
            <option key={role.code} value={role.code}>
              {role.code}
            </option>
          ))}
        </Select>

        <Label>Inspection Period (days):</Label>
        <Input 
          name="inspectionPeriod"
          type="number" 
          placeholder="Enter inspection period"
          onChange={handleInputChange}
          isvalid={true}
        />

        <Label htmlFor="category">Category:</Label>
        <Select 
          id="category" 
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          >
          {categoryTypes.map((category) => (
            <option key={category.code} value={category.code}>
              {category.name}
            </option>
          ))}
        </Select>

        <Button type="button" disabled={formData.items.length >= 7} onClick={handleAddModal}>
          Add Item
        </Button>
      </Form>

      <hr></hr>

      {isModalOpen && (
        <TransactionModal 
          setIsModalOpen={setIsModalOpen} 
          // addToItems={addToItems} 
          addToItems={handleSaveItem} 
          isEditMode={isEditMode} 
          // deleteItemByIndex={deleteItemByIndex} 
          deleteItemByIndex={handleDeleteItem} 
          // editItemByIndex={editItemByIndex} 
          item={editingItemIndex !== null ? items[editingItemIndex] : null} 
          index={editingItemIndex} />
      )}

      {items.length > 0 ? (
        <>
        <h4>Transaction details</h4>
        <TransactionDetailsContainer>
          {items.map((item, index) => (
            <TransactionDetailsRow key={index} onClick={() => handleEditModal(item, index)}>
              <TransactionDetailsInfo><b>Name:</b> {item.name}</TransactionDetailsInfo>
              <TransactionDetailsInfo><b>Price:</b> ${item.price}</TransactionDetailsInfo>
              <TransactionDetailsInfo><b>Description:</b> {item.description}</TransactionDetailsInfo>
            </TransactionDetailsRow>
          ))}
        </TransactionDetailsContainer>
        </>
      ) : (
        <div>There are no items added.</div>
      )}

      <hr></hr>

      <h4>Transaction summary</h4>
      <TransactionDetailsInfo>
        <TransactionDetailsLeft>Subtotal</TransactionDetailsLeft>
        <TransactionDetailsRight>{formatCurrency(formData.subTotal.toString(), formData.currency)}</TransactionDetailsRight>
      </TransactionDetailsInfo>

      <TransactionDetailsInfo>
        <TransactionDetailsLeft>
          <Label htmlFor="feeSplit">Fee paid by:</Label>
        </TransactionDetailsLeft>
        <TransactionDetailsRight>
          <Select 
            id="feeSplit" 
            name="feeSplit"
            value={formData.feeSplit}
            onChange={handleSplitChange}
            >
            {feeSplitTypes.map((role) => (
              <option key={role.code} value={role.code}>
                {role.name}
              </option>
            ))}
          </Select>
        </TransactionDetailsRight>
      </TransactionDetailsInfo>
      
      <TransactionDetailsInfo>
        <TransactionDetailsLeft>Fee amount</TransactionDetailsLeft>
        <TransactionDetailsRight>{formatCurrency(formData.feeAmount.toString(), formData.currency)}</TransactionDetailsRight>
      </TransactionDetailsInfo>

      <hr></hr>

      <TransactionDetailsInfo>
        <TransactionDetailsLeft>Buyer price</TransactionDetailsLeft>
        <TransactionDetailsRight>{formatCurrency(buyerPrice.toString(), formData.currency)}</TransactionDetailsRight>
      </TransactionDetailsInfo>

      <TransactionDetailsInfo>
        <TransactionDetailsLeft>Seller proceeds</TransactionDetailsLeft>
        <TransactionDetailsRight>{formatCurrency(sellerProceeds.toString(), formData.currency)}</TransactionDetailsRight>
      </TransactionDetailsInfo>

      <hr></hr>

      <h4>Seller details</h4>
      <TransactionDetailsInfo>
        <TransactionDetailsLeft>
          <Input
            name="sellerEmail"
            type="email" 
            placeholder="Email"
            value={formData.sellerEmail}
            isvalid={formData.sellerEmail.length > 3}
            onChange={handleInputChange}
          />
          {formErrors.email && (
            <ErrorMessage>Name must be at least 3 characters long.</ErrorMessage>
          )}
        </TransactionDetailsLeft>
        <TransactionDetailsLeft>
          <Input 
            name="sellerPhone"
            type="number" 
            placeholder="Phone" 
            value={formData.sellerPhone}
            isvalid={formData.sellerPhone.length > 3}
            onChange={handleInputChange}
          />
          {formErrors.phone && (
            <ErrorMessage>Name must be at least 3 characters long.</ErrorMessage>
          )}
        </TransactionDetailsLeft>
      </TransactionDetailsInfo>

      <hr></hr>

      <Button type="button" disabled={false} onClick={submitTransaction}>
        Create
      </Button>
    </PageContainer>
    
  );
};

export default TransactionForm;
