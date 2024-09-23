import styled from 'styled-components';

export const PageContainer = styled.div`
  position: relative;
`;

export const TransactionHeader = styled.header`
  @media (min-width: 680px) {
      position: relative;
      z-index: 2;
      width: 100%;
      /* max-width: 1120px; */
      max-width: 80%;
      min-width: 288px;
      margin: 0 auto;
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 4rem;
      z-index: 10;
}
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px auto;
`;

export const TableRow = styled.div`
  display: flex;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

export const TableCell = styled.div`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;

  &.header {
    background-color: #eee;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  span {
    float: right;
  }
`;

export const SortButtonsRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const SortButtonsRowItemLeft = styled.div`
  flex: 1 0 50%;
`;

export const SortButtonsRowItemRight = styled.div`
  flex: 1 0 50%;
  justify-content: flex-end;
  text-align: right;

  input {
    width: 250px;
    margin: 0 5px;
    border-radius: 4px;
  }
`;

export const SortingButton = styled.button`
  background-color: #0d6efd;
  color: white;
  font-size: 16px;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  text-align: center;
`;

export const SortingInfoText = styled.div`
  margin: 20px 5px 5px;
`;