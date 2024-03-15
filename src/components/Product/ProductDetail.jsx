import { useParams, Link } from "react-router-dom"
import {useFetch} from '@/customHooks/useFetch'
import Markdown from 'react-markdown'
import {
    Layout, Row, Col, Button, InputNumber, Form
} from 'antd'
import ProductBlock from "./ProductBlock"
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import './ProductDetail.scss' 
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct } from "../../redux/cartSlice"
import {convertToCurrency} from '@/common/currencyHelper'
import { Breadcrumb } from 'antd'
const {Content, Sider} = Layout
export default function ProductDetail(){
    const dispatch = useDispatch()
    const params = useParams()
    const [form] = Form.useForm()
    const {data, setData} = useFetch(`/products/${params.slug}`)
    let contentBody = data?.attributes?.description?.replaceAll("](/uploads/", "](https://backoffice.nodemy.vn/uploads/")
    let brand = data?.attributes?.idBrand?.data?.attributes?.name
    let categories = data?.attributes?.idCategories?.data
    let queryWithCategories = categories?.reduce((txt, item, index)=>{
        return txt + `&filters[idCategories][slug][$in][${index}]=${item?.attributes?.slug}`
    }, `filters[slug][$ne]=${params.slug}`)

    let categoriesLink = categories?.map(item=>{
        return <Link key={item?.id} to={`/danh-muc/${item?.attributes?.slug}`}>{item?.attributes?.name}</Link>
    })

    let imgList = data?.attributes?.image?.data?.map(item=>{
        return {
            original: import.meta.env.VITE_BASE_API_URL + item?.attributes?.url,
            thumbnail: import.meta.env.VITE_BASE_API_URL + item?.attributes?.formats?.thumbnail?.url
        }
    })

    function addToCart(){
       
        let cart = document.querySelector('#cart')
        let menuIcon = document.querySelector('#menu-icon')
        let anchor = null
        if(window.innerWidth < 768){
            anchor = menuIcon.getBoundingClientRect()
        }else{
            anchor = cart.getBoundingClientRect()
        }
        let posCart = {
            y: anchor.top,
            x: anchor.left
        }
        let imgProduct = document.querySelector('.image-gallery-image')
        let imgProductClone = imgProduct.cloneNode()
        let time = 1.2
        imgProductClone.style.cssText = `
            position: fixed;
            top: 200px;
            left: 300px;
            width: 100px;
            height: 100px;
            z-index: 999;
            transform: translate(-50%, -50%);
            transition: all ${time}s ease-in-out;
        `
        document.body.appendChild(imgProductClone)

        setTimeout(()=>{
            imgProductClone.style.width = `50px`
            imgProductClone.style.height = `50px`
            imgProductClone.style.left = `${posCart.x}px`
            imgProductClone.style.top = `${posCart.y}px`
        })
       setTimeout(()=>{
        imgProductClone.remove()
        dispatch(addProduct({
            id: data?.id,
            quantity: form.getFieldValue('quantity'),
            quantityAvailable: data?.attributes?.quantityAvailable
        }))
       }, (time * 1000))
       
    }
    let breadcrumbItems = [{
        title: <Link to='/'>Trang chủ</Link>
    }, {
        title: <Link to='/danh-muc/san-pham-moi'>Sản phẩm</Link>
    },{
        title: <Link to={`#`}>{data?.attributes?.name}</Link>
    }]

    return (<>
        <Row gutter={[60, 20]} className="product">
            <Col span={24}>
                <Breadcrumb
                    items={breadcrumbItems}
                />
            </Col>
            <Col xs={24} md={18}>
                <h1 className="title">{data?.attributes?.name}</h1>
                <Row gutter={[10, 10]}>
                    <Col xs={24} md={12}>
                        {imgList ? <ImageGallery items={imgList}/> : null}
                    </Col>
                    <Col xs={24} md={12} className="info">
                        <div> 
                            <span className="old-price">{convertToCurrency(data?.attributes?.oldPrice)}</span> 
                            <span className="price">{convertToCurrency(data?.attributes?.price)}</span>
                            <span className="saving-money">Tiết kiệm {convertToCurrency(+data?.attributes?.oldPrice - +data?.attributes?.price)}</span>
                        </div>
                        {
                            categoriesLink ? (
                                <div className="categories-link">
                                    <span className="label-field">Danh mục: </span> {categoriesLink}
                                </div>
                             ) : null
                        }
                        {brand ? <div> <span className="label-field">Thương hiệu: </span> <Link to={`/tim?brand=${brand}`}>{brand}</Link></div> : null}
                        {data?.attributes?.cpu ? <div> <span className="label-field">CPU: </span> {data?.attributes?.cpu}</div> : null}
                        {data?.attributes?.ram ? <div><span className="label-field">RAM: </span> {data?.attributes?.ram}</div> : null}
                        {data?.attributes?.quantityAvailable ? <div><span className="label-field">Có sẵn: </span> {data?.attributes?.quantityAvailable}</div> : 'Hết hàng'}
                        {data?.attributes?.quantityAvailable ? (<>
                            <div>
                                <span className="label-field">Số lượng: </span>
                                <Form form={form}>
                                    <Form.Item
                                        name="quantity"
                                        initialValue={1}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={data?.attributes?.quantityAvailable || 1}
                                        />
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="btn-wrapper">
                                <Button className="btn" type="primary"
                                    onClick={addToCart}
                                >Thêm giỏ hàng</Button>
                            </div>
                        </>) : (
                            <div className="btn-wrapper">
                                <Button className="btn" type="primary">Liên hệ ngay</Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <div className="content-body">
                    <h1>Mô tả sản phẩm</h1>
                    <Markdown>
                        {contentBody}
                    </Markdown>
                </div>
                <ProductBlock 
                    title='Sản phẩm liên quan' 
                    query={queryWithCategories}
                    pageSize={4}
                    showButton={false}
                />
            </Col>
            <Col xs={24} md={6} >
                {brand ? 
                    <ProductBlock 
                    query={`filters[idBrand][name]=${brand}&filters[slug][$ne]=${params.slug}`}
                    title="Sản phẩm cùng hãng" 
                    link="/danh-muc/san-pham-moi" 
                    showPagination={false} 
                    showButton={false} 
                    type="column" 
                    pageSize={4}
                    />
                    : 
                    'Khong co san pham nao cung'
                }
            </Col>
        </Row>
        
    </>)
}