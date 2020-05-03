import React, {useState, useMemo ,useCallback} from 'react'
import { Button } from 'antd'

export default ()=> {
  const [count, setCount] = useState(0)

  const addCounts = useMemo(() => { // 缓存计算后的值
    console.log('useMemo count', count)
    return count
  }, [count])

  const addCount = useCallback(() => { // 增加[]依赖来判断是否重新计算
    console.log('useCallback count', count) // useCallback 会缓存count的值
    setCount(x => x+1) // 此时会取真实的count，所以即使有useCallback 也一样会一直执行
  }, [count]) // 每秒只执行一次
  // Math.floor(new Date().getTime() / 1000) 一秒变化一次

  return <div>
    <span>{addCounts}</span>
    <Button onClick={
      () => addCount()
    }>加1</Button>
  </div>
}