import { Link } from 'react-router-dom'

const Header = () => {

// let hello = "Im React.JS from"

 return(

    <header> 
           <Link to="/home" className='headerItem'> Home </Link> 
           <Link to="/about" className='headerItem'> About </Link> 
           <Link to="/contact" className='headerItem'> Contact </Link> 
           <Link to="/login" className='headerItem'> Login </Link> 


           {/* <h1> { hello } WD74P </h1> */}
    </header>

   )
  

}

export default Header;