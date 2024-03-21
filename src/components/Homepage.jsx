import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { adddetailsapi, edituserprofileapi } from '../backend/apis';


function Homepage() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const[img,setimg]=useState("")


  const [userdata,setuserdata]=useState({
    username:"",
    password:"",
    newPassword:""
})

useEffect(()=>
{
    const users=JSON.parse(sessionStorage.getItem('alreadyuser'))
    setuserdata({
      ...userdata,
      username: users?.username,
      password: users?.password
    });
})

  const[adddata,setadddata]=useState({
    name:"",
    email:"",
    address:"",
    gender:"",
    password:"",
    dob:"",
    phone:"",
    qualification:"",
    photo:""
  })

  const nav=useNavigate()

  const logout=async()=>
  {
    sessionStorage.removeItem("alreadyuser")
    nav('/')
  }

  
  useEffect(()=>
  {
    if(adddata.photo)
    {
      setimg(URL.createObjectURL(adddata.photo))
    }
  },[adddata.photo])
  

  const handlepublish=async(e)=>
  {
    e.preventDefault()
    try {
  const{name,email,address,gender,password,dob,phone,qualification,photo}=adddata
console.log(adddata);
    if(!name || !email || !address || !gender || !password || !dob || !phone || !qualification || !photo)
    {
      alert('please fill the form completely');
    }
    else
    {
      const body=new FormData()

      body.append("name",name)
      body.append("email",email)
      body.append("address",address)
      body.append("gender",gender)
      body.append("password",password)
      body.append("dob",dob)
      body.append("phone",phone)
      body.append("qualification",qualification)
      body.append("photo",photo)

        const header={
          "Content-Type":"multipart/form-data",
        }
        const res=await adddetailsapi(body,header)
        console.log(res);
        if(res.status===200)
        {
          alert("Details added successfully")
          setTimeout(()=>
          {
              nav('/')
          },1000)
        }
        else
        {
          console.log(res.response.data);
        }
      
    }  
} catch (error) {
  console.log(error);
}
    
    
  }

  const reset=async()=>
  {
   setadddata({
    name:"",
    email:"",
    address:"",
    gender:"",
    password:"",
    dob:"",
    phone:"",
    qualification:"",
    photo:""
   })
  }

  const savedetails = async (e) => {
    e.preventDefault()
     const {username,password,newPassword}=userdata
     if(!username || !password || !newPassword)
     {
       alert('please fill completely')
     }
     else
     {
       try {
         const body=userdata
      
       const result=await edituserprofileapi(body)
       console.log(result);
       if(result.status===200)
       {
         alert('updated')
         sessionStorage.setItem("alreadyuser",JSON.stringify(result.data))
       }
       else
       {
         console.log(result.response.data);
       }
       } catch (error) {
         console.log(error)
       }
       
     }
   }
   
  return (
    <>
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home"><h3>Welcome</h3></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            <button className='btn btn-secondary' type='button' onClick={handleShow1}><i class="fa-solid fa-key"></i> Change Password</button>
              </Navbar.Text>
              <Navbar.Text className='ms-5'>
              <button className='btn btn-secondary' type='button' onClick={logout}><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className='d-flex justify-content-center align-items-center mt-5'>
            <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1710962957~exp=1710966557~hmac=ecbbf31091b7b2d9f63a1eaf2b0ed334c02bf42962ee37e21054d9714cd6fcac&w=740" height={'300px'} />
            <Card.Body className='text-center'>
                <Card.Title >Complete Your Profile</Card.Title>
                <Card.Text >
                Fill the form to complete your profile
                </Card.Text>
                <Button variant="primary" onClick={handleShow}>Click Here</Button>
            </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                <Modal.Title>Enter your details</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <div className=" d-flex justify-content-center align-items-center ">
                        <form className='d-flex justify-content-center align-items-center flex-column w-100'>

                    <div className='mt-3 d-flex justify-content-center align-items-center w-50'> <label>Name : </label><input type="text" className='form-control  ms-3 w-50' placeholder='Enter name' value={adddata.name} onChange={(e)=>setadddata({...adddata,name:e.target.value})}/></div>


                    <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>Email : </label><input type="email" className='form-control ms-3 w-50' placeholder='Enter email' value={adddata.email} onChange={(e)=>setadddata({...adddata,email:e.target.value})}/></div>

                    <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>Address :</label> <textarea className='form-control ms-3 me-3 w-50' placeholder='Enter Address' value={adddata.address} onChange={(e)=>setadddata({...adddata,address:e.target.value})}></textarea></div>

                    <div className='d-flex mt-4'>
                        <p>Gender :</p>
                        <div className='ms-4'>
                            <input type="radio" name='gender' value={'female'} onChange={(e)=>setadddata({...adddata,gender:e.target.value})}/>Female
                            <input type="radio" name='gender' value={'male'} className='ms-4' onChange={(e)=>setadddata({...adddata,gender:e.target.value})}/>Male
                            <input type="radio" name='gender' value={'other'} className='ms-4' onChange={(e)=>setadddata({...adddata,gender:e.target.value})}/>Other
                        </div>
                        </div>

                        <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>Password :</label> <input type="password" className='form-control ms-2 w-50 me-3' placeholder='Enter password' value={adddata.password} onChange={(e)=>setadddata({...adddata,password:e.target.value})}/></div>

                        <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>DOB :</label> <input type="date" className='form-control ms-4  w-50' placeholder='Enter password' value={adddata.dob} onChange={(e)=>setadddata({...adddata,dob:e.target.value})}/>
                    </div>

                    <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>Phone :</label> <input type="number" className='form-control ms-3 w-50' placeholder='Enter phone number' value={adddata.phone} onChange={(e)=>setadddata({...adddata,phone:e.target.value})}/>
                    </div>
                    <div className='mt-3 d-flex  justify-content-center align-items-center w-50'> <label>Qualification :</label> 
                    <select className='form-control ms-3 w-50 me-5' onChange={(e)=>setadddata({...adddata,qualification:e.target.value})}>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Higher secondary" >Higher secondary</option>
                    </select>
                    </div>

                    <label className='mt-3 d-flex justify-content-center align-items-center'>
                        Upload resume :
                        <input type="file" style={{display:'none'}} onChange={(e)=>setadddata({...adddata,photo:e.target.files[0]})}/>
                        <img src={img?img:"https://cdn-icons-png.flaticon.com/512/6614/6614677.png"} width={'60px'} alt="" />
                    </label>
                    </form>
                        </div>
            
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                <Button variant="secondary" onClick={reset}>
                    Reset
                </Button>
                <Button variant="primary" onClick={handlepublish}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
        </div>

        <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className='d-flex justify-content-center align-items-center flex-column w-100 mt-3'>

            <input type="text" className='form-control w-50' placeholder={userdata.password} value={userdata.password} />

            <input type="password" className='form-control mt-5 w-50' placeholder='Enter new password' value={userdata.newPassword} onChange={(e)=>setuserdata({...userdata,newPassword:e.target.value})}/>

            </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={savedetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Homepage
