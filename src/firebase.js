
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { EmailAuthProvider } from "firebase/auth/web-extension";
import { toast } from "react-toastify";



const firebaseConfig = {
  apiKey: "AIzaSyAk0CSlbi8ck91_BwRffueIBpap6Gwobws",
  authDomain: "netflix-clone-a18d8.firebaseapp.com",
  projectId: "netflix-clone-a18d8",
  storageBucket: "netflix-clone-a18d8.firebasestorage.app",
  messagingSenderId: "120234668810",
  appId: "1:120234668810:web:03b41ec19d3afdbd7c00f3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async(name,email,password)=>{
    try{
        const response = createUserWithEmailAndPassword(auth,email,password)
        const user =  response.user
        await addDoc(collection(db,"User"),{
            uid : user.uid,
            name,
            email,
            authProvider: "local"
        })
    }
    catch(error){
        toast.error("Invalid Credentials")

    }

}

const login = async(email,password)=>{
    try{
         await signInWithEmailAndPassword(auth,email,password)

    }
    catch(error){
        toast.error("Invalid Credentials")

    }

}

const logout = ()=>{
    signOut(auth)
}

export{signup,login,auth,logout,db}























































// const auth = getAuth(app)
// const db = getFirestore(app)


// const signup = async(name,email,password)=>{
//     try{
//         const response = await createUserWithEmailAndPassword(auth,email,password)
//         const user = response.user
//         await addDoc(collection(db,"user"),{
//             uid: user.uid,
//             name: name,
//             authProvider: "local",
//             email:email
//                 })
//     }
//     catch(error){
//         console.log(error)
//        toast.error("Invalid Credentials")
//     }
// }

// const login = async(email,password)=>{
//     try{
//          await signInWithEmailAndPassword(auth,email,password)
//     }
//     catch(error){
//         console.log(error)
//        toast.error("Invalid Credentials")

//     }
// }

// const logout = ()=>{
//     signOut(auth)
// }


// export {auth,db,signup,login,logout}