
import {useState} from 'react'

const Contact = () => {
        //reciever   //setter    
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [errorMessageFirstname, setErrorMessageFirstname] = useState('');
  const [errorMessageLastname, setErrorMessagelastname] = useState('');
  
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);
  

  const handleAddition = (e)=>{
  setNum1(parseInt(firstname));
  setNum2(parseInt(lastname));
  setResult(num1 + num2); 
  }
  
   const handleFormSubmit = (e)=>{
   e.preventDefault(); 

   console.log('firsname:' + firstname  + "  lastname:" + lastname)

   console.log('num firstname:' + firstname.length);
    
    if(firstname.length < 5){
        setErrorMessageFirstname('atleast more than 5 characters');
        return;
    }

    if(firstname !== 'Peter'){
        setErrorMessageFirstname('Invalid Firstname');
        return;
    } else {
        setErrorMessageFirstname('Correct Firstname');
    }
    
    if(lastname !== 'Smith'){
        setErrorMessagelastname('Invalid Lastname');
    } else {
        setErrorMessagelastname('Correct Lastname');
    }
    
   } 

    return(

        <div className="Contact">

            <div style={ {color:"green"} }> the result {result} </div>


            <div style={ {color:"red"} }> {errorMessageFirstname}  {errorMessageLastname} </div>

            Firstname: <b> {firstname} </b>  Lastname: <b> {lastname} </b>

            <form onSubmit={handleFormSubmit}>

                <label htmlFor="firstname">First name:</label><br />
                <input 
                type="text" 
                id="firstname" 
                name="firstname" 
                value={firstname} 
                onChange={ (e) => setFirstName(e.target.value) }
                />
                
                <br />
                <label htmlFor="lastname">Last name:</label><br />
                
                <input 
                type="text" 
                id="lastname" 
                name="lastname" 
                value={lastname} 
                onChange={ (e) => setLastName(e.target.value) }
                />
                

                <br /><br />
                <input type="submit" value="Submit" />
                <br />
                <button onClick={handleAddition}>Add</button>
            </form> 
        </div>

    )

}

export default Contact