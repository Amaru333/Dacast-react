import React from 'react';
import { ValidationOptions } from 'react-hook-form';
export interface ValueInput { [key: string]: { value: string | boolean } }
export interface ValidationsInputObject { [key: string]: { id: string; error: boolean; errorMessage: string } }


var requiredHelp = "Required";

export type CustomType = 'email' | 'tel' | 'url' | 'password';

const PresetFormValidation: { [key in CustomType]: ValidationOptions } = {
    'email': {
        required: requiredHelp,
        pattern: {
            value: /^\w+([.\-+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: 'Please enter a valid email address'
        } 
    },
    'tel': {
        required: requiredHelp,
        pattern: {
            value: /.*/,
            message: 'Please enter a valid phone number'
        } 
    },
    'url': {
        required: requiredHelp,
        pattern: {
            value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            message: 'Please enter a valid URL'
        } 
    },
    'password': {
        required: requiredHelp,
        minLength: {
            value: 6,
            message: 'Password must contain at least 6 characters'
        }   
    }
}

export const handleValidationForm = (id: string, data: any, type?: CustomType, register?: Function) => {
    if(id.indexOf('.') === -1) {
        let spreadProps: any =  {
            isError: data[id],
            help: data[id] && (data[id].message ? data[id].message : data[id].validate) ,
            name: id
        }
        if(type && register) {
            spreadProps = { ...spreadProps, ref: register(PresetFormValidation[type]) }
        }
        return spreadProps;
    } else {
        let deepness = id.split('.');
        let targetObject = false;
        for(var i = 0; i < deepness.length; i++) {
            targetObject = targetObject ? targetObject[deepness[i]] : data[deepness[i]]
        }
        let spreadProps: any =  {
            isError: targetObject,
            help: targetObject && (targetObject.message ? targetObject.message : targetObject.validate) ,
            name: id
        }
        if(type && register) {
            spreadProps = { ...spreadProps, ref: register(PresetFormValidation[type]) }
        }
        return spreadProps;
        
    }
    
}

//TODO: Delete all of this under that
export const handleValidationProps = (id: string, data: ValidationsInputObject) => {
    return {
        isError: data[id] ? data[id].error : false,
        help: data[id] ? data[id].errorMessage : ""
    }
}