import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import { Outlet } from 'react-router-dom'


const RootLayout = ({ children }) =>{

    return(
        <div className="root-main">
          
          <Header></Header>  

            <Content componentData = {children}> </Content>
            <Outlet />
            
          <Footer></Footer>
          
        </div>
    )
}

export default RootLayout
