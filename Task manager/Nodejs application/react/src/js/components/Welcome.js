import React from "react"

import * as styles from "./styles"
import { text1, text4 } from "./styles";

const statesEnum = {
  hidden: {
    text: "What's going on?",
    value: false
  },
  shown: {
    text: "Hide help",
    value: true
  } 
}

export default class Welcome extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = statesEnum.hidden;
    this.changeState = this.changeState.bind(this);
  }
  changeState(){
    this.state = this.state.value ? statesEnum.hidden : statesEnum.shown;
    this.setState(this.state);
  }
  render() {
    return <div style={styles.flexColumn}> 
      <div style={styles.text1}>
        Hi{this.props.name?" "+this.props.name:""}!
      </div>
      <div style={styles.text4}>
        What's up on your boards?
      </div>
      <div>
        <div style={{display: "flex", alignItems: 'center', justifyContent:'center'}}>
          <div class={"elementButton"} style={styles.text8} onClick={()=>this.changeState()}>
            {this.state.text}
          </div>
        </div>
        {
          this.state.value &&
            <div style={{...styles.flexColumn, ...styles.text9}}>
              <div style={styles.flexRow}>
                <div style={{flexBasis:"45%"}}>
                  <div>← Here</div>
                  <div>are your boards</div>
                  <div>click on board to enter</div>
                  <div>click on + to create new</div>
                  <div>click on 🚪 to leave</div>
                  <div>click on ✗ to delete</div>
                </div>
                <div style={{flexBasis:"10%"}}/>
                <div style={{flexBasis:"45%"}}>
                  <div>Here →</div>
                  <div>will be board members →</div>
                  <div>the user with 👑 is an owner</div>
                  <div>click on + to invite somebody</div>
                  <div>click on ✗ to kick somebody out</div>
                </div>
              </div>
              <div style={{flexBasis:"75%"}}>
                <div>Here ↓</div>
                <div>will be board tasks</div>
                <div>click on task to show details</div>
                <div>click on +➤ to add new "In progress" status</div>
                <div>click on +⛔ to add new "Blocked"	status</div>
                <div>click on +✔ to add new "Finished" status</div>
                <div>click on +♺ to add new "Resumed" status</div>
              </div>
            </div>
        }
      </div>
    </div>
  }
}