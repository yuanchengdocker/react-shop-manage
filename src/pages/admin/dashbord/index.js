import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useContext,
    useRef
} from 'react'
import './index.css'
import Minput from './minput'
import Memoreize from './memorize'
import Reducer from './reducer'
import HelloContext from './HelloContext'
import GlobleContext from '../../../GlobleContext'

const { Provider } = HelloContext

export default () => {
    const [count, setCount] = useState(0)
    const [display, setDisplay] = useState(false)
    // const boxRef = React.createRef()
    const boxRef = useRef() // 新的ref hooks的用法

    // if(count > 1) {
    useEffect(() => {
        if(count > 5) {
            setDisplay(x => true)
        }
    }, [count])
    // } else {  // 此时不报错，但是不能正常将display值set进去
    //     useEffect(() => {
    //         setDisplay(x => false)
    //     }, [])
    // }

    useEffect(() => {
        console.log('useEffect')
        let time = setInterval(() => {
            setCount(x => x+1)
        }, 1000);

        getData()

        return () => {
            console.log('this is destroyed')
            clearInterval(time)
        }
    }, [])

    useLayoutEffect(() => {  // 同为加载完立即执行，但比useEffect要优先执行
        console.log('useLayoutEffect')
        setTimeout(() => {
            boxRef.current.style['top'] = '100px'
        }, 100)
    }, [])

    const getData = () => {
        console.log('getData')
    }

    console.log('render') // 每一次set都会引起更新

    return (
        <Provider value="hello world">
            <div ref={boxRef} className="box">
                {count}
                {
                    display ? <Foo/> : ''
                }
            </div>
            <Minput/>
            <Memoreize/>
            <Reducer/>
        </Provider>
    )
}

function Bar() {
    const value = useContext(HelloContext)
    const theme = useContext(GlobleContext)
    return <div>
        {value},{<br/>}
        {theme}
    </div>
}

function Foo() {
    return <div>
        <Bar/>
    </div>
}