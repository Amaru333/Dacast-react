import React from 'react'
import { ModalCard, ModalContent } from '../../../components/Modal/ModalCard'
import { ImageStyle, LoginContainer } from '../../shared/Register/RegisterStyle'
import { Text } from '../../../components/Typography/Text'
import { ActionIcon, IconStyle } from '../../../shared/Common/Icon'
import { connect } from 'react-redux'
import { LoginInfos, MultiUserSelectionInfo, TokenInfos } from '../../redux-flow/store/Register/Login/types'
import { ThunkDispatch } from 'redux-thunk'
import { ApplicationState } from '../../redux-flow/store'
import { Action, loginAction } from '../../redux-flow/store/Register/Login'
import styled from 'styled-components'
import { useQuery } from '../../../utils/utils'
import { userToken } from '../../utils/services/token/tokenService'
import { segmentService } from '../../utils/services/segment/segmentService'
import { isProduction } from '../../utils/services/player/stage'
import { dacastSdk } from '../../utils/services/axios/axiosClient'

const logo = require('../../../../public/assets/logo.png');

interface AccountSelectionComponentProps {
    accountData: TokenInfos
    login: (data: LoginInfos) => Promise<void>;
}

const AccountSelection = (props: AccountSelectionComponentProps) => {

    const query = useQuery()
    const signupPageUrl = isProduction() ? 'https://dacast.com/signup' : 'https://test.dacast.com/signup'
    const availableUsers: MultiUserSelectionInfo[] = Object.fromEntries(new URLSearchParams(location.search)).availableUsers ? JSON.parse(Object.fromEntries(new URLSearchParams(location.search)).availableUsers) : props.accountData.availableUsers
    const loginToken = query.get('loginToken') ? JSON.parse(query.get('loginToken')) : props.accountData.loginToken

    React.useEffect(() => {
        if(props.accountData && props.accountData.token) {
            userToken.addTokenInfo(props.accountData);
            segmentService.identify({
                userId: userToken.getUserInfoItem('user-id'), 
                firstName: userToken.getUserInfoItem('custom:first_name'), 
                lastName: userToken.getUserInfoItem('custom:last_name'), 
                email: userToken.getUserInfoItem('email'),
                company: userToken.getUserInfoItem('custom:website')
            })
            dacastSdk.updateToken(userToken)
            location.href = '/'
        }
    }, [props.accountData])

    const handleUserSelection = (userId: string) => {
        props.login({selectedUserId: userId, loginToken: loginToken})
    }
    const renderAccountsList = () => {
        return availableUsers.map((account, i) => {
            return (
                <AccountSelectionRow style={{marginBottom: 0}} onClick={() => {handleUserSelection(account.userId)}} className='col col-12 flex items-center py2 pl2 pointer'>
                    <div className='col col-11 flex'>
                        <Text size={16} weight='med'>{account.companyName || account.companyWebsite}</Text>
                        {account.role && <Text size={16} weight='med' color='gray-3'>&nbsp;({account.role || 'Owner'})</Text>}
                    </div>
                    <div  className='flex justify-end col col-1'>
                        <ActionIcon id={"subfolderTooltip" + i}>
                            <IconStyle onClick={() => {handleUserSelection(account.userId)}} coloricon='gray-3'>keyboard_arrow_right</IconStyle>
                        </ActionIcon>
                    </div>
                </AccountSelectionRow>
            )
        })
    }

    return (
    <LoginContainer>
        <ImageStyle className="mx-auto" src={logo}/>
        <ModalCard className="mx-auto" size="small" title={props.accountData.availableUsers && props.accountData.availableUsers.length === 0 ? "This account does not exist" : "Choose Account"}>
            {
                props.accountData.availableUsers && props.accountData.availableUsers.length === 0 ?
                <ModalContent>
                    <div className="my1">
                        <Text size={14} weight="reg">The email address {query.get('email') || ''} is not associated with existing Dacast account.</Text>
                    </div>
                    <div className="my1">
                        <Text size={14} weight="reg">In order to create an account, please <a href={signupPageUrl}>Sign up</a></Text>
                    </div>
                </ModalContent>
                : 
                <ModalContent>
                    <div className="my1">
                        <Text size={14} weight="reg">You have multiple accounts associated with email</Text>
                    </div>
                    <div className="my1">
                        <Text size={14} weight="reg">{query.get('email') || ''}. Select account to log in.</Text>
                    </div>
                    {renderAccountsList()}
                </ModalContent>
            }
        </ModalCard>
    </LoginContainer>
    )
}

export function mapStateToProps( state: ApplicationState) {
    return {
        accountData: state.register.login
    };
}


export function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, Action>) {
    return {
        login: async (data: LoginInfos) => {
            await dispatch(loginAction(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSelection); 

const AccountSelectionRow = styled.div<{}>`
    border: 1px solid ${props => props.theme.colors['gray-8']};
    &: hover {
        background-color: ${props => props.theme.colors['violet10']};
    }
`