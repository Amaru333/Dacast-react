import * as React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../components/Avatar/Avatar';
import { Input } from '../../components/FormsComponents/Input/Input';
import { Toggle } from '../../components/Toggle/toggle';
import { Text } from '../../components/Typography/Text';
import { Button } from '../../components/FormsComponents/Button/Button';
import { Card } from '../../components/Card/Card';
import { formSubmit, handleValidationProps, ValueInput } from '../../utils/hooksFormSubmit';
import { Modal, ModalContent, ModalFooter } from '../../components/Modal/Modal';

export const Profile = () => {

    let formRef = React.useRef<HTMLFormElement>(null);
    
    let {value, validations, enabledSubmit} = formSubmit(formRef);
    const [passwordModalToggle, setPasswordModalToggle] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, value: ValueInput) => {

    }

    React.useEffect(() => {console.log({...document.getElementById('Marketing')})}, )
    return (
        <div>
            <Card>
            <form onSubmit={(event) => handleSubmit(event, value)} ref={formRef} noValidate>
                        <TextStyle className="mx1 my2"><Text size={20} weight='med'>Details</Text></TextStyle>
                        <div className="md-col md-col-12">
                            <Input 
                                disabled={false} 
                                defaultValue={''}
                                type="text" 
                                className="md-col md-col-6 p1" 
                                id="firstName" 
                                label="First Name" 
                                placeholder="First Name" 
                                required
                                {...handleValidationProps('firstName', validations)}
                            />
                            <AvatarInputContainer className="md-col md-col-6 p1">
                            <Input 
                                disabled={false}
                                defaultValue={''} 
                                type="text" 
                                className="md-col md-col-10" 
                                id="lastName" 
                                label="Last Name" 
                                placeholder="Last Name" 
                                required
                                {...handleValidationProps('lastName', validations)} 
                            />
                            <Avatar className="md-col md-col-2 mx1"  size='large' name='JL' /> 
                            </AvatarInputContainer>

                        </div>
                        <div className="md-col md-col-12" >
                            <Input 
                                disabled={false} 
                                defaultValue={''}
                                type="tel" 
                                className="md-col md-col-6 p1" 
                                id="phoneNumber" 
                                label="Phone Number" 
                                placeholder="(00) 0000 0000 00" 
                                required
                                {...handleValidationProps('phoneNumber', validations)}
                            />
                            <Input 
                                disabled={false} 
                                defaultValue={''}
                                type="email" 
                                className="md-col md-col-6 p1" 
                                id="emailAddress" 
                                label="Email Address" 
                                placeholder="Email Address" 
                                required
                                {...handleValidationProps('emailAddress', validations)}
                            />
                        </div>                      
                            {/* <DropdownSingle hasSearch defaultValue={defaultCountryValue} className="sm-col sm-col-3 p1 my1" id='country' dropdownTitle='Country' list={getNames().reduce((reduced: DropdownListType, item: string)=> {return {...reduced, [item]: false}},{})} /> */}
                        <BorderStyle className="p1 mx1" />

                        <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Change Password</Text></TextStyle>

                        <p className="mx1"><Text size={12} weight='reg' color='gray-3'>Password last changed: some date</Text></p>

                        <p className="mx1"><Text size={14} weight='reg' color='gray-3'>For best security practices you should update your password every 6 months.</Text></p>

                        <Button className="mx1" sizeButton='xs' typeButton='secondary' buttonColor='blue'><Text size={12} weight='reg' color='dark-violet'>Change password</Text></Button>
                        
                        <Modal opened={passwordModalToggle} toggle={() => setPasswordModalToggle(!passwordModalToggle)} size="small" title="Change Password">
                            <ModalContent>
                                    <Input 
                                        disabled={false} 
                                        defaultValue={''}
                                        type="password" 
                                        className="col col-12 p1" 
                                        id="currentPassword" 
                                        label="Current Password" 
                                        placeholder="Current Password" 
                                        required
                                    />
                                    <Input 
                                        disabled={false} 
                                        defaultValue={''}
                                        type="password" 
                                        className="col col-12 p1" 
                                        id="newPassword" 
                                        label="New Password" 
                                        placeholder="New Password" 
                                        required
                                    />
                                    <Input 
                                        disabled={false} 
                                        defaultValue={''}
                                        type="password" 
                                        className="col col-12 p1" 
                                        id="confirmPassword" 
                                        label="Confirm Password" 
                                        placeholder="Confirm Password" 
                                        required
                                    />
                            </ModalContent>
                            <ModalFooter>
                                <Button sizeButton="large" typeButton="primary">Change Password</Button>
                                <Button sizeButton="large" onClick={() => setPasswordModalToggle(false)} typeButton="tertiary">Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        <BorderStyle className="p1 mx1"/>

                        <TextStyle className="px1 py2" ><Text size={20} weight='med' color='gray-1'>Email Notifications</Text></TextStyle>

                        <Toggle label='Marketing' />
                        <p className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>Turn off if you do not want to receive promotional marketing emails.</Text></p>
                        <Toggle id="Marketing" label='Low Data' />
                        <p className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>An email will be sent when the data is below a certain percentage or something.</Text></p>

                        <Toggle label='Upload' />
                        <p className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>An email will be sent when an upoload has been completed from anyone in your account.</Text></p>

                        <Toggle label='Weekly Analytics' />
                        <p className="mx3"><Text className="mx2" size={12} weight='reg' color='gray-3'>A weekly email will be sent to you to update you on analytics.</Text></p>


                    </form>

            </Card>
            <div>
                <Button disabled={!enabledSubmit} type='submit' className="my2" typeButton='primary' buttonColor='blue'>Save</Button>
                <Button type='button' onClick={() => {}} className="m2" typeButton='tertiary' buttonColor='blue'>Discard</Button>
            </div>
        </div>
    )
}

const TextStyle = styled.span<{}>`
    display: block;
`

const BorderStyle = styled.div<{}>`
    border-bottom: 1px solid ${props => props.theme.colors['gray-7']};
    display: flex;
`

const AvatarInputContainer = styled.div<{}>`
    display: flex;
    flex-direction: row;
    flex-flow: wrap-reverse;
`