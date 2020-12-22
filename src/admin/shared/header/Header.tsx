import React from 'react'
import { IconStyle } from '../../../shared/Common/Icon'
import { LogoutAction, Action } from '../../redux-flow/store/Register/Login'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AdminState } from '../../redux-flow/store'
import { Link, useHistory } from 'react-router-dom'
import { Input } from '../../../components/FormsComponents/Input/Input'
import { Button } from '../../../components/FormsComponents/Button/Button'
import { capitalizeFirstLetter } from '../../../utils/utils'
import { AdminRoutes } from '../../constants/AdminRoutes'
import { Text } from '../../../components/Typography/Text'
import { HeaderStyle, VerticalDivider } from '../../../components/Header/HeaderStyle'
import Burger from '../Navigation/Burger'
import { dacastSdk } from '../../utils/services/axios/adminAxiosClient'
import { formatPostImpersonateInput } from '../../utils/utils'

interface AdminHeaderProps {
    isOpen: boolean;
    isMobile: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;    
    logout: () => void  
}
const Header = (props: AdminHeaderProps) => {

    let history = useHistory()
    const [userIdentifier, setUserIdentifier] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [breadcrumbItems, setBreadcrumbItems] = React.useState<string[]>([])

    React.useEffect(() => {
        let pathArray = window.location.pathname.split('/')
         setBreadcrumbItems(pathArray.filter(p => p).map(p => capitalizeFirstLetter(p)))
    }, [window.location])

    const handleImpersonate = () => {
        setIsLoading(true)
        dacastSdk.postImpersonateAccount(formatPostImpersonateInput(userIdentifier))
        .then((response) => {
            setIsLoading(false)
            Object.assign(document.createElement('a'), { target: '_blank', href: `${process.env.APP_DOMAIN}/impersonate?token=${response.token}&identifier=${userIdentifier}`}).click()
        })
        .catch(() => setIsLoading(false))
    }

    const renderHeaderBreadcrumb = () => {
        return breadcrumbItems.map((item, index) => {
            if(index !== breadcrumbItems.length - 1) {
                return (
                    <Text className='navigation' key={item + index} size={14}>
                        {AdminRoutes.some(route => route.name === item) ?
                            <Link to={'/' + item.toLowerCase()}><Text size={14} color='dark-violet' className='navigation'>{item}</Text></Link>
                            : <Text size={14}>{item}</Text> 
                        }
                        &nbsp;/&nbsp;
                    </Text>
                )
            }

            if(index !== 1) {
                return <Text key={item + index} size={14}>{item}</Text>
            }
        })
    }
    
    return (
        <HeaderStyle userType='admin'>
            {props.isMobile && <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} />}

            <div className="mr-auto flex ml2 sm-show">
                {renderHeaderBreadcrumb()}
            </div>
                <div className='flex mx2 items-end'>
                    <Input type='text' id='impersonateInput' placeholder='Impersonate...' value={userIdentifier} onChange={(event) => setUserIdentifier(event.currentTarget.value)} />
                    <div className='ml2'>
                        <Button isLoading={isLoading} onClick={() => handleImpersonate()} sizeButton='large' typeButton='primary' buttonColor='blue'>Impersonate</Button>
                    </div>
                </div>
            <VerticalDivider blackBorder />
            <div className='pointer mr2'>
                <IconStyle onClick={() => {props.logout();history.push('/login')}}>exit_to_app_outlined</IconStyle>
            </div>
        </HeaderStyle>
    )
}

export function mapDispatchToProps(dispatch: ThunkDispatch<AdminState, void, Action>) {

    return {
        logout: () => {
            dispatch(LogoutAction());
        }
    }
}

export default connect(null, mapDispatchToProps)(Header)