import React, { useState } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const fetchItemByField = async (fieldName, fieldValue) => {
        try {
            const q = query(collection(db, 'user'), where(fieldName, '==', fieldValue));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const docSnapshot = querySnapshot.docs[0];
                console.log('User data:', docSnapshot.data());
                console.log('Document ID:', docSnapshot.id); // Get the document ID
                localStorage.setItem('token', docSnapshot.id);
                navigate('/'); // Redirect to dashboard on success
            } else {
                console.log('User not found!');
            }
        } catch (error) {
            console.error('Error fetching user by email:', error);
        }
    };

    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">LOGIN</h1>

                <div>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={() => fetchItemByField('email', email)}
                        >
                            Submit
                        </button>
                    </div>
                </div>

                <div className="todo-content">...</div>
            </div>
        </section>
    );
}

export default Login;
