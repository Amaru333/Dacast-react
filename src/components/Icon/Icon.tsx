import * as React from 'react'
import styled from 'styled-components'

export type IconProps = React.HTMLAttributes<HTMLDivElement>

const iconPaths = (ctx => {
    let keys = ctx.keys()
    let values = keys.map(ctx)
    return keys.reduce((o, k, i) => { o[k.match(/^\.\/(.*?)\.svg$/)[1]] = values[i]; return o }, {})
})(require.context('../../../public/assets/icons', true, /\.svg$/))

export const Icon = (props: IconProps) => {
    const { children, ...other } = props
    return children && iconPaths[children]
        ? <IconStyle data-icon-name={children} {...other} dangerouslySetInnerHTML={{__html: `<use xlink:href="${iconPaths[children]}#icon"/>`}}></IconStyle>
        : null
}

const IconStyle = styled.svg`
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    overflow: hidden;
    flex-shrink: 0;
    user-select: none;
`
