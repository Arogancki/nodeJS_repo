import React, { Fragment } from 'react'
import styled from 'styled-components'
import JSONTree from 'react-json-tree'
import PropTypes from 'prop-types'
import { backgroundColor, fontColor } from 'global'
import { Scrollbars } from 'react-custom-scrollbars'
import merge from 'helpers/merge'

const Div = styled.div`
    display: flex;
    flex-direction: column;
`

const Dot = styled.span`
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
    position: absolute;
    right: 0;
    top: 1rem;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 1rem;
    color: black;
`

const ErrorDot = styled(Dot)`
    background-color: red;
`

const WarnDot = styled(Dot)`
    background-color: yellow;
`

const WarnDotMoved = styled(WarnDot)`
    right: 1.2rem;
`

//quick and dirty solution
function getSimplestFreeKey(object, key){
    return object.hasOwnProperty(key)
    ? getSimplestFreeKey(object, `_${key}`)
    : key
}

function createSimpleTree(validation, json){
    return Object.keys(validation).reduce((simpleTree, key)=>{
        const val = validation[key]
        if (val.children){
            simpleTree[key] = {...createSimpleTree(val.children)}
        } else {
            simpleTree[key] = {}
        }
        if (val.error){
            simpleTree[key][getSimplestFreeKey(simpleTree[key], 'error')] = val.error 
        }
        if (val.warn){
            simpleTree[key][getSimplestFreeKey(simpleTree[key], 'warn')] = val.warn 
        }
        return simpleTree
    }, {})
}

function getObjectValue(obj, path){
    if (path.length===0){
        return obj
    }
    if (path.length===1){
        return obj[path[0]]
    }
    const nextObject = obj[path[path.length-1]]
    if (!nextObject){
        return null
    }
    if (nextObject.children){
        return getObjectValue(nextObject.children, path.slice(0, path.length-1))
    }
    return nextObject[path[0]]
}

function Validation(props){
    return (
        <Div style={props.style}>
            {props.header}
            <Scrollbars 
                renderThumbVertical={(props) => <div {...props} style={{backgroundColor: fontColor}}/>}
            >
                <JSONTree
                    getItemString={()=>{}}
                    labelRenderer={(path, type) => {
                        const data = getObjectValue(props.validation, path.slice(0, path.length-1))
                        if (!data){
                            return path[0]
                        }
                        return <Fragment>
                            {path[0]}
                            {
                                data && (
                                    data.errors && data.warns
                                    ? <Fragment>
                                        <WarnDotMoved>{data.warns}</WarnDotMoved>
                                        <ErrorDot>{data.errors}</ErrorDot>
                                    </Fragment>
                                    : data.errors
                                    ? <ErrorDot>{data.errors}</ErrorDot>
                                    : data.warns && <WarnDot>{data.warns}</WarnDot>
                                )
                            }
                        </Fragment>
                    }}
                    valueRenderer={v=>{
                        return <span style={{wordBreak: 'break-word'}}>
                            <br/>{typeof v === typeof '' ? v.substr(1, v.length-2) : v}
                        </span>
                    }}
                    style={{flex: 1, margin: 0, backgroundColor: backgroundColor}} 
                    data={merge(props.json, props.validation) || createSimpleTree(props.validation, props.json)} 
                />
            </Scrollbars>
        </Div>
    )
}

Validation.propTypes = {
    validation: PropTypes.object
}

export default Validation;
