import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
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
      title: "Land a 100K job",
      description: "Finish Front End Simplified",
      uid: user.uid,
      };
    addDoc(collection(db, "posts"), post)
    }

    async function getAllPosts() {
      const { docs } = await getDocs(collection(db, "posts"));
      const posts = docs.map(elem => ({...elem.data(), id: elem.id}));
      console.log(posts);
    }
      
    async function getPostById() {
      const hardcodedId = "3fCvn7u3QtcGKj06F0B8";
      const postRef = doc(db, "posts", hardcodedId);
      const postSnap = await getDoc(postRef);
      const post = postSnap.data();
      console.log(post);
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
       <button onClick={getAllPosts}>Get All Posts</button>
       <button onClick={getPostById}>Get Post By Id</button>
    </div>
  );
}
export default App;
