import React from "react"
import {Link} from "react-router-dom"

export class Generic extends React.Component {
  constructor(props){
    super(props)
    this.state = props.state || {};
  }
  render() {
    let {onClick, onMouseEnter, onMouseLeave} = this.props;
    let child = this.state.child
    let style = this.state.style
    return <div 
    style={style} 
    onClick={onClick && onClick.bind(this)}
    onMouseEnter={onMouseEnter && onMouseEnter.bind(this)} 
    onMouseLeave={onMouseLeave && onMouseLeave.bind(this)}>
        {this.state.child}
    </div>
  }
}

export function GenericLinkButton(child, link, style, onClick=undefined){
  return <Generic {...{
    state: {
      child: <Link class={"elementButton"} onClick={()=>onClick&&onClick()} style={{'display': 'block'}} to={link}>{child}</Link>
    },
    style
  }}/>
}

export function GenericButton(child, style, onClick){
  return <Generic {...{
    state: {
      child: <div class={"elementButton"} style={{'display': 'block'}} >{child}</div>
    },
    style,
    onClick: onClick,
  }}/>
}

/*
usage:
render() {
    let init = {
      state: {child: [
        <h1 key={1}><Generic  state={{child: "morele1"}}/></h1>,
        <h1 key={2}><Generic  state={{child:"morele2"}}/></h1>,
        <h1 key={3}><Generic  state={{child: "morele3"}}/></h1>,
      ]},
      onClick: function(e){
        this.setState({child: <h1><Generic state={{child: "morele"}}/></h1>})
      }
    }
    return <div style={styles.background}>
      <Generic { ...init }/>
    </div>
  }
  */