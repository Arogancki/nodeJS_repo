import React from "react"

import * as styles from "./styles"

export default class Boards extends React.Component {
  constructor(props){
    super(props);
    this.props = props;
    this.activeBoard = this.activeBoard.bind(this);
    this.addBoard = this.addBoard.bind(this);
    this.leaveBoard = this.leaveBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.invitationHandler = this.invitationHandler.bind(this);
  }
  activeBoard(board){
    console.log("selected ")
  }
  addBoard(){
    console.log('add board ')
  }
  deleteBoard(board){
    console.log('remove board')
  }
  leaveBoard(board){
    console.log('leave board')
  }
  invitationHandler(invitation){
    console.log('inv ')
  }
  render() {
    return <div style={{width:"25%", alignItems: 'center', justifyContent:'center'}}>
      <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
        <div style={{width: "100%"}}>
          <span class="elementButton" onClick={()=>this.addBoard()} style={{...styles.text1, padding: "0% 2% 0% 2%"}}>
            {"+"}
          </span>          
          <span style={{...styles.text2}}>
            {" Boards "}
          </span>
          <span style={{...styles.text1, padding: "0% 2% 0% 2%"}}>
            {" "}
          </span>  
        </div>
      </div>
      {
        this.props.boards && this.props.boards.length ? this.props.boards.map((v,k)=>
          <div key={k} style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
              <span style={{...styles.text5, flexBasis:"10%"} }/>
              <span class="elementButton" onClick={()=>this.activeBoard(v)} style={{...styles.text5, flexBasis:"80%"}}>
                {` ${v.name}${!v.owned ? ` (${v.owner}'s)`:''} `}
              </span>
              <span class="elementButton" style={{...styles.text5, flexBasis:"10%"} }>
                {
                  v.owned ? 
                  <span onClick={()=>this.deleteBoard(v)}>
                    {" ✗ "}
                  </span>
                  :
                  <span onClick={()=>this.leaveBoard(v)}>
                    {" 🚪 "}
                  </span>
                }
              </span>  
          </div>) 
        : <div style={styles.text5}>You dont have any boards</div>
      }


      {
        this.props.invitations && this.props.invitations.length && 
        <div>
          <div style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
            <div style={{width: "100%"}}>
              <span style={{...styles.text2}}>
                {" ✉ Invitations "}
              </span>
            </div>
          </div>
          {
            this.props.invitations.map((v,k)=>
              <div key={k} style={{...styles.flexRow, padding: "1% 0% 1% 0%"}}>
              <div class="elementButton" onClick={()=>this.invitationHandler(v)} style={{width: "100%"}}>
                <span style={{...styles.text5}}>
                  {` ${v.owner}'s: ${v.board} `}
                </span>
              </div>
            </div>)
          }
        </div>
      }
    </div>
  }
}