import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { backgroundColor, fontColor, fontFamily }  from 'global'
import { Button } from '@material-ui/core'
import Modal from 'react-modal'

const style = {
    content: {
        backgroundColor: backgroundColor,
        color: fontColor,
        fontFamily: fontFamily,
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
        }
}

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function CenteredModal(props){
    return (
        <Modal
            style= {style}
            ariaHideApp={false}
            isOpen={props.isOpen}
            {...props}
        >
        <Div>
            <p>{props.content}</p>
            <Button variant="contained" component="span" onClick={props.onRequestClose}>
                Close
            </Button>
        </Div>
        </Modal>
    )
}

CenteredModal.propTypes = {
    content: PropTypes.string,
    onRequestClose: PropTypes.func,
    isOpen: PropTypes.bool.isRequired
}

CenteredModal.defaultProps = {
    content: '',
    onRequestClose: ()=>{}
}

export default CenteredModal