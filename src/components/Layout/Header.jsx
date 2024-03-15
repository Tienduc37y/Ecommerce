import {Row, Col, Menu, Drawer, Badge, Dropdown} from 'antd'
import {MenuOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchComponent from '../Search/SearchComponent';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth'
export default function Header(){
    const productList = useSelector(state => state.cart.productList)
    const user = useSelector(state => state.auth.user)
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    const itemsDropdown = [{
        key: '1',
        label: (
          <Link to="#">
            Hồ sơ
          </Link>
        ),
    },{
        key: '2',
        label: (
          <Link to="/danh-sach-don-hang">
            Đơn mua
          </Link>
        ),
    }, {
        key: '3',
        label: (
          <Link type="text" onClick={()=>{
            dispatch(logout())
          }}>
            Đăng xuất
          </Link>
        ),
    }]

    const menuItems = [
    {
        key: 1,
        label: <Link to='/danh-muc/san-pham-moi'>San pham moi</Link>
    },
    {
        key: 2,
        label: <Link to='/giohang'>
            <Badge count={productList?.length} overflowCount={10} offset={[10, 5]} id="cart">
                <ShoppingCartOutlined style={{fontSize: 22}}/>
            </Badge>
        </Link>
    },
    {
        key: 3,
        label: (
            user?.username ? <Dropdown
                menu={{
                    items: itemsDropdown
                }}
                placement="bottomLeft"
                arrow
            >
                <Link to={'/'}><h3>{user?.username}</h3></Link>
            </Dropdown> : <Link to='/dang-nhap'>Đăng nhập</Link>
        )
    }]
    let menuHorizontal = (
        <Menu
            className='hide-on-mobile'
            mode='horizontal'
            items={menuItems}
        />
    )

    let menuVertical = (
        <Drawer
            className='drawer-menu'
            title="Basic Drawer" placement="left" onClose={onClose} open={open}
            style={{width: '70%'}}
        >
            <Menu
            items={menuItems}
            />
        </Drawer>
    )

    return (
        <Row justify={'space-between'} align={'middle'}>  
            <Col xs={2} md={2} className='logo'><Link to='/'><img src="/vite.svg" alt="" /></Link></Col>
            <Col xs={16} md={10}>
                <SearchComponent/>
            </Col>
            <Col xs={0} md={10}>
                {menuHorizontal}
                {menuVertical}
            </Col>
            <Col xs={2} md={2} className='show-on-mobile'><MenuOutlined id="menu-icon" onClick={showDrawer}/></Col>
        </Row>
    )
}