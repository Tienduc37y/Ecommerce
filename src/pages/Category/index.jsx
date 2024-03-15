import ProductList from '@/components/Product/ProductList'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import {
    Form,
    Input,
    Button,
    Select,
    Checkbox,
    Row,
    Col,
    Collapse,
    Breadcrumb
} from 'antd'
import { useEffect, useState } from 'react'
import {useFetch} from '@/customHooks/useFetch'
import './Category.scss'
const CheckboxGroup = Checkbox.Group
export default function Category(){
    const params = useParams()
    const [brandCheckList, setBrandCheckList] = useState([])
    const [sortPrice, setSortPrice] = useState("asc")
    const [priceCondition, setPriceCondidtion] = useState({})
    const [query, setQuery] = useSearchParams()
    const [formPriceCondition] = Form.useForm()
    const [childData, setChildData] = useState({})
    function getQueryToObject(){
        let result = {}
        query.forEach((value, key)=>{
            result[key] = value
        })

        return result
    }

    const handleBrandChange = (values)=>{
        setBrandCheckList(values)
        let queryObj = getQueryToObject()
        queryObj.brand = values.join(',')
        if(values.length <= 0){
            delete queryObj.brand
        }
        setQuery(queryObj)
    }
    
    const handleSortPricechange = (value)=>{
        setSortPrice(value)
        let queryObj = getQueryToObject()
        queryObj.sort = value
        setQuery(queryObj)
    }
    const handleMinMaxChange = (value)=>{
        let queryObj = getQueryToObject()
        if(value.minPrice){
            queryObj.minPrice = value.minPrice 
        }else{
            delete queryObj.minPrice
        }
        if(value.maxPrice){
            queryObj.maxPrice = value.maxPrice
        }else{
            delete queryObj.maxPrice
        }
        setPriceCondidtion(value)
        setQuery(queryObj)
    }
    const handleResetFilter = ()=>{
        setPriceCondidtion({})
        setBrandCheckList([])
        setSortPrice('asc')
        setQuery({})
        formPriceCondition.resetFields()
    }
    useEffect(()=>{
        let queryObj = getQueryToObject()
        let defaultSort = queryObj.sort ? queryObj?.sort : "asc"
        let defaultBrand = queryObj.brand ? queryObj?.brand?.split(',') : []
        let defaultPriceCondition = {
            minPrice: queryObj.minPrice,
            maxPrice: queryObj.maxPrice
        }
        setBrandCheckList(defaultBrand)
        setSortPrice(defaultSort)
        setPriceCondidtion(defaultPriceCondition)
        formPriceCondition.setFieldsValue(defaultPriceCondition)
    }, [])
    let {data:categoriesList} = useFetch('/categories', '', 100)
    let {data:brands} = useFetch('/brands', '', 100)
    brands = brands.map(item=>{
        return item?.attributes?.name
    })
    
    let queryFilterTxt = ''

    let category = ''
    if(params.category){
        category = params.category
    }else{
        category = query.get('cat')
    }
    if(category && category !== 'san-pham-moi' ){
        queryFilterTxt = `filters[idCategories][slug]=${category}`
    }
    
    let txtSearch = query.get('name')
    if(txtSearch){
        queryFilterTxt += `&filters[name][$contains]=${txtSearch}`
    }

    if(priceCondition.minPrice){
        queryFilterTxt += `&filters[price][$gte]=${priceCondition.minPrice}`
    }
    if(priceCondition.maxPrice){
        queryFilterTxt += `&filters[price][$lte]=${priceCondition.maxPrice}`
    }
    if(sortPrice){
        queryFilterTxt += `&sort[1]=price:${sortPrice}`
    }

    if(brandCheckList.length >= 0){
        brandCheckList.forEach((value, index)=>{
            queryFilterTxt += `&filters[idBrand][name][$in][${index}]=${value}`
        })
    }
    const itemsFilterCollapse = [
        {
          key: '1',
          label: <h4>Lọc theo Hãng</h4>,
          children: <CheckboxGroup options={brands} value={brandCheckList} onChange={handleBrandChange}/>,
        },
        {
          key: '2',
          label: <h4>Sắp xếp</h4>,
          children: (
            <>
                <Select
                    className='sort-price'
                    value={sortPrice}
                    onChange={handleSortPricechange}
                    options={[{
                        label: 'Giá tăng dần',
                        value: 'asc'
                    }, {
                        label: 'Giá giảm dần',
                        value: 'desc'
                    }]}
                ></Select>
                <Form
                    name="price-form"
                    onFinish={handleMinMaxChange}
                    form={formPriceCondition}
                >
                    <Form.Item
                        label="Gia thấp nhất"
                        name="minPrice"
                    ><Input/>
                    </Form.Item>
                    <Form.Item
                        label="Gia cao nhất"
                        name="maxPrice"
                    ><Input/>
                    </Form.Item>
                    <Button htmlType='submit'>Lọc</Button>
                </Form>
                <Button onClick={handleResetFilter}>Xoa Loc</Button>
            </>
          ),
        },
        {
            key: 3,
            label: <h4>Chọn danh mục</h4>,
            children: (<div className='categories-list'>
                {categoriesList?.map(item=>{
                    return <Link to={`/danh-muc/${item?.attributes?.slug}`} key={item?.id}>{item?.attributes?.name}</Link>
                })}
            </div>)
        }
    ];

    let breadcrumbItems = [{
        title: <Link to='/'>Trang chủ</Link>
    }]
    if(window.location.href.includes('danh-muc')){
        breadcrumbItems.push({
            title: <Link to='#'>Danh mục</Link>
        }, {
            title: <Link to='#'>{params.category}</Link>
        })
        
    }else{
        breadcrumbItems.push({
            title: <Link to='#'>Tìm kiếm</Link>
        })
    }

    return (
        <>  
            <Breadcrumb
                items={breadcrumbItems}
            />
            <div className="search-result">
                {txtSearch ? <h1>Tìm kiếm: {txtSearch}</h1> : null}
                <h1>{childData?.paging?.total} Sản phẩm</h1>
            </div>
            <Row className='category-wrapper'>
                <Col xs={24} md={6} style={{background: 'white', padding: '20px'}}>
                    <Collapse items={itemsFilterCollapse} defaultActiveKey={['1']}/>
                </Col>
                <Col xs={24} md={18}>
                    <ProductList query={queryFilterTxt} transferDataToParent={setChildData}/>
                </Col>
            </Row>
            
        </>
    )
}