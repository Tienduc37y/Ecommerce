import { useSelector } from "react-redux"
import {useFetch} from '@/customHooks/useFetch'
import ProductTable from '@/components/Product/ProductTable'
import { Button, Breadcrumb } from "antd"
import { useNavigate, Link } from "react-router-dom"
export default function Cart(){
    const nav = useNavigate()
    const productList = useSelector(state => state.cart.productList)
    let query = productList.reduce((txtQuery, item, index)=>{
        return txtQuery + `filters[id][$in][${index}]=${item?.id}&`
    }, '')
    let {data} = useFetch(`/products`, query)
    if(!productList?.length){
        data = []
    }
    let dataSource = data?.map(item=>{
        let productFinded = productList.find(product=> product?.id === item?.id)
        let quantity = 0
        if(productFinded){
            quantity = productFinded.quantity
        }

        return {
            ...item,
            key: item?.id,
            quantity: quantity
        }
    })
    let breadcrumbItems = [{
        title: <Link to='/'>Trang chủ</Link>
    }, {
        title: <Link to='#'>Giỏ hàng</Link>
    }]
    return (
        <>  
            <Breadcrumb
                items={breadcrumbItems}
            />
            <ProductTable dataSource={dataSource}
                options={{
                    edit: true,
                    buttonCTA: <Button 
                        disabled={!dataSource?.length}
                        onClick={()=>{
                            nav('/thanhtoan')
                        }}>Thanh toan
                    </Button>
                }}
            ></ProductTable>
        </>
    )
}