import React from 'react';
import { Card } from '../../../components/Card/Card';
import { Text } from '../../../components/Typography/Text';
import { Table } from '../../../components/Table/Table';
import { BorderStyle, IconContainer } from './GroupsStyle';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Modal } from '../../../components/Modal/Modal';
import { Icon } from '@material-ui/core';
import { GroupsComponentProps } from '../../../containers/Paywall/Groups';
import { GroupPromoModal } from './GroupPromoModal'
import { GroupPromo, GroupPrice } from '../../../redux-flow/store/Paywall/Groups';
import { CustomStepper } from '../../../components/Stepper/Stepper';
import { GroupPriceStepperFirstStep, GroupPriceStepperSecondStep } from './GroupPriceSteps'
import { FoldersInfos } from '../../../redux-flow/store/Folders/types';

interface GroupStepperSecondStepProps {
    folderData: FoldersInfos;
    getFolders: Function;
    getFolderContent: Function;
    restoreContent: Function;
}

export interface GroupStepperData {
    firststep: GroupPrice;
    secondStep: GroupStepperSecondStepProps;
}

export const GroupsPage = (props: GroupsComponentProps) => {
    const pricesList = [
        {
            amount: 90,
            currency: 'USD'
        }
    ]
    
    const defaultPrice: GroupPrice = {
        id: '-1',
        name: '',
        type: 'Subscription',
        price: pricesList,
        duration: {amount: 90, type: 'Hours'},
        recurrence: 'Weekly',
        startMethod: 'Upon Purchase',
        timezone: null,
        startDate: null,
        startTime: null
    
    }
    const [groupPricesStepperOpened, setGroupPricesStepperOpened] = React.useState<boolean>(false);
    const [groupPromosModalOpened, setGroupPromosModalOpened] = React.useState<boolean>(false);
    const [selectedGroupPrice, setSelectedGroupPrice] = React.useState<GroupPrice>(null);
    const [selectedGroupPromo, setSelectedGroupPromo] = React.useState<GroupPromo>(null);
    const [stepperData, setStepperData] = React.useState<GroupStepperData>({firststep: defaultPrice, secondStep: {...props}});
    const groupPriceSteps = [GroupPriceStepperFirstStep, GroupPriceStepperSecondStep]

    React.useEffect(() => {
        setStepperData({...stepperData, secondStep: {...props}})
    }, [props])

    const groupPricesTableHeader = () => {
        return [
            <Text key='groupPricesTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='groupPricesTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='groupPricesTableHeaderPrice' size={14} weight='med'>Price</Text>,
            <Text key='groupPricesTableHeaderCurrency' size={14} weight='med'>Currency</Text>,
            <Text key='groupPricesTableHeaderDuration' size={14} weight='med'>Duration/Recurrence</Text>,
            <Text key='groupPricesTableHeaderMethod' size={14} weight='med'>Start Method</Text>,
            <Button key='groupPricesTableHeaderButton' className='right mr2' onClick={() => {setSelectedGroupPrice(null);setGroupPricesStepperOpened(true)}} typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Price Group</Button>

        ]
    }

    const groupPricesTableBody = () => {
        if(props.groupsInfos.prices) {
            return props.groupsInfos.prices.map((price, key) => {
                return [
                    <Text key={'groupPricesTableBodyName' + key} size={14} weight='reg'>{price.name}</Text>,
                    <Text key={'groupPricesTableBodyType' + key} size={14} weight='reg'>{price.type}</Text>,
                    <Text key={'groupPricesTableBodyPrice' + key} size={14} weight='reg'>{price.price[0].amount}</Text>,
                    <Text key={'groupPricesTableBodyCurrency' + key} size={14} weight='reg'>{price.price[0].currency}</Text>,
                    <Text key={'groupPricesTableBodyDuration' + key} size={14} weight='reg'>{price.recurrence ? price.recurrence : price.duration.amount + ' ' + price.duration.type}</Text>,
                    <Text key={'groupPricesTableBodyMethod' + key} size={14} weight='reg'>{price.startMethod}</Text>,
                    <IconContainer className="iconAction" key={'groupPricesTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deleteGroupPrice(price)}}>delete</Icon><Icon onClick={() =>  {setSelectedGroupPrice(price);setGroupPricesStepperOpened(true)}}>edit</Icon></IconContainer>
                ]
            })
        }
    }

    const groupPromosTableHeader = () => {
        return [
            <Text key='promoGroupsTableHeaderName' size={14} weight='med'>Name</Text>,
            <Text key='promoGroupsTableHeaderType' size={14} weight='med'>Type</Text>,
            <Text key='promoGroupsTableHeaderCode' size={14} weight='med'>Code</Text>,
            <Text key='promoGroupsTableHeaderDiscount' size={14} weight='med'>Discount</Text>,
            <Text key='promoGroupsTableHeaderLimit' size={14} weight='med'>Limit</Text>,
            <Button key='promoGroupsTableHeaderButton' onClick={() => {setSelectedGroupPromo(null);setGroupPromosModalOpened(true)}} className='right mr2'  typeButton='secondary' sizeButton='xs' buttonColor='blue'>New Promo Group</Button>

        ]
    }

    const groupPromosTableBody = () => {
        if(props.groupsInfos.promos) {
            return props.groupsInfos.promos.map((promo, key) => {
                return [
                    <Text key={'promoGroupsTableBodyName' + key} size={14} weight='reg'>{promo.name}</Text>,
                    <Text key={'promoGroupsTableBodyType' + key} size={14} weight='reg'>{promo.rateType}</Text>,
                    <Text key={'promoGroupsTableBodyAlphanumericCode' + key} size={14} weight='reg'>{promo.alphanumericCode}</Text>,
                    <Text key={'promoGroupsTableBodyDiscount' + key} size={14} weight='reg'>{promo.discount}</Text>,
                    <Text key={'promoGroupsTableBodyLimit' + key} size={14} weight='reg'>{promo.limit}</Text>,
                    <IconContainer className="iconAction" key={'promoGroupsTableBodyActionButtons' + key}><Icon onClick={() =>  {props.deleteGroupPromo(promo)}}>delete</Icon><Icon onClick={() =>  {setSelectedGroupPromo(promo);setGroupPromosModalOpened(true)}}>edit</Icon></IconContainer>
                ]
            })
        }
    }

    return (
        <div>
            <Card>
                <Text size={20} weight='med'>Group Prices</Text>
                <Text size={14} weight='reg' color='gray-3'>Group content into a single Price Group that can be purchased together.</Text>
                <Text size={14} weight='reg' color='gray-3'>Need help setting up a Group Price ? Visit the Knowledge Base</Text>
                <Table className='my2' id='groupPricessTable' header={groupPricesTableHeader()} body={groupPricesTableBody()} />
                <BorderStyle className='my2' />

                <Text size={20} weight='med'>Groups Promo</Text>
                <Text size={14} weight='reg' color='gray-3'>Allow a promo to be used to purchase content in a Price Group.</Text>
                <Text size={14} weight='reg' color='gray-3'>Need help setting up a Group Promo? Visit the Knowledge Base</Text>
                <Table className='my2' id='groupPromosTable' header={groupPromosTableHeader()} body={groupPromosTableBody()} />
            </Card>
            <Modal hasClose={false} title='Create Promo Code Group' opened={groupPromosModalOpened} toggle={() => setGroupPromosModalOpened(false)}>
                <GroupPromoModal action={selectedGroupPromo ? props.saveGroupPromo : props.createGroupPromo} groupPromo={selectedGroupPromo} toggle={setGroupPromosModalOpened} />
            </Modal>
            <CustomStepper
                opened={groupPricesStepperOpened}
                stepperHeader='Create Price Group'
                stepList={groupPriceSteps}
                nextButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Next"}} 
                backButtonProps={{typeButton: "secondary", sizeButton: "large", buttonText: "Back"}} 
                cancelButtonProps={{typeButton: "primary", sizeButton: "large", buttonText: "Cancel"}}
                stepTitles={['Group Details', 'Content Selection']}
                lastStepButton="Create"
                stepperData={stepperData}
                updateStepperData={(value: GroupStepperData) => setStepperData(value)}
                functionCancel={setGroupPricesStepperOpened}
                finalFunction={() => {selectedGroupPrice ? props.saveGroupPrice(stepperData.firststep) : props.createGroupPrice(stepperData.firststep)}}
            />
        </div>

    )
}

