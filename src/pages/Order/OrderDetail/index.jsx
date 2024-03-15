import { useParams, Link } from "react-router-dom"
import {useFetch} from '@/customHooks/useFetch'
import {Row, Col, Steps, Breadcrumb} from 'antd'
import ProductTable from '@/components/Product/ProductTable'
export default function OrderDetail(){
    const params = useParams()

    let {data} = useFetch(`/orders/${params.id}`)
    let user = data?.attributes?.idUser?.data?.attributes

    let dataSource = data?.attributes?.items?.map(item=>{
        let product = item?.product?.data
        return {
            ...product,
            product: item?.id,
            key: item?.id,
            quantity: item?.quantity,
            price: item?.price,
            totalPrice: item?.totalPrice
        }
    })
    let statusOrderComponent = null
    switch (data?.attributes?.status) {
        case 'new':
            statusOrderComponent = 0;
            break;
        case 'confirmed':
            statusOrderComponent = 1;
            break;
        case 'done': 
            statusOrderComponent = 2;
            break;
        case 'cancelled': 
            statusOrderComponent = <h1>Đơn hàng đã bị chủ Shop huỷ</h1>
            break;
        case 'boom':
            statusOrderComponent = <h1>Đơn hàng đã bị Khách hàng huỷ</h1>
            break;
        default:
            statusOrderComponent = <h1>Đơn hàng chưa được cập nhật trạng thái</h1>
            break;
    }

    if(typeof statusOrderComponent == 'number'){
        statusOrderComponent = (
            <Steps
                current={statusOrderComponent}
                items={[
                {
                    title: 'Đơn mới',
                },
                {
                    title: 'Đã xác nhận',
                },
                {
                    title: 'Hoan thanh',
                }
                ]}
            />
        )
    }
    let breadcrumbItems = [{
        title: <Link to='/'>Trang chủ</Link>
    }, {
        title: <Link to='/danh-sach-don-hang'>Đơn hàng</Link>
    }, {
        title: <Link to='#'>{params.id}</Link>
    }]
    return (
        <>  
            <Breadcrumb
                items={breadcrumbItems}
            />
            <h1>Đơn hàng {params.id}</h1>
            {statusOrderComponent}
            <Row>
                <Col span={24}><h2>Thông tin người nhận</h2></Col>
                <Col span={24}>
                    <h3>Tài khoản: {user?.username}</h3>
                </Col>
                <Col span={24}>
                    <h3>Tên người nhận: {data?.attributes?.customerName || user?.name}</h3>
                </Col>
                <Col span={24}>
                    <h3>Số điện thoại: {data?.attributes?.phone || user?.phone}</h3>
                </Col>
                <Col span={24}>
                    <h3>Địa chỉ : {data?.attributes?.address || user?.address}</h3>
                </Col>
            </Row>
            <ProductTable dataSource={dataSource} options={{
                edit: false,
                buttonCTA: null
            }}></ProductTable>
        </>
    )
}