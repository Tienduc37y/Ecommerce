import ProductList from './ProductList'
import './ProductBlock.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
export default function ProductBlock(props){
    const {title, link, query, showTitle = true, showButton = true} = props
    const nav = useNavigate()
    return (<>
        <div className="block-title">
            {showTitle ? <h1>{title}</h1> : null}
            {showButton ? <Button danger
                onClick={()=>{
                    nav(link)
                }}
            >Xem tất cả</Button> : null
            }
        </div>
        <ProductList query={query} {...props}/>
    </>)
}