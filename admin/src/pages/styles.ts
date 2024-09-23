// styled.ts
import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
`;

export const TabNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? '#e5e7eb' : 'transparent')};
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#111827' : '#6b7280')};
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const SearchBar = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 5px;
  font-size: 14px;
  color: #6b7280;
  width: 100%;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

export const TableHead = styled.thead`
  background-color: #f3f4f6;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:hover {
    cursor: pointer;
    background-color: #f0f0f0;
  }
`;

export const TableHeader = styled.th`
  padding: 12px 15px;
  font-size: 14px;
  color: #6b7280;
  text-align: left;
`;

export const TableBody = styled.tbody`
  background-color: white;
`;

export const TableCell = styled.td`
  padding: 12px 15px;
  font-size: 14px;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;
`;

export const ServiceTag = styled.span`
  display: inline-block;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 15px;
  background-color: #e5e7eb;
  font-size: 12px;
  color: #374151;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;

export const PageButton = styled.button`
  border: none;
  background-color: transparent;
  color: #4b5563;
  cursor: pointer;

  &:disabled {
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PageNumber = styled.button<{ active?: boolean }>`
  border: none;
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? '#FF7F11' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#6b7280')};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #FF9F45;
    color: #fff;
  }
`;

export const ActionButton = styled.button`
  background-color: #FF7F11;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #FF9F45;
  }
`;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

