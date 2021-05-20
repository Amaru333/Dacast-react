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
import { formatPostImpersonateInput, formatPostImpersonateOutput } from '../../utils/utils'
import { Modal } from '../../../components/Modal/Modal'
import { ImpersonateAccountSelectionModal } from '../modal/ImpersonateAccountSelectionModal'
import { PostImpersonateAccountOutput } from '../../../DacastSdk/admin'
import { isMultiUserToken } from '../../../DacastSdk/session'

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
    const [impersonateBody, setImpersonateBody] = React.useState<PostImpersonateAccountOutput>(null)
    const [impersonateAccountSelectionModalOpened, setImpersonateAccountSelectionModalOpened] = React.useState<boolean>(false)

    React.useEffect(() => {
        let pathArray = window.location.pathname.split('/')
         setBreadcrumbItems(pathArray.filter(p => p).map(p => capitalizeFirstLetter(p)))
    }, [window.location])

    React.useEffect(() => {
        if(!impersonateAccountSelectionModalOpened) {
            setImpersonateBody(null)
        }
    }, [impersonateAccountSelectionModalOpened])

    const handleImpersonate = () => {
        setIsLoading(true)
        dacastSdk.postImpersonateAccount(formatPostImpersonateInput(userIdentifier))
        .then((response) => {
            setIsLoading(false)
            if(isMultiUserToken(response)) {
                setImpersonateBody(response)
                setImpersonateAccountSelectionModalOpened(true)
            } else {
                formatPostImpersonateOutput(response, userIdentifier)
            }
        })
        .catch(() => setIsLoading(false))
    }

    const renderHeaderBreadcrumb = () => {
        return breadcrumbItems.map((item, index) => {
            if(index !== breadcrumbItems.length - 1) {
                return (
                    <Text weight="med" className='navigation' key={item + index} size={14}>
                        {AdminRoutes.some(route => route.name === item) ?
                            <Link to={'/' + item.toLowerCase()}><Text weight="med" size={14} color='dark-violet' className='navigation'>{item}</Text></Link>
                            : <Text weight="med" size={14}>{item}</Text> 
                        }
                        &nbsp;/&nbsp;
                    </Text>
                )
            }

            if(index !== 1) {
                return <Text weight="med" key={item + index} size={14}>{item}</Text>
            }
        })
    }
    
    return (
        <HeaderStyle userType='admin'>
            {props.isMobile && <Burger isOpen={props.isOpen} onClick={() => props.setOpen(!props.isOpen)} />}

            <div className="mr-auto flex ml25 sm-show">
                {renderHeaderBreadcrumb()}
            </div>
                <div className='flex mx2 items-end'>
                    <Input 
                        type='text' 
                        id='impersonateInput'
                        backgroundColor="white" 
                        placeholder='Impersonate...' 
                        value={userIdentifier} 
                        onChange={(event) => setUserIdentifier(event.currentTarget.value)} 
                        onKeyDown={(event) => {if(event.key === 'Enter' || event.key === 'NumpadEnter') {handleImpersonate()}}}
                    />
                    <div className='ml2'>
                        <Button isLoading={isLoading} onClick={() => handleImpersonate()} sizeButton='large' typeButton='primary' buttonColor='blue'>Impersonate</Button>
                    </div>
                </div>
            <VerticalDivider blackBorder />
            <div className='pointer mr2'>
                <IconStyle onClick={() => {props.logout();history.push('/login')}}>exit_to_app_outlined</IconStyle>
            </div>
            {
                impersonateAccountSelectionModalOpened && 
                    <ImpersonateAccountSelectionModal availableUsers={impersonateBody.availableUsers ? impersonateBody.availableUsers : []} loginToken={impersonateBody.loginToken ? impersonateBody.loginToken : null} opened={impersonateAccountSelectionModalOpened} toggle={setImpersonateAccountSelectionModalOpened} />
            }
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