import React, {useRef, forwardRef, useImperativeHandle} from 'react'
import { Button } from 'antd'

function Winput(props, refs) {
  let ref = useRef()

  useImperativeHandle(refs, () => ({// 返回一个父组件ref与子组件ref连通的连接点
    focus: () => {
      ref.current.focus()
    },
    value:(val) => {
      ref.current.value = val
    }
  }))

  return <input 
    ref = {ref}
    onChange = {(e) => props.onChange(e.target.value)}
  ></input>
}

const Minput = forwardRef(Winput) // Ref由父级组件创建，传递到子组件使用控制

export default () => {
  let ref1 = useRef()
  let ref2 = useRef()
  return (
    <div>
      <Minput onChange={(x)=>{console.log('input1 INPUT:'+x)}} ref={ref1}></Minput>
      <Minput onChange={(x)=>{console.log('input2 INPUT:'+x)}} ref={ref2}></Minput>

      <Button onClick={
        ()=>{
          console.log(ref1.current)
          ref1.current.value(100)  // 父组件拿到的ref是完全控制子组件的
          ref1.current.focus()
        }
      }>focus1</Button>
      <Button onClick={
        ()=>{
          ref2.current.focus()
        }
      }>focus2</Button>
    </div>
  )
}