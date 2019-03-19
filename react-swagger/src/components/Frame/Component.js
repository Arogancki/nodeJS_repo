import React from 'react'
import styled from 'styled-components'
import { fontColor } from 'global'

const FrameWrapper = styled.div`
    margin: 2% 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    flex: 1 1 auto;
    position: relative;
    min-height: 44px;
    min-width: 44px;
`

const borderLine=`2px solid ${fontColor}`

const borderCommon = `
    width: 40px;
    height: 40px;
    position: absolute;
`

const LeftTop = styled.div`
    ${borderCommon}
    top: 0;
    left: 0;
    border-left: ${borderLine};
    border-top: ${borderLine};
`

const LeftBottom = styled.div`
    ${borderCommon}
    bottom: 0;
    left: 0;
    border-left: ${borderLine};
    border-bottom: ${borderLine};
`

const RightTop = styled.div`
    ${borderCommon}
    top: 0;
    right: 0;
    border-right: ${borderLine};
    border-top: ${borderLine};
`

const RightBottom = styled.div`
    ${borderCommon}
    bottom: 0;
    right: 0;
    border-right: ${borderLine};
    border-bottom: ${borderLine};
`

function Frame(props){
    return (
        <FrameWrapper>
            <LeftTop/>
            <LeftBottom/>
            <RightTop/>
            <RightBottom/>
            {props.children}
        </FrameWrapper>
  )
}

export default Frame