import React from 'react';
import { Card } from '../../../../components/Card/Card';
import { Text } from '../../../../components/Typography/Text';
import { DropdownSingle } from '../../../../components/FormsComponents/Dropdown/DropdownSingle';
import { Input } from '../../../../components/FormsComponents/Input/Input';
import { Button } from '../../../../components/FormsComponents/Button/Button';
import { AccountType, PaymentMethod, PaymentMethodPut, PaymentMethodType } from '../../../redux-flow/store/Paywall/Payout/types';
import { Tab } from '../../../../components/Tab/Tab';
import { Routes } from '../../../containers/Navigation/NavigationTypes';
import { Divider } from '../../../../shared/MiscStyles';
import { useForm } from 'react-hook-form';
import { handleValidationForm } from '../../../utils/custom-hooks/formValidationHook';
import { DropdownSingleListItem } from '../../../../components/FormsComponents/Dropdown/DropdownTypes';

export const PaywallPaymentMethod = (props: {displayPage: (b: boolean) => void; addPaymentMethodRequest: (data: PaymentMethod) => Promise<void>, selectedPaymentMethod: PaymentMethod}) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<string>(props.selectedPaymentMethod ? props.selectedPaymentMethod.paymentMethodType : "Bank Account (US)");
    const [paymentMethodData, setPaymentMethodData] = React.useState<PaymentMethod>(props.selectedPaymentMethod);
    const [paymentMethodRecipientType, setPaymentMethodRecipientType] = React.useState<'Business' | 'Personal'>(props.selectedPaymentMethod && props.selectedPaymentMethod.recipientType === 'Personal' ? 'Personal' : 'Business')
    const [buttonLoading, setButtonLoading] = React.useState<boolean>(false)
    const [accountType, setAccountType] = React.useState<AccountType>(props.selectedPaymentMethod && props.selectedPaymentMethod.accountType ? props.selectedPaymentMethod.accountType : 'Checking');

    const payoutTypeDropdownList = [{title: "Bank Account (US)"}, {title: "Bank Account (International)"}, {title: "Check"}, {title: "PayPal"}]

    const { register, handleSubmit, errors, setValue, reset, formState } = useForm({
        reValidateMode: 'onChange',
        mode: 'onBlur',
        // defaultValues: paymentMethodData || {},
    })

    const handleChange = (key: string, value: string) => {
        setValue(key, value)
        // setPaymentMethodData({...paymentMethodData, [key]: value})
    }

    const onSubmit = (data: PaymentMethodPut) => { 
        setButtonLoading(true)
        props.addPaymentMethodRequest(
            {
                ...data, 
                paymentMethodType: selectedPaymentMethod, 
                recipientType: paymentMethodRecipientType,
                accountType: accountType,
                id: paymentMethodData ? paymentMethodData.id : null
            }
        )
        .then(() => {
            setButtonLoading(false)
            props.displayPage(false)
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    const accountTypesList: {title: AccountType}[] = [
        {title: "Checking"},
        {title: "Savings"}
    ]

    const tabsList: Routes[] = [
        {
            name: "Business",
            path: 'Business'
        },
        {
            name: 'Personal',
            path: 'Personal'
        }

    ]

    const handleAccountTypeDropdown = () => {
        return (
            <DropdownSingle 
                isInModal
                className='col col-12 sm-col-4 pl1 xs-no-gutter'
                id='accountType' 
                dropdownTitle='Account Type' 
                list={accountTypesList} 
                callback={(item: DropdownSingleListItem) => {setAccountType(item.title as AccountType)}}
                dropdownDefaultSelect={accountType}
            />
        )
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='reg'>New Withdrawal Method</Text>
                <div className="mt2">
                    <Text size={14} weight='reg'>Please Select which method you would like to add</Text>
                </div>
                <div className='mt2'>
                    <div className='col sm-col-3 col-12 pr1 clearfix xs-no-gutter mb2'>
                        <Input 
                            className="mb1" 
                            id='paymentMethodName' 
                            defaultValue={paymentMethodData ? paymentMethodData.paymentMethodName : ''} 
                            label='Name' 
                            placeholder='Payout Method Name' 
                            {...handleValidationForm('paymentMethodName', errors)}
                            ref={register({ required: "Required"})}
                            onChange={(event) =>  handleChange('paymentMethodName', event.currentTarget.value)} 
                        />
                        <Text size={12} weight="reg">If you have multiple payout methods of the same type, this name will help you </Text>
                    </div>
                    <DropdownSingle 
                        isInModal
                        className='col sm-col-3 col-12 px1 xs-mb2 clearfix xs-no-gutter'
                        id='paywallNewPaymentDropdown' 
                        dropdownTitle='Payout Type' 
                        list={payoutTypeDropdownList} 
                        callback={(item: DropdownSingleListItem) => {reset(paymentMethodData, {errors: true});setSelectedPaymentMethod(item.title)}}
                        dropdownDefaultSelect={selectedPaymentMethod}
                    />
                    {
                        (selectedPaymentMethod === PaymentMethodType.BankAccountUS || selectedPaymentMethod === PaymentMethodType.BankAccountInternational) &&
                            <div style={{marginTop: 2}} className="col col-4 pl1 xs-no-gutter">
                                <Tab className='col col-12' tabDefaultValue={paymentMethodRecipientType === 'Business' ? 0 : 1} orientation='horizontal' list={tabsList} callback={(value: string) => setPaymentMethodRecipientType(value as 'Business' | 'Personal')} label="Recipient Type" />
                            </div>
                    }   
                </div>

                <Divider className='mb2' />
                <form id='paymentMethodForm' onSubmit={handleSubmit(onSubmit)}>

               {selectedPaymentMethod === PaymentMethodType.BankAccountUS &&
                <div className='flex flex-column'>
                <Text size={20} weight='reg'>Account Details</Text>
                 <div className='col col-12 sm-col-11 my2'>
                    <Input 
                        className='col col-12 sm-col-4 pr1 xs-no-gutter xs-mb2' 
                        id='accountNumberUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.accountNumber : ''} 
                        label='Account Number' 
                        placeholder='Account Number' 
                        {...handleValidationForm('accountNumberUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('accountNumberUS', event.currentTarget.value)} 
                    />
                    <Input 
                        className='col col-12 sm-col-4 pl1 pr1 xs-no-gutter xs-mb2' 
                        id='routingNumberUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.routingNumber : ''} 
                        label='Routing Number' 
                        placeholder='Routing Number' 
                        {...handleValidationForm('routingNumberUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('routingNumberUS', event.currentTarget.value)}    
                    />
                    {handleAccountTypeDropdown()}
                </div>
                
                <div className='col sm-col-11 col-12 mb2'>
                    {
                        paymentMethodRecipientType === 'Personal' &&
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 xs-no-gutter pr1' 
                                id='firstNameUS' 
                                defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                label="Account Holder's First Name" 
                                placeholder='First Name' 
                                {...handleValidationForm('firstNameUS', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('firstNameUS', event.currentTarget.value)}  
                            /> 
                    }
                    {
                        paymentMethodRecipientType === 'Personal' &&
                            <Input 
                                className='col col-12 sm-col-4 xs-mb2 px1 xs-no-gutter' 
                                id='lastNameUS' 
                                defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                label="Account Holder's Last Name" 
                                placeholder='Last Name' 
                                {...handleValidationForm('lastNameUS', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('lastNameUS', event.currentTarget.value)}     
                            /> 
                    }

                    {
                        paymentMethodRecipientType === 'Business' &&
                            <Input 
                                className='col col-12 sm-col-4 xs-no-gutter pr1' 
                                id='accountNameUS' 
                                defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                label='Account Name' 
                                placeholder='Account Name' 
                                {...handleValidationForm('accountNameUS', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('accountNameUS', event.currentTarget.value)} 
                            />
                    }
                </div>
                <div className='col col-12 sm-col-11 mb2'>
                    <Input 
                        className='col col-12 sm-col-7 xs-no-gutter xs-mb2 pr1' 
                        id='addressUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                        label='Address' 
                        placeholder='Address' 
                        {...handleValidationForm('addressUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('addressUS', event.currentTarget.value)} 
                    />
                    <Input 
                        className='col col-12 sm-col-5 xs-no-gutter pl1' 
                        id='address2US' 
                        defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                        label='Address Line 2' 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}
                        onChange={(event) =>  handleChange('address2US', event.currentTarget.value)}  
                    />
                </div>
                <div className='col col-12 sm-col-6 mb2 clearfix'>
                    <Input 
                        className='col col-6 sm-col-4 pr1 xs-mb2' 
                        id='townUS' 
                        label='City' 
                        defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                        placeholder='City' 
                        {...handleValidationForm('townUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('townUS', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-6 sm-col-4 px1' 
                        id='stateUS' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('stateUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('stateUS', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-12 sm-col-4 xs-no-gutter pl1 mb2' 
                        id='zipCodeUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                        label='Zip/Postal Code' 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('zipCodeUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('zipCodeUS', event.currentTarget.value)}  
                    />
                </div>
    
                <Divider className='mb2' />
                <Text size={20} weight='reg'>Bank Details</Text>
                <div className='col col-12 my2'>
                    <Input 
                        className='col col-12 sm-col-4' 
                        id='bankNameUS' 
                        label='Bank Name' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankName : ''} 
                        placeholder='Bank Name' 
                        {...handleValidationForm('bankNameUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankNameUS', event.currentTarget.value)}  
                    />
                </div>
                <div className='col col-12 sm-col-11 mb2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                        id='bankAddressUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankAddress : ''} International
                        label='Address' 
                        placeholder='Address' 
                        {...handleValidationForm('bankAddressUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankAddressUS', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='bankAddress2US' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankAddress2 : ''} 
                        label='Address Line 2' 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}
                        onChange={(event) =>  handleChange('bankAddress2US', event.currentTarget.value)} 
                    />
                </div>
                <div className='col col-12 sm-col-8 clearfix mb2'>
                    <Input 
                        className='col col-6 sm-col-4 pr1' 
                        id='bankStateUS' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankState : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('bankStateUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankStateUS', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-6 sm-col-4 px1 xs-mb2' 
                        id='bankTownUS'   
                        label='Town/City' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankTown : ''} 
                        placeholder='Town/City' 
                        {...handleValidationForm('bankTownUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankTownUS', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col col-12 sm-col-4 xs-no-gutter pl1' 
                        id='bankZipCodeUS' 
                        defaultValue={paymentMethodData ? paymentMethodData.bankZipCode : ''} 
                        label='Zip/Postal Code' 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('bankZipCodeUS', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('bankZipCodeUS', event.currentTarget.value)}  
                    />
                </div>
            </div>}
                    
                    {
                        selectedPaymentMethod === PaymentMethodType.BankAccountInternational &&
                        <div className='flex flex-column'>
                        <Text className='col col-12' size={20} weight='reg'>Account Details</Text>
                        <div className='col col-12 sm-col-11 mt2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' 
                                id='swiftInternational' 
                                defaultValue={paymentMethodData ? paymentMethodData.swift : ''} 
                                label='SWIFT/BIC' 
                                placeholder='SWIFT/BIC' 
                                {...handleValidationForm('swiftInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('swiftInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-4 pl1 pr1 xs-mb2' 
                                id='ibanInternational' 
                                label='IBAN/Account Number' 
                                defaultValue={paymentMethodData ? paymentMethodData.iban : ''} 
                                placeholder='IBAN/Account Number' 
                                {...handleValidationForm('ibanInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('ibanInternational', event.currentTarget.value)} 
                            />
                            {handleAccountTypeDropdown()}
                        </div>
                        <div className='col col-12 sm-col-11 mt2'>
                            {
                                paymentMethodRecipientType === 'Personal' && 
                                <Input 
                                className='col xs-no-gutter col-12 sm-col-4 xs-mb2 pr1' 
                                    id='firstNameInternational' 
                                    defaultValue={paymentMethodData ? paymentMethodData.firstName : ''} 
                                    label='First Name' 
                                    placeholder='First Name' 
                                    {...handleValidationForm('firstNameInternational', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('firstNameInternational', event.currentTarget.value)} 
                                /> 
                            }
                            {
                                paymentMethodRecipientType === 'Personal' &&
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 xs-mb2 px1' 
                                    id='lastNameInternational' 
                                    defaultValue={paymentMethodData ? paymentMethodData.lastName : ''} 
                                    label='Last Name' 
                                    placeholder='Last Name' 
                                    {...handleValidationForm('lastNameInternational', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('lastNameInternational', event.currentTarget.value)} 
                                /> 
                            }
                            {
                                paymentMethodRecipientType === 'Business' &&
                                <Input 
                                    className='col xs-no-gutter col-12 sm-col-4 pr1' 
                                    id='accountNameInternational' 
                                    defaultValue={paymentMethodData ? paymentMethodData.accountName : ''} 
                                    label='Account Name' 
                                    placeholder='Account Name' 
                                    {...handleValidationForm('accountNameInternational', errors)}
                                    ref={register({ required: "Required"})}
                                    onChange={(event) =>  handleChange('accountNameInternational', event.currentTarget.value)} 
                                /> 
                            }
                        </div>
                        <div className='col col-12 sm-col-11 my2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                                id='addressInternational' 
                                defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                                label='Address' 
                                placeholder='Address' 
                                {...handleValidationForm('addressInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('addressInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-5 pl1' 
                                id='address2International' 
                                defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                                label='Address Line 2' 
                                indicationLabel='Optional' 
                                placeholder='Address' 
                                ref={register()}                            
                                onChange={(event) => handleChange('address2International', event.currentTarget.value)}
                            />
                        </div>
                        <div className='col col-12 sm-col-11 mb2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-3 xs-mb2 pr1' 
                                id='stateInternational' 
                                label='State/Province' 
                                defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                                placeholder='State/Province' 
                                {...handleValidationForm('stateInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('stateInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pl1 pr1 xs-mb2' 
                                id='townInternational' 
                                label='Town/City' 
                                defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                                placeholder='Town/City' 
                                {...handleValidationForm('townInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('townInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pr1 pl1' 
                                id='zipCodeInternational' 
                                label='Zip/Postal Code' 
                                defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                                placeholder='Zip/Postal Code' 
                                {...handleValidationForm('zipCodeInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('zipCodeInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-3 pl1' 
                                id='countryInternational' 
                                label='Country' 
                                defaultValue={paymentMethodData ? paymentMethodData.country : ''} 
                                placeholder='Country' 
                                {...handleValidationForm('countryInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('countryInternational', event.currentTarget.value)} 
                            />
                        </div>
            
                        <Divider className='my2' />
                        <Text size={20} weight='reg'>Bank Details</Text>
                        <div className='col col-12 my2'>
                            <Input 
                                className='col col-12 sm-col-4' 
                                id='bankNameInternational' 
                                label='Bank Name' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankName : ''} 
                                placeholder='Bank Name' 
                                {...handleValidationForm('bankNameInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankNameInternational', event.currentTarget.value)}  
                            />
                        </div>
                        <div className='col col-12 sm-col-11 mb2'>
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-7 xs-mb2 pr1' 
                                id='bankAddressInternational' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankAddress : ''} 
                                label='Address' 
                                placeholder='Address' 
                                {...handleValidationForm('bankAddressInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankAddressInternational', event.currentTarget.value)}   
                            />
                            <Input 
                                className='col xs-no-gutter col-12 sm-col-5 pl1' 
                                id='bankAddress2International' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankAddress2 : ''} 
                                label='Address Line 2' 
                                indicationLabel='Optional' 
                                placeholder='Address' 
                                ref={register()}                            
                                onChange={(event) => handleChange('bankAddress2International', event.currentTarget.value)}   
                            />
                        </div>
                        <div className='col col-12 sm-col-11 clearfix mb2'>
                            <Input 
                                className='col col-6 sm-col-3 pr1' 
                                id='bankStateInternational' 
                                label='State/Province'
                                defaultValue={paymentMethodData ? paymentMethodData.bankState : ''} 
                                placeholder='State/Province' 
                                {...handleValidationForm('bankStateInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankStateInternational', event.currentTarget.value)}
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pr1 pl1 sx-mb2' 
                                id='bankTownInternational' 
                                label='Town/City' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankTown : ''} 
                                placeholder='Town/City' 
                                {...handleValidationForm('bankTownInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankTownInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 sm-pl1 pr1' 
                                id='bankZipCodeInternational' 
                                label='Zip/Postal Code' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankZipCode : ''} 
                                placeholder='Zip/Postal Code' 
                                {...handleValidationForm('bankZipCodeInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankZipCodeInternational', event.currentTarget.value)} 
                            />
                            <Input 
                                className='col col-6 sm-col-3 pl1' 
                                id='bankCountryInternational' 
                                label='Country' 
                                defaultValue={paymentMethodData ? paymentMethodData.bankCountry : ''} 
                                placeholder='Country' 
                                {...handleValidationForm('bankCountryInternational', errors)}
                                ref={register({ required: "Required"})}
                                onChange={(event) =>  handleChange('bankCountryInternational', event.currentTarget.value)} 
                            />
                        </div>
                    </div>
                    }
                    {
                        selectedPaymentMethod === PaymentMethodType.Check &&
                        <div>
                <Text className='col col-12' size={20} weight='reg'>Check Details</Text>
                <div className='col col-12 sm-col-11 my2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' 
                        id='payee' 
                        label='Payee' 
                        defaultValue={paymentMethodData ? paymentMethodData.payee : ''} 
                        placeholder='Payee' 
                        {...handleValidationForm('payee', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('payee', event.currentTarget.value)}    
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='companyName' 
                        label='Company Name' 
                        defaultValue={paymentMethodData ? paymentMethodData.companyName : ''} 
                        indicationLabel='Optional' 
                        placeholder='Company Name' 
                        ref={register()}                            
                        onChange={(event) => handleChange('companyName', event.currentTarget.value)}      
                    />
                </div>
                <div className='col col-12 sm-col-11'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-7 pr1 xs-mb2' 
                        id='checkAddress' 
                        label='Street Address' 
                        defaultValue={paymentMethodData ? paymentMethodData.address : ''} 
                        placeholder='Address' 
                        {...handleValidationForm('checkAddress', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('checkAddress', event.currentTarget.value)}  
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-5 pl1' 
                        id='checkAddressLine2' 
                        label='Address Line 2'
                        defaultValue={paymentMethodData ? paymentMethodData.address2 : ''} 
                        indicationLabel='Optional' 
                        placeholder='Address' 
                        ref={register()}                            
                        onChange={(event) => handleChange('checkAddressLine2', event.currentTarget.value)} 
                    />
                </div>
                <div className='col col-12 my2'>
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-2 pr1 xs-mb2' 
                        id='checkState' 
                        label='State/Province' 
                        defaultValue={paymentMethodData ? paymentMethodData.state : ''} 
                        placeholder='State/Province' 
                        {...handleValidationForm('checkState', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('checkState', event.currentTarget.value)}                    
                    />
                    <Input 
                        className='col col-6 sm-col-2 sm-pl1 pr1' 
                        id='checkTown' 
                        label='Town/City' 
                        defaultValue={paymentMethodData ? paymentMethodData.town : ''} 
                        placeholder='Town/City' 
                        {...handleValidationForm('checkTown', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('checkTown', event.currentTarget.value)}                     
                    />
                    <Input 
                        className='col col-6 sm-col-2 sm-pr1 pl1 xs-mb2' 
                        id='checkZipCode' 
                        label='Zip/Postal Code' 
                        defaultValue={paymentMethodData ? paymentMethodData.zipCode : ''} 
                        placeholder='Zip/Postal Code' 
                        {...handleValidationForm('checkZipCode', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('checkZipCode', event.currentTarget.value)}                     
                    />
                    <Input 
                        className='col xs-no-gutter col-12 sm-col-3 pl1' 
                        id='checkCountry' 
                        label='Country' 
                        defaultValue={paymentMethodData ? paymentMethodData.country : ''} 
                        placeholder='Country' 
                        {...handleValidationForm('checkCountry', errors)}
                        ref={register({ required: "Required"})}
                        onChange={(event) =>  handleChange('checkCountry', event.currentTarget.value)}                     
                    />
                </div>
            </div>
                    }
                    {
                        selectedPaymentMethod === PaymentMethodType.PayPal &&
                        <div>
                        <Text size={20} weight='reg'>PayPal Details</Text>
                        <div className='col col-12 my2'>
                            <Input 
                                className='col col-4 pr1' 
                                id='emailAddress' 
                                label='Email Address' 
                                defaultValue={paymentMethodData ? paymentMethodData.emailAddress : ''} 
                                placeholder='Email Address' 
                                {...handleValidationForm('emailAddress', errors, 'email', register)}
                                onChange={(event) =>  handleChange('emailAddress', event.currentTarget.value)}                    
                            />
                        </div>
                        <div className='col col-12 mb2'>
                            <Input 
                                type="textarea" 
                                indicationLabel="Optional" 
                                className='col col-4 pr1' 
                                defaultValue={paymentMethodData ? paymentMethodData.comments : ''} 
                                id='comments' 
                                label='Comments' 
                                placeholder='Comments' 
                                ref={register()}                            
                                onChange={(event) => handleChange('comments', event.currentTarget.value)}                    
                            />
                        </div>
                    </div>
                    }
                </form>
            </Card> 
            <div className='my2'>
                <Button type='submit' form='paymentMethodForm' isLoading={buttonLoading} className='mr2' typeButton='primary' sizeButton='large' buttonColor='blue'>Save</Button>
                <Button onClick={() => {props.displayPage(false)}} typeButton='tertiary' sizeButton='large' buttonColor='blue'>Cancel</Button>
            </div>
        </div>

    )
}

