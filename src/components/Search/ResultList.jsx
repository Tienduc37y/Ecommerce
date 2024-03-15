import {Avatar, List} from 'antd'
import { useNavigate } from 'react-router-dom'

const {VITE_BASE_API_URL} = import.meta.env
export default function ResultList(props){
    const nav = useNavigate()
    const handleClick = (item)=>{
        nav(`/sanpham/${item?.attributes?.slug}`)
    }
    return (
        <List
                itemLayout="horizontal"
                dataSource={props.listData}
                style={{
                    position: 'absolute',
                    top: '100%',
                    width: '100%',
                    left: '0',
                    zIndex: 2,
                    background: 'white',
                    ...props.style
                }}
                
                renderItem={(item, index) => {
                    let bgItem = new Date(item?.attributes?.date) < new Date() ? 'rgb(237, 180, 189, 0.4)' : 'white'
                    return (
                        <List.Item
                            onClick={(e)=>{
                                props.handleItemClick(e)
                                handleClick(item)
                            }}
                            style={{
                                background: bgItem,
                                padding: 10
                            }}
                        >
                            <List.Item.Meta
                            avatar={<Avatar src={VITE_BASE_API_URL + item?.attributes?.image?.data[0]?.attributes?.url} />}
                            title={item?.attributes?.name}
                            description={item?.attributes?.price}
                            />
                        </List.Item>
                        )
                }}
            />
    )
}