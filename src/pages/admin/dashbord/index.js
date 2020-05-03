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
import Reducer2 from './reduce2'
import Reducer3 from './reduce3'
import Hoc from './hoc'
import HelloContext from './HelloContext'
import GlobleContext from '../../../GlobleContext'

const { Provider } = HelloContext

export default () => {
    const [count, setCount] = useState(0)
    const [display, setDisplay] = useState(false)
    // const boxRef = React.createRef()
    const boxRef = useRef() // 新的ref hooks的用法
    const boxRef2 = useRef()

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
        let prograss = 300
        const render = () => {
            prograss ++
            boxRef.current.style['left'] = `${prograss/10}%`
            console.log('requestAnimationFrame', (new Date()).getTime())
            if(prograss <= 840) {
                window.requestAnimationFrame(render)
            }
        }
        window.requestAnimationFrame(render)
        
        let count = 300
        let time = setInterval(()=>{
            count ++
            boxRef2.current.style['left'] = `${count/10}%`
            console.log('setInterval', (new Date()).getTime())
            if(count > 840) clearInterval(time)
        }, 17)
    }, [])

    const getData = () => {
        console.log('getData')
    }

    return (
        <Provider value="hello world">
            <Hoc/>
            <div ref={boxRef} className="box">
                {count}
                {
                    display ? <Foo/> : ''
                }
            </div>
            <div ref={boxRef2} className="box" style={{top: '20%'}}>
                {count}
                {
                    display ? <Foo/> : ''
                }
            </div>
            <Minput/>
            <Memoreize/>
            <Reducer/>
            this is Reducer2
            <Reducer2/>
            this is Reducer3
            <Reducer3/>
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

function deepCopy(obj) {
    if(typeof obj != 'object' || obj === null || obj === undefined) return obj
    let res = new obj.constructor()
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if(typeof obj[key] === 'object') {
                res[key] = deepCopy(obj[key])
            } else {
                res[key] = obj[key]
            }
        }
    }
    return res
}