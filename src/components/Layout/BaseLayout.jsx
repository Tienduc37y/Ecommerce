import { Outlet } from "react-router-dom"
import HeaderComponent from './Header'
import FooterComponent from './Footer'
import './layout.scss'
import { 
    Layout,
    theme,
    ConfigProvider
} from "antd"
const { Header, Sider, Content, Footer } = Layout;
export default function BaseLayout(){
    return (
        <>  
        <ConfigProvider
            theme={{
                components: {
                Layout: {
                    headerBg: 'white'
                },
                },
            }}
        >
            <Layout>
                <Header className="header"><HeaderComponent/></Header>
                <Content className="content">
                    <Outlet/>
                </Content>
                <Footer className="footer"><FooterComponent/></Footer>
            </Layout>
        </ConfigProvider>
        </>
    )
}