import React from 'react';
import { Text } from '../../../components/Typography/Text';
import { IconStyle } from "../../../shared/Common/Icon";

export const PlanDetailsCard = () => {
    return (
        <div className="p2 pb3">
            <Text size={16} weight="med" className="block mb2">Your Free Trial Includes:</Text>
            <div className="mb1 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>10 GB of Data</Text>
            </div>
            <div className="mb1 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>2 GB of Storage</Text>
            </div>
            <div className="mb1 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>1 Live Stream Channel</Text>
            </div>
            <div className="mb25 flex">
                <IconStyle className="mr2" fontSize="default" coloricon="green">check</IconStyle>
                <Text size={16}>100 Playbacks per Day</Text>
            </div>
            <Text size={16} className="block">Any questions regarding your trial features? Our team will be more than happy to assist you. <a href='/help'>Contact Us</a> now.</Text>
        </div>
    )
}
