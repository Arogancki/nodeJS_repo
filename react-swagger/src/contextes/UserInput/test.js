import React, {Fragment} from 'react'
import { render, fireEvent, wait, act } from 'react-testing-library'
import { UserInputProvider, UserInputConsumer }  from 'contextes/UserInput'

const getContextControler = () => {
    const { getByTestId } = render(<UserInputProvider>
        <UserInputConsumer>
            {context => (
                <Fragment>
                    <input type="button" data-testid='setJson' onClick={()=>context.setJson({value: 'hello'})}/>
                    <input type="button" data-testid='setInvalidJson' onClick={()=>context.setJson('')}/>
                    <input type="button" data-testid='clearError' onClick={context.clearError}/>
                    <input type="button" data-testid='clearJson' onClick={context.clearJson}/>
                    <p data-testid='loading' >{String(context.loading)}</p>
                    {context.json && <p data-testid='jsonValue'>{context.json.value}</p>}
                    {!context.json && <p data-testid='noJsonValue'></p>}
                    {<p data-testid='error'>{context.error || 'none'}</p>}
                </Fragment>
            )}  
        </UserInputConsumer>    
    </UserInputProvider>)
    return {
        setJson: ()=>fireEvent.click(getByTestId('setJson')),
        setInvalidJson: ()=>fireEvent.click(getByTestId('setInvalidJson')),
        clearError: ()=>fireEvent.click(getByTestId('clearError')),
        clearJson: ()=>fireEvent.click(getByTestId('clearJson')),
        jsonValue: ()=>getByTestId('jsonValue'),
        noJsonValue: ()=>getByTestId('noJsonValue'),
        loading: ()=>getByTestId('loading'),
        error: ()=>getByTestId('error'), 
    }
}

it('Json can be set and cleared', async () => {
    const context = getContextControler()
    context.setJson()
    expect(context.loading().textContent).toEqual('true')
    expect(await wait(() => context.jsonValue()))
    expect(context.loading().textContent).toEqual('false')
    context.clearJson()
    expect(await wait(() => context.noJsonValue()))
})

it('Error is set and can be cleared', async () => {
    const context = getContextControler()
    expect(context.error().textContent).toEqual('none')
    context.setInvalidJson()
    expect(await wait(() => context.error()))
    expect(context.error().textContent).not.toEqual('none')
    context.clearJson()
    expect(await wait(() => context.error()))
    expect(context.error().textContent).toEqual('none')
})