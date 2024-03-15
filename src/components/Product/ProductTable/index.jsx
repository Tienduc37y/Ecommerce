import { useDispatch, useSelector } from "react-redux"
import { setQuantityProduct, removeProduct } from '@/redux/cartSlice'
import {useFetch} from '@/customHooks/useFetch'
import {Table, InputNumber, Row, Col, Button} from 'antd'
import {DeleteOutlined} from '@ant-design/icons'
import { Link } from "react-router-dom"
import './ProductTable.scss'
import { convertToCurrency } from "@/common/currencyHelper"
export default function ProductTable({dataSource = [], options={
    edit: true,
    buttonCTA: null
}}){
    const dispatch = useDispatch()
    function handleRemoveItem(id){
        dispatch(removeProduct(id))
    }
    const columns = [
        {
          title: 'Tên SP',
          render: (item) => {
            let imgProduct = item?.attributes?.image?.data[0]?.attributes?.formats?.thumbnail?.url
            imgProduct = imgProduct ? import.meta.env.VITE_BASE_API_URL + imgProduct : ''
            let max = item?.attributes?.quantityAvailable
            return (
                <div className="info">
                    <Link to={`/sanpham/${item?.attributes?.slug}`}><img className="thumbnail" src={imgProduct} alt={item?.attributes?.name} /></Link>
                    <div>
                        <Link to={`/sanpham/${item?.attributes?.slug}`}>
                            <h3>{item?.attributes?.name}</h3>
                        </Link>
                        <div className="show-on-mobile">
                            <div>
                                <span className="old-price">{convertToCurrency(item?.attributes?.oldPrice)}</span> - <span className="price">{convertToCurrency(item?.attributes?.price)}</span>
                            </div>
                            <InputNumber
                                disabled={!options?.edit}
                                defaultValue={item?.quantity}
                                min={1}
                                max={max}
                                onChange={(value)=>{
                                    dispatch(setQuantityProduct({
                                        id: item?.id,
                                        quantity: value,
                                        quantityAvailable: max
                                    }))
                                }}
                            ></InputNumber>
                            <p>Còn: {max}</p>
                            <p className="money">{convertToCurrency(item.quantity * item?.attributes?.price)}</p>
                            {options?.edit ? <DeleteOutlined onClick={()=>{
                                handleRemoveItem(item?.id)
                            }}/> : null}
                        </div>
                    </div>
                </div>
            )
          }
        },
        {
          title: 'Giá',
          dataIndex: 'attributes',
          responsive: ['md'],
          render: item => (
            <div>
                <span className="old-price">{convertToCurrency(item?.oldPrice)}</span> - <span className="price">{convertToCurrency(item?.price)}</span>
            </div>
          )
        },
        {
            title: 'Số lượng',
            responsive: ['md'],
            render: item => {
                let max = item?.attributes?.quantityAvailable
                return (
                    <Row gutter={[0, 10]}>
                        <Col span={24}>
                            <InputNumber
                            defaultValue={item?.quantity}
                            min={1}
                            max={max}
                            disabled={!options?.edit}
                            onChange={(value)=>{
                                if(value){
                                    dispatch(setQuantityProduct({
                                        id: item?.id,
                                        quantity: value,
                                        quantityAvailable: max
                                    }))
                                }
                            }}
                            />
                        </Col>
                        <Col span={24}><span>Còn: {max}</span></Col>
                    </Row>
                )
            }
        },{
            title: 'Thành tiền',
            responsive: ['md'],
            render: item => <p className="money">{convertToCurrency(item.quantity * item?.attributes?.price)}</p>
        },
    ];

    if(options?.edit){
        columns.push({
            title: 'Xoá',
            responsive: ['md'],
            render: item => <DeleteOutlined onClick={()=>{
                handleRemoveItem(item?.id)
            }}>
            </DeleteOutlined>
        })
    }
  
    return (
        <>  
            {
                dataSource?.length ? (
                    <Table 
                        className="cart-table"
                        rowClassName="product"
                        pagination={false}
                        dataSource={dataSource} columns={columns}
                    ></Table> 
                ) : (
                    <Row justify={"center"} align={'middle'}>
                        <h3 style={{padding: 10}}>Chưa có sản phẩm nào</h3>
                        <Link to="/">Quay về trang chủ</Link>
                    </Row>
                )
            }
            <Row className="sumary" justify={'end'} align={'middle'}>
                <Col>{options?.buttonCTA}</Col>
                <Col><h3 className="money">{convertToCurrency(dataSource?.reduce((total, item)=>{
                    return total + Number(item?.attributes?.price) * item?.quantity 
                }, 0))}</h3></Col>
            </Row>
        </>
    )
}