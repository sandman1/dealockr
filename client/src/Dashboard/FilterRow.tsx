import React from 'react';
import styled from 'styled-components';
import { SortButtonsRowItemLeft, SortButtonsRowItemRight, SortButtonsRowWrapper, SortingButton, SortingInfoText } from './styles';
import SearchComponent from './SearchComponent';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

interface FilterRowProps {
    updateSearchTerm: (term: string) => void;
    start: Number;
    total: Number;
    limit: string;
    updateLimit: (limit: string) => void;
  }

function FilterRow({updateSearchTerm, start, total, limit, updateLimit}: FilterRowProps): React.ReactElement {
  const navigate = useNavigate();

  const searchQuery = (query: string) => {
    updateSearchTerm(query);
  };

  const updateLimitCount = (limit: string | null) => {
    if (limit)
      updateLimit(limit);
  }

  return (
    <PageContainer>
      <SortButtonsRowWrapper>
        <SortButtonsRowItemLeft>
            <SortingButton>
                Export Transactions
            </SortingButton>
        </SortButtonsRowItemLeft>
        <SortButtonsRowItemRight>
            <SortingButton onClick={() => navigate('/transaction-form')}>
                Create a new transaction
            </SortingButton>
        </SortButtonsRowItemRight>
      </SortButtonsRowWrapper>
      <SortButtonsRowWrapper>
        <Dropdown onSelect={(limit) => updateLimitCount(limit)}>
          <Dropdown.Toggle  id="dropdown-basic">
            Limit to {limit}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={10}>10</Dropdown.Item>
            <Dropdown.Item eventKey={25}>25</Dropdown.Item>
            <Dropdown.Item eventKey={50}>50</Dropdown.Item>
            <Dropdown.Item eventKey={100}>100</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <SortButtonsRowItemRight>
            <SearchComponent searchQuery={searchQuery} />
            {/* <input placeholder='Enter a search term' /> */}
            
        </SortButtonsRowItemRight>
        <SortButtonsRowItemLeft>
            <SortingInfoText>
                {`Showing ${start} to 10 of ${total} Entries`}
            </SortingInfoText>
            
        </SortButtonsRowItemLeft>
      </SortButtonsRowWrapper>
    </PageContainer>
  );
};

export default FilterRow;