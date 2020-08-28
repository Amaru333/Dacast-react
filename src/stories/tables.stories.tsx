import React from 'react';
import { storiesOf } from '@storybook/react'
import { Table } from '../components/Table/Table';
import { InputCheckbox } from '../components/FormsComponents/Input/InputCheckbox';
import { Label } from '../components/FormsComponents/Label/Label';
import { Text } from '../components/Typography/Text';
import { ColorsApp } from "../styled/types";
import { Weight } from '../components/Typography/TextTypes';



const InputCheckboxComponent = (id: string) => {
    return <InputCheckbox disabled={false} id={id} />
}

const LabelComponent = (props:{label: string, backgroundColor: ColorsApp, color: ColorsApp}) => {
    return <Label size={14} weight='reg' label={props.label} backgroundColor={props.backgroundColor} color={props.color}/>
}

const TextComponent = (props:{textstring: string, weight: Weight}) => {
    return <Text size={14} weight={props.weight} color='black'>{props.textstring}</Text>
}

const tableHeader = {data: [
    {cell: InputCheckboxComponent('checkbox0')},
    {cell: TextComponent({textstring:'ID', weight:'med'})},
    {cell: TextComponent({textstring:'Number', weight:'med'})},
    {cell: TextComponent({textstring:'Name', weight:'med'})},
    {cell: TextComponent({textstring:'Email', weight:'med'})},
    {cell: TextComponent({textstring:'Phone', weight:'med'})},
    {cell: TextComponent({textstring:'Status', weight:'med'})},

]};

const tableBody = [
    {data: [
        InputCheckboxComponent('checkbox1'),
        TextComponent({textstring:'1', weight:'reg'}),
        TextComponent({textstring: '119.40.168.189', weight:'reg'}),
        TextComponent({textstring:'Waldemar Cloris', weight:'reg'}),
        TextComponent({textstring:'wpetruszka0@dailymotion.com', weight:'reg'}),
        TextComponent({textstring: '720-466-3189', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'red20', color:'red'}),

    ]},
    {data: [
        InputCheckboxComponent('checkbox2'),
        TextComponent({textstring:'2', weight:'reg'}),
        TextComponent({textstring:'30.120.159.193', weight:'reg'}),
        TextComponent({textstring:'Caleb Reuven', weight:'reg'}),
        TextComponent({textstring:'ckachel1@tamu.edu', weight:'reg'}),
        TextComponent({textstring:'731-880-3565', weight:'reg'}),
        LabelComponent({label:'green', backgroundColor:'green20', color:'green'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox3'),
        TextComponent({textstring:'3', weight:'reg'}),
        TextComponent({textstring:'231.242.159.44', weight:'reg'}),
        TextComponent({textstring:'Mathias Emiline', weight:'reg'}),
        TextComponent({textstring:'cfarfalameev2@free.fr', weight:'reg'}),
        TextComponent({textstring:'832-864-4610', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'gray-8', color:'gray-1'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox4'),
        TextComponent({textstring:'4', weight:'reg'}),
        TextComponent({textstring:'120.49.231.223', weight:'reg'}),
        TextComponent({textstring:'Brnaba Orella', weight:'reg'}),
        TextComponent({textstring:'rreckus3@cpanel.net', weight:'reg'}),
        TextComponent({textstring:'436-994-4461', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'green20', color:'green'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox5'),
        TextComponent({textstring:'5', weight:'reg'}),
        TextComponent({textstring:'87.48.120.140', weight:'reg'}),
        TextComponent({textstring:'Raychel Linette', weight:'reg'}),
        TextComponent({textstring:'mbeeken4@booking.com', weight:'reg'}),
        TextComponent({textstring:'446-430-5684', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'green20', color:'green'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox6'),
        TextComponent({textstring:'6', weight:'reg'}),
        TextComponent({textstring:'114.14.199.7', weight:'reg'}),
        TextComponent({textstring:'Lin Jewell', weight:'reg'}),
        TextComponent({textstring:'eskip5@istockphoto.com', weight:'reg'}),
        TextComponent({textstring:'537-511-4801', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'red20', color:'red'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox7'),
        TextComponent({textstring:'7', weight:'reg'}),
        TextComponent({textstring:'248.67.93.78', weight:'reg'}),
        TextComponent({textstring:'Eben Marmaduke', weight:'reg'}),
        TextComponent({textstring:'blusty6@dot.gov', weight:'reg'}),
        TextComponent({textstring:'306-898-1380', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'red20', color:'red'}),
    ]},
    {data: [
        InputCheckboxComponent('checkbox8'),
        TextComponent({textstring:'8', weight:'reg'}),
        TextComponent({textstring:'123.141.59.25', weight:'reg'}),
        TextComponent({textstring:'Linnie Linda', weight:'reg'}),
        TextComponent({textstring:'obatrick7@newyorker.com', weight:'reg'}),
        TextComponent({textstring:'940-964-2752', weight:'reg'}),
        LabelComponent({label:'label', backgroundColor:'green20', color:'green'}),
    ]},
]

storiesOf('Tables', module)
    .add('Tables', () => ( 
        <React.Fragment>
            <Table header={tableHeader} headerBackgroundColor="gray-10" body={tableBody} id="table1" />
        </React.Fragment>
    ))