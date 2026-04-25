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

  async function getPostById() {
    const hardcodedId = "3fCvn7u3QtcGKj06F0B8";
    const postRef = doc(db, "posts", hardcodedId);
    const postSnap = await getDoc(postRef);
    const post = postSnap.data();
    console.log(post);
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid),
      console.log(docs);
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
      <Button onClick={getPostByUid}>Get Post By Uid</Button>
    </div>
  );
}

export default App;