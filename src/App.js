
import React, {useEffect,useState} from 'react';
import db from './firebase-config';
import { collection, getDocs,addDoc, doc, deleteDoc ,getDoc, updateDoc} from 'firebase/firestore';
import './App.css'

function App() {
  const [user,setUser] = useState([])
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')

  const usersCollection = collection(db,"users")

    //Get users
  const getUser = async()=>{
    const data = await getDocs(usersCollection);
    await setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
  }

  //Adding data function
  const addUser =async (e)=>{
    e.preventDefault()
    const newUser = {name:name,email:email,phone:phone}
    await addDoc(usersCollection,newUser)
    setName('')
    setPhone('')
    setEmail('')
  }

  //update
  const updateUser = async(id,{name,email,phone}) =>{
    // setting field ID
    const userDoc = doc(db,'users',id)
    const data = {name:name,email:email,phone:phone}
    await updateDoc(userDoc,data)
    // alert(id)
  }

  const edit = async(id)=>{
    const userDoc = doc(db,'users',id)
    const data = await getDoc(userDoc);
    setEmail(data.data().email)
    setName(data.data().name)
    setPhone(data.data().phone)
  }

  //delete
  const deleteUser = async(id) =>{
    //setting field ID
    const userDoc = doc(db,'users',id)
    await deleteDoc(userDoc).then(()=>{
      console.log('Deleted')
    }).catch(err=>{
      console.log(err.message)
    })
  }

  useEffect(()=>{
    getUser()
    console.log('Reloaded')
  },[])

  return(
    <div className='App'>
      <h1>Firebase Firestore CRUD</h1>
      <form action="">
        <input type="text" placeholder='name' onChange={e=>setName(e.target.value)} value={name}/><br />
        <input type="email" placeholder='email' onChange={e=>setEmail(e.target.value)} value={email}/><br />
        <input type="text" placeholder='phone' onChange={e=>setPhone(e.target.value)} value={phone}/>

        <button type='submit' onClick={addUser}>Submit</button>
      </form>
      {
        user.map(data=>
          <div key={data.id}>
            <h2>{data.name}</h2>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <button onClick={()=>edit(data.id)}>Edit</button>
            <button onClick={()=>deleteUser(data.id)}>Delete</button>

            <button onClick={()=>updateUser(data.id,{name,email,phone})}>Update</button>
          </div>
          
        )
      }
    </div>
  )
}

export default App;

