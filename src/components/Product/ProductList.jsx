import {
    Card,
    Row, Col,
    Pagination,
    Skeleton
} from 'antd'
import { Link } from 'react-router-dom';
import {useFetch} from '@/customHooks/useFetch'
import './ProductList.scss'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect } from 'react';
import {convertToCurrency} from '@/common/currencyHelper';
import placeholderLoading from '@/assets/placeholder-loading.gif'
const { Meta } = Card;

export default function ProductList({query, type = 'row', showPagination = true, pageSize = 8, transferDataToParent}){
    const {data, paging, setPaging, loading} = useFetch('/products', query, pageSize )
    useEffect(()=>{
        if(typeof transferDataToParent === 'function'){
            transferDataToParent({data, paging, setPaging, loading}) 
        }
    }, [data, paging, setPaging, loading])
    let loadingElement = <Row gutter={[15, 15]} justify="space-between">
        <Row gutter={[0, 15]} className="skeleton-container">
            <Col span={24}><Skeleton.Image active/></Col>
            <Col span={24}><Skeleton.Input active/></Col>
            <Col span={24}><Skeleton title active/></Col>
        </Row>
        <Row gutter={[0, 15]} className="skeleton-container">
            <Col span={24}><Skeleton.Image active/></Col>
            <Col span={24}><Skeleton.Input active/></Col>
            <Col span={24}><Skeleton title active/></Col>
        </Row>
        <Row gutter={[0, 15]} className="skeleton-container">
            <Col span={24}><Skeleton.Image active/></Col>
            <Col span={24}><Skeleton.Input active/></Col>
            <Col span={24}><Skeleton title active/></Col>
        </Row>
        <Row gutter={[0, 15]} className="skeleton-container">
            <Col span={24}><Skeleton.Image active/></Col>
            <Col span={24}><Skeleton.Input active/></Col>
            <Col span={24}><Skeleton title active/></Col>
        </Row>
    </Row>

    
    if(loading){
        return loadingElement
    }else{
        return (<>
            <Row gutter={[0, 30]} style={{flexDirection: type}}>
                {data.map(item=>{
                    let imgUrl = item?.attributes?.image?.data[0]?.attributes?.url ? import.meta.env.VITE_BASE_API_URL + item?.attributes?.image?.data[0]?.attributes?.url : ''
                    return (
                        <Col key={item?.id} md={type=='column' ? 24 : 6} sm={24} className="product">
                            <Link to={`/sanpham/${item?.attributes?.slug}`} className="link-wrapper">
                                <Card 
                                    key={item?.id}
                                    hoverable
                                    cover={<LazyLoadImage wrapperClassName="img-wrapper" src={imgUrl} placeholderSrc={placeholderLoading}/>}
                                    className="card"
                                >   
                                    <Meta title={item?.attributes?.name} description={item?.attributes?.description?.substring(0, 30)} />
                                    <Meta title={convertToCurrency(item?.attributes?.price)} />
                                </Card>
                            </Link>
                        </Col>
                    )
                })}
            </Row>
            {
                showPagination ? <Pagination 
                    total={paging.total} 
                    current={paging.page} 
                    pageSize={paging.pageSize}
                    onChange={(page)=>{
                        setPaging({
                            ...paging,
                            page: page
                        })
                    }}
                    style={{margin: '10px 0'}}
                ></Pagination> : null
            }
        </>)
    }
}