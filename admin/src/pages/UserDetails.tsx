import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserDetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 20px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const UserDetails = () => {
  const { id } = useParams();
  
  const usersList = [
    {
      "id": "1",
      "userName": "jdoe",
      "companyName": "Tech Solutions Inc.",
      "address": "1234 Maple St",
      "city": "Los Angeles",
      "state": "CA",
      "country": "USA",
      "feePercentage": 10,
      "status": "Active"
    },
    {
      "id": "2",
      "userName": "asmith",
      "companyName": "Innovative Corp",
      "address": "5678 Oak Dr",
      "city": "New York",
      "state": "NY",
      "country": "USA",
      "feePercentage": 12,
      "status": "Inactive"
    },
    {
      "id": "3",
      "userName": "mjones",
      "companyName": "Global Ventures",
      "address": "9101 Pine Ave",
      "city": "Chicago",
      "state": "IL",
      "country": "USA",
      "feePercentage": 8,
      "status": "Active"
    },
    {
      "id": "4",
      "userName": "awilson",
      "companyName": "Synergy Partners",
      "address": "1213 Cedar Blvd",
      "city": "Houston",
      "state": "TX",
      "country": "USA",
      "feePercentage": 15,
      "status": "Active"
    },
    {
      "id": "5",
      "userName": "bbrown",
      "companyName": "NextGen Technologies",
      "address": "1415 Elm St",
      "city": "Miami",
      "state": "FL",
      "country": "USA",
      "feePercentage": 9,
      "status": "Inactive"
    },
    {
      "id": "6",
      "userName": "csanders",
      "companyName": "Creative Solutions",
      "address": "1617 Birch Rd",
      "city": "San Francisco",
      "state": "CA",
      "country": "USA",
      "feePercentage": 10,
      "status": "Active"
    },
    {
      "id": "7",
      "userName": "dthomas",
      "companyName": "Alpha Enterprises",
      "address": "1819 Maple Ct",
      "city": "Seattle",
      "state": "WA",
      "country": "USA",
      "feePercentage": 13,
      "status": "Active"
    },
    {
      "id": "8",
      "userName": "egarcia",
      "companyName": "Venture Industries",
      "address": "2021 Oak Pl",
      "city": "Denver",
      "state": "CO",
      "country": "USA",
      "feePercentage": 11,
      "status": "Inactive"
    },
    {
      "id": "9",
      "userName": "fharris",
      "companyName": "Global Tech Co",
      "address": "2223 Pine Cir",
      "city": "Boston",
      "state": "MA",
      "country": "USA",
      "feePercentage": 7,
      "status": "Active"
    },
    {
      "id": "10",
      "userName": "gmartin",
      "companyName": "Tech Innovators",
      "address": "2425 Cedar Ln",
      "city": "Austin",
      "state": "TX",
      "country": "USA",
      "feePercentage": 14,
      "status": "Inactive"
    }
  ];

  // Fetch or mock data of user
  const user = usersList.find(user => user.id === id);

  return (
    <UserDetailsContainer>
      <h2>User Details</h2>
      <p>Name: {user?.userName}</p>
      <p>Company: {user?.companyName}</p>
      <p>Address: {user?.address}</p>
      <p>City: {user?.city}</p>
      <p>State: {user?.state}</p>
      <p>Country: {user?.country}</p>
      <p>Fee Percentage: {user?.feePercentage}%</p>
      <p>Status: {user?.status}</p>
    </UserDetailsContainer>
  );
};

export default UserDetails;
