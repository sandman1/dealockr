import React, { useEffect, useState } from 'react';

import {
    Label,
    Input,
    Modal,
    ModalButton,
    ModalOverlay,
    FieldItem,
    ModalTextarea,
    FieldItemWrapper,
    ModalButtonContainer,
    ModalButtonItem} from './styles';
import { Item } from '../types';

export interface TransactionModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    isEditMode: boolean;
    addToItems: (item: Item, index: number | null) => void;
    deleteItemByIndex: (index: number) => void;
    // editItemByIndex: () => void;
    item: Item | null;
    index: number | null;
  }

function TransactionModal({
  setIsModalOpen, 
  isEditMode, 
  addToItems, 
  deleteItemByIndex, 
  // editItemByIndex,
  item,
  index}: TransactionModalProps): React.ReactElement {
  
  const [newItem, setNewItem] = useState<Item>({
    name: '',
    price: 0,
    description: '',
  });

  useEffect(() => {
    if (isEditMode && item) {
      console.log('getting into useEffect');
      setNewItem(item); // Load the item into the modal for editing
    }
  }, [isEditMode, item]);

  // const [localItemPrice, setLocalItemPrice] = useState<string>(item.price.toString());

  // const addItem = () => {
  //   // setItems([...items, newItem]);
  //   addToItems(newItem);
  //   setNewItem({ name: '', price: 0, description: '' });
  //   setIsModalOpen(false);
    
  // };

  // const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   // const inputValue = e.target.value;
  //   const { name, value } = e.target;

  //   console.log(name);
  //   console.log(value);

  //   setNewItem((prevItem) => ({
  //     ...prevItem,
  //     [name]: name === 'price' ? parseFloat(value) : value,
  //   }));

  //   // Regular expression to allow only numbers and a single decimal point
  //   // const isValidInput = /^[0-9]*\.?[0-9]*$/.test(inputValue);

  //   // Update the value only if it's valid
  //   // if (isValidInput) {
  //     // setLocalItemPrice(inputValue);
  //     // setNewItem({ ...newItem, price: parseInt(inputValue) })
  //   // }
  // };

  const handleDeleteItemClick = () => {
    // deleteItemByIndex();
    if (index !== null) {
      deleteItemByIndex(index);
    }
  }

  // const handleEditItemClick = () => {
  //   editItemByIndex();
  // }

  const handleSaveClick = () => {
    
    addToItems(newItem, index);
  };

  // useEffect(() => {
  //   if (isEditMode && item) {
  //     setNewItem(item); // Load the item into the modal for editing
  //   }
  // }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));

    
  };

  return (
    <>
        <ModalOverlay onClick={() => setIsModalOpen(false)} />
        <Modal>
        <h3>Add Item</h3>
        <FieldItemWrapper>
            <FieldItem>
            <Label>Item Name:</Label>
            <Input
                type="text"
                name="name"
                value={newItem.name}
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, name: e.target.value })}
                onChange={handleInputChange}
                isvalid={true}
            />
            </FieldItem>

            <FieldItem>
            <Label>Price:</Label>
            <Input
              // type="text"
              type="number"
              name="price"
              // value={localItemPrice}
              value={newItem.price}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
              // onChange={handlePriceInputChange}
              onChange={handleInputChange}
              isvalid={true}
            />
            </FieldItem>

            <FieldItem>
            <Label>Description:</Label>
            <ModalTextarea
                value={newItem.description}
                name="description"
                // onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewItem({ ...newItem, description: e.target.value })}
                onChange={handleInputChange}
            />
            </FieldItem>
        </FieldItemWrapper>
        
        {isEditMode ? (
          <ModalButtonContainer>
            <ModalButtonItem type="button" onClick={handleDeleteItemClick}>
              Delete
            </ModalButtonItem>
            {/* <ModalButtonItem type="button" onClick={handleEditItemClick}> */}
            <ModalButtonItem type="button" onClick={handleSaveClick}>
              Update
            </ModalButtonItem>
          </ModalButtonContainer>
        ) : (
          // <ModalButton type="button" onClick={addItem}>
          <ModalButton type="button" onClick={handleSaveClick}>
            Add
          </ModalButton>
        )}
        
        </Modal>
    </>
  )
};

export default TransactionModal;
