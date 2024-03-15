import './Home.scss'
import {useFetch} from '@/customHooks/useFetch'
import ProductBlock from '@/components/Product/ProductBlock'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import {Row, Col, Menu} from 'antd'
import { Link } from 'react-router-dom';
export default function Home(){
    const {data: configBanner} = useFetch('/homepage')
    const {data: dropdownMenu} = useFetch('/dropdown-tabs', 'populate[0]=bannerFeatures&populate[1]=section.image&populate[2]=section.link', 20)
    let leftBanner = configBanner?.attributes?.leftBanner?.data?.map(item=>{
        return {
            original: import.meta.env.VITE_BASE_API_URL +  item?.attributes?.url,
            thumbnail: import.meta.env.VITE_BASE_API_URL +  item?.attributes?.url
        }
    })
    let rightBanner = configBanner?.attributes?.rightBanner?.data?.map(item=>{
        return import.meta.env.VITE_BASE_API_URL +  item?.attributes?.url
    }) || []
    let subBanner = configBanner?.attributes?.subBanner?.data?.map(item=>{
        return import.meta.env.VITE_BASE_API_URL +  item?.attributes?.url
    }) || []
    let bottomBanner = configBanner?.attributes?.bottomBanner?.data?.map(item=>{
        return import.meta.env.VITE_BASE_API_URL +  item?.attributes?.url
    }) || []

    let dropdownMenuComponent = dropdownMenu.map((item)=>{
        let megamenuItems = item?.attributes?.section?.map((megaItem, index)=>{
            return <li key={megaItem?.id} className="mega-menu-items">
                    <div className='mega-item-info'>
                        <img src={import.meta.env.VITE_BASE_API_URL + megaItem?.image?.data?.attributes?.url} alt="" />
                        <h3>{megaItem?.title}</h3>
                    </div>
                    <div className="sub-menu-mega-items">
                        {megaItem?.link?.map(subMegaItem=>{
                            return (
                                <Link 
                                    key={subMegaItem?.id}
                                    to={subMegaItem?.url}
                                > {subMegaItem?.label} </Link>
                            )
                        })}
                    </div>
                </li>
        })
        return (
            <li key={item?.id}> {item?.attributes?.label}
                <div className="mega-menu">
                    <div className="mega-menu-left-part">
                        <ul>
                            {megamenuItems}
                        </ul>
                    </div>
                    <div className="mega-menu-right-part">
                        <img src={import.meta.env.VITE_BASE_API_URL + item?.attributes?.bannerFeatures?.data?.attributes?.url} alt="" />
                    </div>
                </div>
            </li>
        )
    })

    return (
        <>  
            <Row className='banner-home' gutter={[{xs: 0, md: 10}, {xs: 0, md: 10}]}>
                <Col xs={0} md={5}>
                    <ul className="menu">
                        {dropdownMenuComponent}
                    </ul>
                </Col>
                <Col xs={24} md={19}>
                    <Row>
                        <Col xs={24} md={16}>
                            {leftBanner ? 
                                <ImageGallery 
                                    items={leftBanner} 
                                    showNav={false} 
                                    showThumbnails={false}
                                    showPlayButton={false}
                                    autoPlay
                                /> : null
                            }
                        </Col>
                        <Col xs={0} md={8}>
                            <Row>
                                <Col span={24}><img src={rightBanner[0]} alt="" /></Col>
                                <Col span={24}><img src={rightBanner[1]} alt="" /></Col>
                            </Row>
                        </Col>
                        {/* /rightBanner */}
                        <Col xs={0} md={24}>
                            <Row gutter={[{xs: 0, md: 5}, {xs: 0, md: 5}]}>
                                <Col span={8}><img src={subBanner[0]} alt="" /></Col>
                                <Col span={8}><img src={subBanner[1]} alt="" /></Col>
                                <Col span={8}><img src={subBanner[2]} alt="" /></Col>
                            </Row>
                        </Col>
                        
                    </Row>
                    {/* slide + banner */}
                </Col>    
            </Row>
            <Row className='banner-bottom'>
                <Col xs={0} md={24}>
                    <Row gutter={[{xs: 0, md: 5}, {xs: 0, md: 5}]}>
                        <Col span={6}><img src={bottomBanner[0]} alt="" /></Col>
                        <Col span={6}><img src={bottomBanner[1]} alt="" /></Col>
                        <Col span={6}><img src={bottomBanner[2]} alt="" /></Col>
                        <Col span={6}><img src={bottomBanner[3]} alt="" /></Col>
                    </Row>
                </Col>
            </Row>

            <ProductBlock title="Sản phẩm mới" link="/danh-muc/san-pham-moi"/>
            <ProductBlock 
                title="Laptop Gaming" 
                query="filters[idCategories][slug]=laptop-gaming"
                link="/danh-muc/laptop-gaming"
            />
        </>
    )
}