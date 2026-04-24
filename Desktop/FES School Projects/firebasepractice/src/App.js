import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
function App() {
   const [user, setUser] = React.useState({});
   const [loading, setLoading] = React.useState(true);

   function createPost() {
    const post = {
      title: "Land a 400K job",
      description: "Finish Front End Simplified"
      };
    addDoc(collection(db, "posts"), post)
    }

    function getAllPosts() {
      const data = await getDocs(collection(db, "posts"));
    }
      
   React.useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    setLoading(false);
    console.log(user);

    if (user) {
      setUser(user);
    } else {
      setUser({});
    }
  });
}, []);
   function register() {
    createUserWithEmailAndPassword(auth, 'myemail@email.com', 'test123')
    .then((user) => {
      console.log(user);
    })
      .catch((error) => {
        console.log(error);
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'myemail@email.com', 'test123')
    .then(({ user }) => {
      console.log(user);
      setUser(user);
    }) 
     .catch((error) => {
      console.log(error.message);
    })
  }

  function logout() {
    signOut(auth)
    setUser({});
  }

  return (
    <div className="App">
       <button onClick={register}>Register</button>
       <button onClick={login}>Login</button>
       <button onClick={logout}>Logout</button>  
       {loading ? 'Loading...' : user?.email}
       <button onClick={createPost}>Create Post</button>
    </div>
  );
}
export default App;
