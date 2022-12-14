import styled, { css } from 'styled-components'

export type Props = {
    isOnline: boolean
}

export const Container = styled.div<Props>`
    display: flex;
    align-items: center;
    position: relative;
    padding: 5px 10px;
    border-bottom: 1px solid ${({ theme }) => theme.borderColor.default};
    cursor: pointer;
    img {
        width: 50px;
        border-radius: 999px;
    }

    .online-dot {
        width: 13px;
        height: 13px;
        border-radius: 13px;
        background-color: #4FD100;
        position: absolute;
        top: 8px;
        left: 45px;

        ${({ isOnline }) => css`
            ${ isOnline ? '' : 'display: none;'}
        `}
    }

`

export const ConversationInfo = styled.div``