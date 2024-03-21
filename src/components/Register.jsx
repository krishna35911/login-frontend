import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerapi } from '../backend/apis';

function Register() {
    const [userdata,setuserdata]=useState({
        name:"",
        address:"",
        gender:"",
        username:"",
        password:""
    })

    const navi=useNavigate()

    const register=async(e)=>
    {
        e.preventDefault()
        const{name,address,gender,username,password}=userdata
        console.log(userdata);
        if(!name || !address || !gender || !username || !password)
        {
            alert('Fill completely')
        }
        else
        {
            const result=await registerapi(userdata)

            if(result.status===200)
            {
                alert('succesfully registered')
                setuserdata({
                    name:"",
                    address:"",
                    gender:"",
                    username:"",
                    password:""
                })
                navi('/')
            }
            else
            {
                alert(result.response.data)
            }
        }
    }
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'>

    {/* Heading */}
    <h1 className='text-bold mt-3' style={{fontSize:'50px'}}>Sign Up</h1>
    
    {/*form*/}
  <form className='d-flex justify-content-center align-items-center flex-column w-100 mt-3'>

    <input type="text" className='form-control mt-4 w-50' placeholder='Enter name' value={userdata.name} onChange={(e)=>setuserdata({...userdata,name:e.target.value})}/>

    <textarea className='form-control w-50 mt-4' placeholder='Enter Address' value={userdata.address} onChange={(e)=>setuserdata({...userdata,address:e.target.value})}></textarea>

    <div className='d-flex mt-4'>
        <p>Gender :</p>
        <div className='ms-4'>
            <input type="radio" name='gender' value={'female'} onChange={(e)=>setuserdata({...userdata,gender:e.target.value})}/>Female
            <input type="radio" name='gender' value={'male'} className='ms-4' onChange={(e)=>setuserdata({...userdata,gender:e.target.value})}/>Male
            <input type="radio" name='gender' value={'other'} className='ms-4' onChange={(e)=>setuserdata({...userdata,gender:e.target.value})}/>Other
        </div>
    </div>

    <input type="text" className='form-control mt-4 w-50' placeholder='Enter username' value={userdata.username} onChange={(e)=>setuserdata({...userdata,username:e.target.value})}/>

    <input type="password" className='form-control mt-5 w-50' placeholder='Enter password' value={userdata.password} onChange={(e)=>setuserdata({...userdata,password:e.target.value})}/>

    <button className='btn btn-success mt-5 w-25' type='button' onClick={register}>Submit</button>

    <p className='mt-4'>Already a user ? <a href="/" style={{textDecoration:'none',color:'#D63484',fontWeight:'bold'}}>Login</a></p>

  </form>

</div>
  )
}

export default Register
