import React from 'react'
import { backgroundColor, fontColor } from 'global'
import ReactJson from 'react-json-view'
import { PropTypes } from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

const ReactJsonStyle = {
    backgroundColor: backgroundColor,
    padding: "1rem"
}

function JsonContainer(props){
  return (
    <Scrollbars style={{...props.style}}
      renderThumbVertical={(props) => <div {...props} style={{backgroundColor: fontColor}}/>}
    >
      <ReactJson 
        theme='isotope'
        iconStyle="square"
        edit={true}
        add={true}
        delete={true}
        onEdit={(e)=>props.onChange(e.updated_src)}
        onAdd={(e)=>props.onChange(e.updated_src)}
        onDelete={(e)=>props.onChange(e.updated_src)}
        {...props} style={{...ReactJsonStyle, ...props.style}}
      />
    </Scrollbars>
  )
}

JsonContainer.propTypes = {
  onChange: PropTypes.func
}

JsonContainer.defaultProps = {
  onChange: ()=>{}
}

export default JsonContainer