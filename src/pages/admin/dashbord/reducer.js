import React, {useReducer, useState, useContext} from 'react'
import { Button, Input } from 'antd'

const initialState = 0
const reducer = (state, action) => {
  switch(action.type) {
    case 'add': 
      return state + 1;
    case 'delete': 
      return state - 1;
    case 'set': 
      return action.data;
    default:
      throw new Error('Unexpected action')
  }
}

// 可以实现类似useState的功能，将值设置给第一个参数
// const useStateCommonReducer = (state, action) => action 

const CounterContext = React.createContext(null)

const ContextProvider = ({children}) => {
  const { Provider } = CounterContext
  const contextReducer = useReducer(reducer, initialState)
  return (
    <Provider value={contextReducer}>
      {children}
    </Provider>
  )
}

const useCountHook = () => {
  const counterContext = useContext(CounterContext)
  return counterContext
}

const Counters = () => {
  // const initialState = 0
  // const [state, dispatch] = useReducer(reducer, initialState)
  // const [state1, dispatch] = useReducer(useStateCommonReducer, initialState)
  const [state, dispatch] = useCountHook()
  const [inputVal, setInputVal] = useState('')

  return (
    <div>
      this is reducer test
      {state}
      <Button onClick={()=>dispatch({type: 'add'})}>加一</Button>
      <Button onClick={()=>dispatch({type: 'delete'})}>减一</Button>
      <Input value={inputVal} onChange={(e)=>{setInputVal(e.target.value)}}/>
      <Button onClick={
        ()=>dispatch({type: 'set', data: inputVal})
      }>设置值</Button>
    </div>
  )
}

function Exemple() {
  return (
    <div>
      {/* 同一个Provider下context上下文使用的共同的 */}
      <ContextProvider>
        <Counters/>
        <Counters/>
      </ContextProvider>
      <ContextProvider>
        <Counters/>
        <Counters/>
      </ContextProvider>
    </div>
  )
}

export default Exemple