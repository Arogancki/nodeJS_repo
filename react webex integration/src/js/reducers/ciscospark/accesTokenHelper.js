import Cookies from 'universal-cookie'

import statuses from "../../lib/statuses"
import actionFactory from "../../actions/actionFactory"
import types from "../../actions/types"
import { connect } from "./helper"

const cookies = new Cookies();
const REGISTER_STATUS_CHANGED = actionFactory(types.REGISTRATION_STATUS_CHANGED)

export default function accesTokenHelper(action, state){
    if (action.payload === ''){
        state.callStatus.hangup && state.callStatus.hangup()
        state.spark && state.spark.phone.deregister()
        cookies.remove('accesToken')
        action.asyncDispatch(REGISTER_STATUS_CHANGED(statuses.READY))
        return {
            ...state, 
            spark : null,
            accessToken: null
        }
    }
    //cookies.set('accesToken', action.payload, { path: '/' })
    const spark = state.ciscospark.init({
        config: {
            phone: {
                enableExperimentalGroupCallingSupport: true,
                hangupIfLastActive: {
                    call: true,
                    meeting: true
                }
            }
        },
        credentials: {
            access_token: action.payload
        }
    })
    //spark.config.logger.level = `debug`;
    connect(spark, action).catch(()=>{})
    return {
        ...state, 
        spark,
        accessToken: action.payload
    }
}