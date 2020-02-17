import React from 'react';
import { LoadingSpinner} from '../../components/FormsComponents/Progress/LoadingSpinner/LoadingSpinner'
import { PlansPage } from '../../pages/Account/Plans/Plans';


export interface CustomAllowance {
    amount: number;
    price: number;
    currentAmount: boolean;
}

export interface Plan {
    name: 'developer' | 'event' | 'scale';
    firstStep: {
        included: {
            defaultBanwidth: number;
            defaultStorage: number;
            defaultTranscoding: number;
            price: number;
        };
        custom?: {
            [key: string]: CustomAllowance[];
        };
        total: number;
    };
    secondStep: {
        included: string[];
        custom: {
            [key: string]: {checked: boolean; price: number};
        };
        total: number;
    };
    paymentFrequency: 'Annually' | 'Monthly';
    termsAndConditions: boolean;
    action: 'custom' | 'purchase';
}
export interface Plans {
    developerPlan: Plan;
    eventPlan: Plan;
    scalePlan: Plan;
}




const data: Plans = {
    developerPlan: {
        action: 'purchase',
        name: 'developer',
        firstStep: {
            included: {
                defaultBanwidth: 100,
                defaultStorage: 20,
                defaultTranscoding: 20,
                price: 250
            },
            total: 0
        },
        secondStep: {
            included: ['phone Support', 'paywall', 'Ads', 'API', 'Multi-user access', 'AES for VOD', 'Player SDK'],
            custom:{
                'paywall': {checked: false, price:75},
                'playerSDK': {checked: false, price:150}
            },
            total: 0
        },
        paymentFrequency: 'Annually',
        termsAndConditions: false

    }, eventPlan: {
        action: 'purchase',
        name: 'event',
        firstStep: {
            included: {
                defaultBanwidth: 5000,
                defaultStorage: 20,
                defaultTranscoding: 20,
                price: 750
            },
            custom: {
                'Data': [
                    {amount: 1000, price: 120, currentAmount: true},
                    {amount: 2000, price: 240, currentAmount: false},
                    {amount: 5000, price: 400, currentAmount: false},
                    {amount: 15000, price: 1200, currentAmount: false}
                ],
                'Storage': [
                    {amount: 100, price: 180, currentAmount: true},
                    {amount: 400, price: 576, currentAmount: false}, 
                    {amount: 900, price: 972, currentAmount: false}
                ],
                'Encoding': [
                    {amount: 100, price: 150, currentAmount: true}, 
                    {amount: 400, price: 480, currentAmount: false}, 
                    {amount: 900, price: 900, currentAmount: false}
                ]
            },
            total: 450
        },
        secondStep: {
            included: ['paywall', 'Ads', 'API', 'Multi-user access', 'Player SDK'],
            custom:{
                'Phone Support': {checked: false, price:180},
                "AES for VOD": {checked: false, price:300},
                'Cname setup': {checked: false, price:1000},
                'China': {checked: false, price:200},
                'Reseller portal':{checked: false, price:1200}
            },
            total: 0
        },
        paymentFrequency: 'Annually',
        termsAndConditions: false

    },scalePlan: {
        action: 'purchase',
        name: 'scale',
        firstStep: {
            included: {
                defaultBanwidth: 2000,
                defaultStorage: 1000,
                defaultTranscoding: 1000,
                price: 250
            },
            custom: {
                'Data': [
                    {amount: 1000, price: 82.5, currentAmount: true},
                    {amount: 2000, price: 165, currentAmount: false},
                    {amount: 3000, price: 225, currentAmount: false},
                ],
                'Storage': [
                    {amount: 500, price: 45, currentAmount: true},
                    {amount: 1000, price: 90, currentAmount: false}, 
                    {amount: 4000, price: 320, currentAmount: false}
                ],
                'Encoding': [
                    {amount: 500, price: 50, currentAmount: true}, 
                    {amount: 1000, price: 100, currentAmount:false}, 
                    {amount: 4000, price: 400, currentAmount: false}
                ]
            },
            total: 177.5
        },
        secondStep: {
            included: ['Phone Support', 'paywall', 'Ads', 'API', 'Multi-user access', 'Player SDK'],
            custom:{
                "AES for VOD": {checked: false, price:15},
                'Cname setup': {checked: false, price:75},
                'China': {checked: false, price:100},
                'Reseller portal': {checked: false, price:100}
            },
            total: 0
        },
        paymentFrequency: 'Annually',
        termsAndConditions: false

    }
}
const Plans = () => {
    const [value, setValue] = React.useState(null);
    React.useEffect(() => {
        setValue(data)
    }, [])

    return (
        value ? 
            <PlansPage plans={value}/>
            : 
            <LoadingSpinner size='large' color='dark-violet' />
    )
}

export default Plans;