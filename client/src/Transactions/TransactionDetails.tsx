import React, { useEffect, useState } from 'react';
import { PageContainer, TransactionHeader } from '../Dashboard/styles';
import { Stepper, Step, StepLabel } from '@mui/material';
import { ItemDetailsContainer, ItemRow } from './styles';
import { formatCurrency } from '../utils/utils'
import { FormData } from '../types';

function TransactionDetails(): React.ReactElement {
    
    const [ rowData, setRowData ] = useState<FormData>({
        // id: '',
        title: '', 
        amount: '', 
        currency: 'USD',
        category: '',
        role: 'Buyer',
        status: "Pending",
        inspectionPeriod: 1,
        items: [],
        subTotal: 0,
        feeSplit: 'Buyer',
        feeAmount: 50,
        buyerPrice: 0,
        sellerProceeds: 0,
        sellerEmail: '',
        sellerPhone: ''
    });
    const steps = ['Initiated', 'Pending', 'Accepted', 'Cancelled'];
    const activeStep = steps.indexOf(rowData.status);

    useEffect(() => {
        const savedData = localStorage.getItem('rowItemData');
        if (savedData) {
            setRowData(JSON.parse(savedData));
        }
    }, [])
    
    return (
        
        <PageContainer>
            {rowData && (
            <TransactionHeader>

                <h3>Transaction progress</h3>
                <ItemDetailsContainer>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                </ItemDetailsContainer>

                <h3>Transaction totals</h3>
                <ItemDetailsContainer>
                    <ItemRow>
                        <span>Subtotal</span>
                        <span>{rowData.category}</span>
                    </ItemRow>
                    <ItemRow>
                        <span>Subtotal</span>
                        <span>{formatCurrency(rowData.subTotal.toString(), rowData.currency)}</span>
                    </ItemRow>

                    <ItemRow>
                        <span>Fee paid by</span>
                        <span>{rowData.feeSplit}</span>
                    </ItemRow>

                    <ItemRow>
                        <span>Fee amount</span>
                        <span>{formatCurrency(rowData.feeAmount.toString(), rowData.currency)}</span>
                    </ItemRow>
                    
                    <ItemRow>
                        <span>Buyer price</span>
                        <span>{formatCurrency(rowData.buyerPrice.toString(), rowData.currency)}</span>
                    </ItemRow>

                    <ItemRow>
                        <span>Seller proceeds</span>
                        <span>{formatCurrency(rowData.sellerProceeds.toString(), rowData.currency)}</span>
                    </ItemRow>
                </ItemDetailsContainer>
            </TransactionHeader>
            )}
            {rowData.items && (
            <TransactionHeader>
                <h3>Transaction item list</h3>
                {rowData.items.map((item, index) => (
                    <ItemDetailsContainer key={index} >
                        <ItemRow>
                            <span>Item Name</span>
                            <span>{item.name}</span>
                        </ItemRow>

                        <ItemRow>
                            <span>Price</span>
                            <span>{formatCurrency(item.price.toString(), rowData.currency)}</span>
                        </ItemRow>

                        <ItemRow>
                            <span>Description</span>
                            <span>{item.description}</span>
                        </ItemRow>
                    </ItemDetailsContainer>
                ))}
            </TransactionHeader>
            )}
        </PageContainer>
    )
}

export default TransactionDetails;