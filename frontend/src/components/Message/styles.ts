import styled, { css } from 'styled-components'

type Props = {
    isFromCurrentUser: boolean
}

export const Container = styled.div<Props>`
    width: 100%;
    display: flex;
    margin-bottom: 5px;
    ${({ isFromCurrentUser}) => css`
        ${ !isFromCurrentUser ? 
            'justify-content: end;' 
            : 
            'justify-content: start;'
        }
    `}
`

export const Message = styled.div<Props>`
    max-width: 300px;
    padding: 20px;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    ${({ isFromCurrentUser}) => css`
        ${ isFromCurrentUser ? 
            'background: linear-gradient(90deg, rgba(3,150,255,1) 43%, rgba(86,176,238,1) 100%);' 
            : 
            'background: linear-gradient(270deg, rgba(240,78,217,1) 43%, rgba(235,129,240,1) 89%);'
        }
        ${ isFromCurrentUser ? 
            'border-radius: 10px 10px 10px 0px;' 
            : 
            'border-radius: 10px 10px 0px 10px;'
        }
        
    `}

    div {
        width: 100%;
        text-align: end;
        margin-top: 2px;
        font-weight: 400;
    }

    span {
        width: 100%;
        font-size: 12px;
    }
`