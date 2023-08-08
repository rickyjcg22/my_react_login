
import Footer from './Footer'

import { Outlet } from 'react-router-dom'


const RootLayout = () =>{

    return(
        <div className="student-main">
          
          
            <Outlet />
          
          <Footer></Footer>
          
        </div>
    )
}

export default RootLayout
