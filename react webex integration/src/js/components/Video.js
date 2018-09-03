import React from "react"
import { MoonLoader, BounceLoader} from 'react-spinners'

export default class Dashboard extends React.Component {
    render(){
        return <div style={{position: "relative"}}>
            <div style={{left: '40%', top: '40%', margin: '0 auto', zIndex: '-1', position: "absolute"}}><BounceLoader color={"grey"}/></div>
            <video style={{zIndex: '1', maxHeight: '100%', maxWidth: '95%', padding: '2%'}} ref={e=>(e || {}).srcObject = this.props.srcObject} autoPlay/> 
        </div>
    }
}