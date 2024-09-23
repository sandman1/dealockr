// Pagination.tsx
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
`;

const PaginationButton = styled.button`
  margin-left: 10px;
  background-color: ${({ theme }) => theme.colors.gray};
`;

const Pagination = ({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) => {
  return (
    <PaginationContainer>
      {[...Array(totalPages)].map((_, index) => (
        <PaginationButton
          key={index}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </PaginationButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
