import { useEffect, useState } from "react";
import apiRequest from "../datafetch/apiRequest";
import { useNavigate } from "react-router-dom";

const About = () => {

    const [users, setUsers] = useState('');
    const navigate = useNavigate();

    useEffect(()=> {

        const fetchItems = async () => {
            try{
             const response = await fetch('http://localhost:5000/all-users');
             const listItems = await response.json();

             console.log(listItems);
             setUsers(listItems);
     
            }catch(err){
             console.log('error : ' + err.stack)
     
            }finally{
             console.log('done on processing')   
            }
     
         } //end of function

         fetchItems();


    }, []) //onetime load

    const handleDelete = async (id)=>{

      console.log('delete:' + id);
      const newList =  users.filter( (u)=> u.id !== id )
      setUsers(newList);  
    
      const deleteObj = { 
        method:'DELETE'
    }
      const result = await apiRequest('http://localhost:5000/delete-user/'+id, deleteObj);

    }

    const handleAdd = async (id)=>{
        console.log('add fcn: ' + id);
        navigate('/add-user');
    }
    
    const handleUpdate = async (id)=>{
        console.log('update fcn: ' + id);
    }
    
    const handleSelect = async (id)=>{
        console.log('Select fcn: ' + id);
    }

    return(

        <div className="About">

            <table border={{ border: 1}}>
                <tr>
                    <td>Id</td>
                    <td>Username</td>
                    <td>Password</td>
                    <td>Admin Account?</td>
                    <td></td>
                </tr>

                { (users.length > 0) ? (

                    users.map( (u)=> (

                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.username}</td>
                            <td>{u.password}</td>
                            <td>{u.isAdmin}</td>
                            <td>
                                <button onClick={ ()=> handleDelete(u.id) }>Delete</button> 
                                &nbsp;    
                                <button onClick={ ()=> handleAdd(u.id) }>Add</button>
                                &nbsp;    
                                <button onClick={ ()=> handleUpdate(u.id) }>Update</button>   
                                &nbsp;    
                                <button onClick={ ()=> handleSelect(u.id) }>Select</button>   
                            </td>
                        </tr>
                    )  )
                    ) : ( <p>list empty</p> ) 
                }

            </table> 
           
            <button>Click Me</button>
        </div>

    )

}

export default About