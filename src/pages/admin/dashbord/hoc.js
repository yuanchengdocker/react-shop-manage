import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

// const withRequest = (options) => (Comp) => {
//     class Proxy extends React.Component{
//         constructor(props) {
//             console.log(options)
//             super(props)
//             this.state = {
//                 users: []
//             }
//         }

//         componentDidMount() {
//             setTimeout(()=>{
//                 this.setState({
//                     users: [1, 2, 3]
//                 })
//             }, 1000)
//         }

//         render() {
//             return (
//                 <Comp users={this.state.users}/>
//             )
//         }
//     }

//     return Proxy
// }

const UserHooks = () => {
    const [data, setData] = useState(null)

    useEffect(()=>{
        reload()
    }, [])

    function reload(){
        setData(null)
        setTimeout(()=>{
            setData([1,2,3,4])
        }, 2000)
    }

    return [data, reload]
}

export default () => {
    const [users, reload] = UserHooks()
    return (
        <div>
            {
                users && users.length > 0 ? <ul>
                    {
                        users.map(item => <li key={item}>{item}</li>)
                    }
                </ul> : <div>Loading</div>
            }
            <Button onClick={()=>reload()}>重新加载</Button>
        </div>
    )
}
