import React, { useEffect, useState } from 'react'
import './Signup.css'
import { db } from '../../config/firebase'
import { addDoc, collection, getDoc, getDocs } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
function Signup() {
    const [name, setName] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState([]);
    const navigate = useNavigate()


   
    const addTodo = async(e) => {
        e.preventDefault(); 
        try {
            const addDocl = await addDoc(collection(db,"user"),{
                username: name,
                email,
                password
            })
            console.log(addDocl.id)
            
            navigate("/login")
        } 
        catch (error) {
            console.log(`error :- ${error}`)
        }       
    }




 
    /*const fetchPost = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "user"));
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            console.log(newData); // You can log newData directly here
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };*/


    
    useEffect(()=>{
        //fetchPost();
    }, [])


    
  return (
    <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                  SIGNUP
                </h1>
   
                <div>
   
                    <div>
                        <input
                            type="text"
                            placeholder="What do you have to do today?"
                            onChange={(e)=>setName(e.target.value)}
                        />

                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email}
                        />
                        
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            onChange={(e)=>setPassword(e.target.value)}
                            value={password}
                        />
                        
                    </div>
   
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addTodo}
                        >
                            Submit
                        </button>
                    </div>
   
                </div>
   
                <div className="todo-content"><Link to="/login">Please Login -</Link></div>
            </div>
        </section>
  )
}

export default Signup

