import React, { useContext, useReducer, useState } from 'react'
import { Button, Input } from 'antd';

const initialState = 0
const reducer = (state, action) => {
    switch(action.type) {
        case 'add':
            return state + 1;
        case 'del':
            return state -1;
        case 'set':
            return action.data;
        default:
            throw new Error('action type is error')
    }
}

const CountContext = React.createContext(null)

const ContextProvider = ({children}) => {
    const {Provider} = CountContext
    const counterContext = useReducer(reducer, initialState)

    return (
        <Provider value={counterContext}>
            {children}
        </Provider>
    )
}
const useContextHooks = () => {
    const counterContext = useContext(CountContext)
    return counterContext
}

const Counter = () => {
    const [state, dispatch] = useContextHooks()
    const [inputVal, setInputVal] = useState('')

    return (
        <div>
            this is state: {state}
            <Button onClick={()=>dispatch({type: 'add'})}>加一</Button>
            <Button onClick={()=>dispatch({type: 'del'})}>减一</Button>
            <Input value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/>
            <Button onClick={()=>dispatch({type: 'set', data: inputVal})}>设置</Button>
        </div>
    )
}

const Example = () => {
    return (
        <div>
            <ContextProvider>
                <Counter/>
                <Counter/>
            </ContextProvider>
            <ContextProvider>
                <Counter/>
                <Counter/>
            </ContextProvider>
        </div>
    )
}

export default Example