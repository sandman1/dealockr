import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;

  @media (min-width: 768px) {
    margin-bottom: 0;
    width: 200px;
  }
`;

export const Input = styled.input<{ isvalid: boolean }>`
  display: flex;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  width: 90%;
  border: 1px solid ${({ isvalid }) => (isvalid ? "#ccc" : "red")};


  /* @media (min-width: 768px) {
    width: calc(100% - 200px);
    margin-left: 20px;
  } */
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 90%;

  /* @media (min-width: 768px) {
    width: calc(100% - 200px);
    margin-left: 20px;
  } */
`;

export const Button = styled.button`
width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;
  align-self: flex-end;

  &:hover {
    background-color: #0056b3;
  }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
    width: 30%;
`;



export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
`;

export const FieldItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%; 
`;

export const FieldItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

export const ModalTextarea = styled.textarea`
    display: flex;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 90%;
`;

export const ModalButtonContainer = styled.div`
    float: right;
`;

export const ModalButtonItem = styled.button`
    flex: 1;
    padding: 10px;
    margin: 10px;
    font-size: 16px;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;

    &:hover {
        background-color: #0056b3;
    }

    &:nth-child(1) {
        background-color: #fc4343;

        &:hover {
        background-color: #ff0000;
    }
    }
`;

export const ModalButton = styled.button`
    display: flex;
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: auto;

    &:hover {
        background-color: #0056b3;
    }
`;

export const TransactionDetailsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 16px;
    row-gap: 15px;
`;

export const TransactionDetailsRow = styled.div`
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 6px;
    padding: 20px 10px;
    margin: -3px 0;
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    cursor: pointer;
`;

export const TransactionDetailsInfo = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const TransactionDetailsLeft = styled.div`
    flex: 1;
`;

export const TransactionDetailsRight = styled.div`
    flex: 1;
    justify-content: flex-end;
    text-align: right;
`;

export const TransactionDetailsContent = styled.div`
    display: flex;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 6px;
    padding: 20px 10px;
    margin: -3px 0;
    position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    width: 100%;
`;


export const ItemDetailsContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  width: 50%;
  margin: 16px;
  font-family: Arial, sans-serif;
`;

export const Header = styled.h4`
  font-size: 1.2em;
  color: #1a73e8;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

export const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TotalRow = styled(ItemRow)`
  font-weight: bold;
  margin-top: 16px;
`;