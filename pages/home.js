
import { useSession, signIn, signOut, getSession} from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import Link from "next/link"
import clientPromise from "../lib/mongodb";
import { useRouter } from 'next/router';
import Divider from '@mui/material/Divider';
import AdminPage from "../components/adminPage";
import ChiefExaminerPage from "../components/chiefExaminerPage";
import ExaminerPage from "../components/examinerPage";
import PromptBox from "../components/promptBox";
import ImageCarousel from "../components/imageCarousel";
import Header from "../components/header";


//import DrawerAppBar from '../components/appBar'



export default function Component({ user, passKeys, quiz, attemptedQuiz}) {

 
  const [open, setOpen] = useState();
  const router = useRouter()
  const [quizname, setQuizName] = useState('')
  const [quizpass, setQuizPass] = useState('')
  const [manualExam, setManualExam] = useState({})
  const [attempts, setAttempts] = useState(attemptedQuiz || [])
  const [display, setDisplay] = useState(true)
 let {data : session } = useSession()
 
 //const [quizAttempted, setQuizAttempted] = useState(attemptedQuiz)

 const isMounted = useRef(false)
 const query = router.query
 



 useEffect(async ()=>{
   
   if(isMounted.current === true){
    
    setAttempts(attemptedQuiz)

    

   }else{ isMounted.current = !isMounted.current} 
   
 }, [query]) 


 const getAttemptedQuiz = (quizId) =>{ 
  router.push(`?quizId=${quizId}`)
  

    // const attempt = attemptedQuiz.filter((element)=> element.quizId === quizId)
    // setAttempts(attempt)
    

 }


 const attemptQuiz = async () => {
  router.push(`attemptQuiz/${quizname}/${quizpass}`)
 }

 const submitManualExam = async () =>{
  await fetch(
    '/api/attemptedQuiz',
    { method : 'POST',
     body : JSON.stringify({
       manualExam
           }),
      headers: {
       'Content-Type': 'application/json'
     }
    })
    .then(router.push('/home'))
    .catch((e)=> {alert(e)}) 

    
    await fetch(
      `/api/createProfile/${manualExam.email}`,
     { method : 'POST',
      body : JSON.stringify({
       manualExam
      }),
       headers: {
        'Content-Type': 'application/json'
      }
     })
     .then(router.push('/home'))
     .catch((e)=> {alert(e)}) 
setManualExam({})
   
   alert('SUBMITTED') 
 }

 const handleClickOpen = () => {
  setOpen(true);
};


 let [passKey, setPassKey] = useState( {
  chiefExaminerPass: Array(3).fill(""),
  examinerPass: Array(3).fill(""),
  candidatePass: Array(3).fill("")
}
);

const onDelete= async (quizId)=>{
  const resp = await fetch(`/api/createQuiz/${quizId}`,{
    method : "DELETE",
  })
  const data = await resp.json()
  router.reload('home')
  
}


//generateKey function to generate Pass Keys, save to database and close the dialog box
const generateKey = async (e) => {

  //e.preventDefault()

  

  let chiefExaminerPass = passKey.chiefExaminerPass.map((e, index) => {
    return (passKey.chiefExaminerPass[index] = Math.random()
      .toString(36)
      .substring(2, 4));
  })
  let examinerPass = passKey.examinerPass.map((e, index) => {
    return (passKey.examinerPass[index] = Math.random()
      .toString(36)
      .substring(2, 4));
  })
  let candidatePass = passKey.candidatePass.map((e, index) => {
    return (passKey.candidatePass[index] = Math.random()
      .toString(36)
      .substring(2, 4));
  })
  setPassKey({
      chiefExaminerPass: chiefExaminerPass,
      examinerPass: examinerPass,
      candidatePass: candidatePass
    }
  );
  savePassKey()
}

const savePassKey = async (e) =>{


  const response = await fetch(
    `/api/createPassKey/${passKeys._id}`,
    { method : 'PUT',
     body : JSON.stringify(
        passKey
     ),
      headers: {
       'Content-Type': 'application/json'
     }
    })
    .then( 
      router.reload(window.location.pathname))
    .catch((e)=> {alert(e)})

}

const handleClose = () => {
  generateKey()
  savePassKey()
  setOpen(false);
}

//console.log(passKeys._id)
  
if (session && user.role === 'Admin') {

  return (
    <>
    <Header />
    {/* <ImageCarousel /> */}
<AdminPage name= {session.user.name} email={session.user.email} role={session.user.role} passKeys={passKeys}
generateKey={generateKey} handleClose={handleClose}  open={open} getAttemptedQuiz={getAttemptedQuiz}
 setOpen={()=>setOpen}
/>
      
    </>
  )
}
  else if (session && user.role === 'Chief Examiner') {
    return (
      <>
      <ImageCarousel />
   <ChiefExaminerPage  name= {session.user.name} email={session.user.email} role={session.user.role}
   quiz ={quiz} attemptedQuiz={attemptedQuiz} display={display} setDisplay={setDisplay} attempts={attempts}
   router={router} getAttemptedQuiz={getAttemptedQuiz} submitManualExam={submitManualExam} onDelete={onDelete}
   setManualExam={setManualExam} manualExam={manualExam}/>

      </>
    )
  }
  else if (session && user.role === 'Examiner') {
    return (
      <>
      <ImageCarousel />
   <ExaminerPage name= {session.user.name} email={session.user.email} role={session.user.role} />
      </>
    )
  }
  else if (session && user.role === 'Candidate'){
    return (
      <>
 
<PromptBox quizname={quizname} quizpass={quizpass} setOpen={setOpen} open={open} handleClose={handleClose} 
setQuizName={setQuizName} setQuizPass={setQuizPass}  attemptQuiz={attemptQuiz}/>
   
      You are {session.user.name} <br />logged in with the email {session.user.email} <br /> you are a {user.role} <br />
        <button onClick={() => signOut('/')}>Sign out</button>
        <button onClick={() => setOpen(true)}>Attempt Quiz</button>
        <button onClick={() => router.push("/paystack")}>Pay School Fees</button>
        <button onClick={() => setDisplay(!display)}>See attempted Quiz</button>
        { user.attemptedQuiz ? display &&
     user.attemptedQuiz.map(({_id, quizName, score, manualExam}, index)=>{
      return(<div key={_id}>
      <h4>Quiz title: {quizName || manualExam.examTitle}</h4>
     {<h4>Candidate score:{quizName ? (isNaN(score) || score === undefined ? '0%' : score)  : manualExam.score}</h4> }
    
      <Divider />   
    </div>  )
    }) : null
   }
      </>
    )
  }
 


  return (
    <>
    <ImageCarousel />
      You need to create profile before you proceed <br />
      <Link href='/createProfile'><a>
        Create Profile
      </a></Link>
    </>
  )
}

export async function getServerSideProps(context){
//  const ObjectId = require('mongodb').ObjectId;
  const{query} = context
  const quizId = query.quizId

  const {user} = await getSession(context)
  const client = await clientPromise;
  const db = await client.db("StudentPortal");  
  // const email = await session.user.email
  // const users = await db.collection("users").findOne({email : email})
  // const user = await JSON.parse(JSON.stringify(users))
  let passKeys = await db.collection("Pass Keys").findOne()
  passKeys = await JSON.parse(JSON.stringify(passKeys))
  let attemptedQuizes = await db.collection("AttemptedQuiz").find({'attemptedQuiz.quizId' : quizId }).toArray()
  const attemptedQuizs = await JSON.parse(JSON.stringify(attemptedQuizes))

  
  const question = (user.role==='Chief Examiner') ?   await db.collection("Quiz").find({author : user.email}).toArray() : null
  const quiz = await JSON.parse(JSON.stringify(question))
  return {
    props : {
      user ,  passKeys, quiz : quiz, attemptedQuiz: attemptedQuizs
    }
  }

if (!user) {
  return {
    redirect: { destination: "/" }
  }
}
}









// import Head from 'next/head'
// import clientPromise from '../lib/mongodb'
// import {signOut} from 'next-auth/react'

// export default function indexPage(){
//   return(
//   <button type='button' onClick= {()=>{signOut({callbackUrl : "/signin"})}}>Sign Out</button>)
// }


// export async function getServerSideProps(context) {
//   try {
//     // client.db() will be the default database passed in the MONGODB_URI
//     // You can change the database by calling the client.db() function and specifying a database like:
//     // const db = client.db("myDatabase");
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands
//     await clientPromise
//     return {
//       props: { isConnected: true },
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
// }
