import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { PageContainer, TableCell, TableContainer, TableRow, TransactionHeader } from './styles';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import FilterRow from './FilterRow';
// import { generateClient } from 'aws-amplify/api';
// import * as queries from '../../graphql/queries';
import { formatCurrency } from '../utils/utils'
import { FormData } from '../types';

function Dashboard(): React.ReactElement {
  const navigate = useNavigate();
  const [sort, setSort] = useState({ keyToSort: 'dateCreated', direction: 'asc' });
  const [limit, setSLimit] = useState('10');
  // const client = generateClient();

  const [data, setData] = useState([
    {
      title: '',
      amount: '',
      subTotal: 0,
      currency: 'USD',
      role: '',
      status: '',
      sellerProceeds: 0,
    }
  ]);

  const headers = [
    {
      id: 1,
      key: 'id',
      label: 'ID',
    },
    {
      id: 2,
      key: 'title',
      label: 'TITLE',
    },
    {
      id: 1,
      key: 'dateCreated',
      label: 'DATE CREATED',
    },
    {
      id: 3,
      key: 'amount',
      label: 'AMOUNT',
    },
    {
      id: 4,
      key: 'role',
      label: 'ROLE',
    },
    {
      id: 5,
      key: 'status',
      label: 'STATUS',
    },
    {
      id: 6,
      key: 'sellerProceeds',
      label: 'SELLER PROCEEDS',
    },
  ];

  const tabTypes = [
    {
      label: 'All',
      key: 'all'
    },
    {
      label: 'Pending',
      key: 'pending'
    },
    {
      label: 'Open',
      key: 'open'
    },
    {
      label: 'Completed',
      key: 'completed'
    },
    {
      label: 'Cancelled',
      key: 'cancelled'
    },
  ];

  const fetchTransactions = async () => {
    // try {
    //   const transactionData = await client.graphql({ 
    //     query: queries.listTransactions,
    //   });
    //   const transactionList = transactionData.data.listTransactions.items;
    //   setData(transactionList);
      
    // } catch (error) {
    //   console.log('error fetching the transactions ', error);
    // }
  }

  const fetchTransactionById = async (id: string) => {
    // try {
    //   const result = await client.graphql({ 
    //     query: queries.getTransaction,
    //     variables: { id }
    //   });

    //   if (result.data) {
    //     return result.data.getTransaction;
    //   } else {
    //     throw new Error('No data found');
    //   }
    // } catch (error) {
    //   console.log('error fetching the transactions ', error);
    // }
  }
  
  useEffect(() => {
    fetchTransactions();
  }, []);

  const updateSearchTerm = (searchTerm: string) => {
    // TODO: need to connect this to a query to use term, limit, etc
    if (searchTerm === '') {
      fetchTransactions();
    } else {
      const filteredData = data.filter(item => {
        // Convert filter and data to lowercase to make the search case-insensitive
        const filterText = searchTerm.toLowerCase();
        return Object.values(item).some(value =>
          value.toString().toLowerCase().includes(filterText)
        );
      });

      setData(filteredData);
    }
  };

  const handleHeaderClick = (header: any) => {
    setSort({
      keyToSort: header.key,
      direction: header.key === sort.keyToSort ? sort.direction === 'asc' ? 'desc' : 'asc' : 'desc'
    })
  };

  const onRowRecodClick = async (row: FormData) => {
    // const dataResult = await fetchTransactionById(row.id);
    // localStorage.setItem('rowItemData', JSON.stringify(dataResult));
    // navigate('/transactionDetails');
  }

  const getSortedData = (arrayToSort: any, sortType: string) => {
    if(sortType !== 'All') {
      arrayToSort = arrayToSort.filter((item: any) => item.status === sortType);
    }
    
    if  (sort.direction === 'asc') {
      return arrayToSort.sort((a: any, b: any) => (a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1)).slice(0, limit);
    }
    return arrayToSort.sort((a: any, b: any) => (a[sort.keyToSort] > b[sort.keyToSort] ? -1 : 1)).slice(0, limit);
  }

  const updateLimit = (limit: string) => {
    setSLimit(limit);
  }

  return (
    <PageContainer>
      <TransactionHeader>
        <h1>My Transactions</h1>
        <Tabs defaultActiveKey="all" className="mb-3">

          {tabTypes.map((tab) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.label}>
              <TableContainer>
                <FilterRow 
                  updateSearchTerm={updateSearchTerm} 
                  start={1}
                  total={data.length}
                  limit={limit}
                  updateLimit={updateLimit}
                  />
                {getSortedData(data, tab.label).length > 0 ? (
                  <>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableCell key={index} className="header" onClick={() => handleHeaderClick(header)}>
                          {header.label} 
                          {header.key ===sort.keyToSort && (
                            <span>{sort.direction === 'asc' ? <BsChevronDown /> : <BsChevronUp />}</span>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {getSortedData(data, tab.label).map((row: any, index: any) => (
                      <TableRow key={index} onClick={() => onRowRecodClick(row)}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>{row.createdAt}</TableCell>
                        <TableCell>{formatCurrency(row.subTotal.toString(), row.currency)}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>{formatCurrency(row.sellerProceeds.toString(), row.currency)}</TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <div>
                    <h1>There's nothing here yet. Click below to start a new transaction.</h1>
                  </div>
                )}
              </TableContainer>
            </Tab>
          ))}
        </Tabs>
      </TransactionHeader>
    </PageContainer>
  );
};

export default Dashboard;
