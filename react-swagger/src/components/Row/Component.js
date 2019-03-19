import React, {Fragment} from 'react'
import styled from 'styled-components'
import { fontColor } from 'global'
import { PropTypes } from 'prop-types'

const borderStyle = `2px solid ${fontColor}`

const Div = styled.div`
  display: flex;
  flex-flow: row;
  flex: 1 1 auto;
  justify-content: space-around;
  align-self: stretch;
  margin: 1rem;
  border: ${borderStyle};
`;

function Row(props){
    return (
      <Div>
        {props.children.map((child, index)=>
          <Fragment key={Date.now()+index}>
            {child}
            {
              index!==props.children.length-1 
              && <div style={{borderRight: borderStyle}}/>
            }
          </Fragment>
        )}
      </Div>
    )
}

Row.propTypes = {
  children: PropTypes.array
}

Row.defaultProps = {
  children: []
}

export default Row