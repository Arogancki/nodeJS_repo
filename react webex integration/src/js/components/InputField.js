import React from "react"

export default class InputField extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      onSubmit: props.onSubmit.bind(this),
      value: props.value || ""
    }
  }
  render(){
    const labelText = this.props.label || ''
    const submit = this.props.submit || 'OK'
    const placeholder = this.props.placeholder || ''
    const value = this.state.value || this.props.value || ''
    return <div>
      <label>
        {labelText}
        <input type="text" value={value} placeholder={placeholder} name={labelText} onChange={evt => this.setState({...this.state, value: evt.target.value})} />
      </label>
      <button type="button" onClick={ e => this.state.value && this.state.onSubmit(this.state.value)}>
        {submit}
      </button>
    </div>
  }
}