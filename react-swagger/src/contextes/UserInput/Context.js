import React, {useState, useEffect} from 'react'
import { Spectral } from '@stoplight/spectral'
import { oas2Functions, oas2Rules } from '@stoplight/spectral/rulesets/oas2'
import createValidationTree from 'helpers/createValidationTree'

const UserInputContext = React.createContext()

const UserInputConsumer = UserInputContext.Consumer

function UserInputProvider(props){
    const [state, setState] = useState({
        json: null,
        loading: false,
        promise: null,
        error: null,
        validation: null
    })

    const spectral = new Spectral()
    spectral.addFunctions(oas2Functions())
    spectral.addRules(oas2Rules())
    const validate = json => createValidationTree(spectral.run(json).results)

    useEffect(()=>{
        state.loading && Promise.resolve(state.promise)
        .then(data=>typeof data === typeof {}
            ? data
            : JSON.parse(data)
        )
        .then(json=>setState({
            json, 
            promise: null,
            loading: false,
            validation: validate(json)
        }))
        .catch(error=>setState({
            error: error.message,
            json: null, 
            promise: null,
            loading: false,
            validation: null
        }))
    })

    const value = {
        setJson: data=>setState({
            promise: data,
            loading: true
        }),
        clearError: ()=>setState({
            error: null
        }),
        clearJson: ()=>setState({
            json: null, 
            promise: null,
            loading: false,
            validation: null
        }),
        ...state
    }

    return (
        <UserInputContext.Provider value={value}>
            {props.children}
        </UserInputContext.Provider>   
    )
}

export {UserInputProvider, UserInputConsumer}