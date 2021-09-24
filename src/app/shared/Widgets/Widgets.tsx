import React from 'react';
import { Button } from '../../../components/FormsComponents/Button/Button';
import { Text } from '../../../components/Typography/Text';
import { useHistory } from 'react-router';
import { userToken } from '../../utils/services/token/tokenService';
import { useTranslation } from 'react-i18next';

export const handleButtonToPurchase = (percentage: number, purchaseItem: string, planPage?: boolean, callback?: () => void) => {

    let history = useHistory()
    const { t } = useTranslation()

    if(percentage <= 25 ) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor="lightBlue" sizeButton="xs" onClick={() => history.push("/account/upgrade")}>Upgrade</Button></Text>
        )
    }
    if(userToken.getPrivilege('privilege-billing')) {
        return (
            <Text className="ml-auto" size={12} weight="med" color="dark-violet"> <Button buttonColor={percentage <= 25 ? "red" : "lightBlue"} sizeButton="xs" onClick={() => planPage ? callback() : history.push("/account/plan#purchase-data")}>{t('account_plan_buy_more_button')}</Button></Text>
        )
    }

    return null
}
