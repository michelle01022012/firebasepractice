import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

async function updatePost() {
   const hardcodedId = "3fCvn7u3QtcGKj06F0B8";
   const postRef = doc(db, "posts", hardcodedId);
   const post = await getPostById(hardcodedId);
   console.log(post);
   const newPost = {
        ...post,
        title: "Land a $300k job"
    };
    updateDoc(postRef, newPost);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.toJSON());
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  function createPost() {
    if (!user) {
      alert("Please log in first");
      return;
    }
    const post = {
      title: "Finish Firebase Section",
      description: "Do Front End Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid),
    );
    const querySnapshot = await getDocs(postCollectionRef);
    console.log(querySnapshot.docs);
  }

    function register() {
    createUserWithEmailAndPassword(auth, "myemail@email.com", "test123")
      .then((userCredential) => {
        console.log(userCredential.user.toJSON());
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  console.log({ user });

  function login() {
    signInWithEmailAndPassword(auth, "myemail@email.com", "test123")
      .then(({ user }) => {
        console.log(user.toJSON());
        setUser(user.toJSON());
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser(null);
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "Loading..." : user?.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default App;