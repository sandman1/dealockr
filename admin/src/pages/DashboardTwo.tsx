// AdminDashboard.tsx
import React, { useState } from 'react';
import { userData } from './userData';
import {
  Container,
  Header,
  Title,
  TabNavigation,
  Tab,
  SearchBar,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  PageButton,
  PageNumbers,
  PageNumber,
  ActionButton
} from './styles';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = userData.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Header>
        <Title>Clients</Title>
        <ActionButton>+ Add New</ActionButton>
      </Header>

      <TabNavigation>
        <Tab active={activeTab === 'All Clients'} onClick={() => setActiveTab('All Clients')}>All Clients</Tab>
        <Tab active={activeTab === 'Leads'} onClick={() => setActiveTab('Leads')}>Leads</Tab>
        <Tab active={activeTab === 'Ongoing'} onClick={() => setActiveTab('Ongoing')}>Ongoing</Tab>
        <Tab active={activeTab === 'Payment Back'} onClick={() => setActiveTab('Payment Back')}>Payment Back</Tab>
        <Tab active={activeTab === 'Closed'} onClick={() => setActiveTab('Closed')}>Closed</Tab>
      </TabNavigation>

      <SearchBar
        type="text"
        placeholder="Search for Clients"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Client</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Fee Percentge</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((user, index) => (
              <TableRow key={index} onClick={() => navigate(`/user/${user.id}`)}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.companyName}</TableCell>
                <TableCell>{user.feePercentage}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <Pagination>
        <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </PageButton>
        <PageNumbers>
          {[...Array(totalPages)].map((_, pageIndex) => (
            <PageNumber
              key={pageIndex}
              active={currentPage === pageIndex + 1}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </PageNumber>
          ))}
        </PageNumbers>
        <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </Pagination>
    </Container>
  );
};

export default AdminDashboard;
