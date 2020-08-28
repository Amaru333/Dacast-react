import { create } from '@storybook/theming';
import logo from '../public/assets/logo.png';

export const theme = create({
    base: 'light',
    brandImage: logo,
});