import React from 'react'
import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut, getSession} from "next-auth/react"
import { useEffect, useState } from "react";
import Link from "next/link"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';
import useSWR from "swr";
import axios from 'axios'
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import DrawerAppBar from './appBar';




function ChiefExaminerPage(props) {
    const{name, email, role, quiz, attemptedQuiz, display, setDisplay, attempts, router, getAttemptedQuiz, 
    submitManualExam, onDelete, setManualExam, manualExam, navItems} = props
        const introduction = <div>
        Welcome {name} ; you are a {role} with email: {email}
    </div>
     const nav = [
      <Link href='/createQuestion'><a>
      Create Question
    </a></Link>,
    <Link href='/questionBank'><a>
      Question Bank
    </a></Link>,
    <Link href='/createQuiz'><a>
      Create Quiz
    </a></Link>,
    <button onClick={() => signOut({callbackUrl : `/`})}>Sign out</button>
     ]

     console.log(attempts)

  return (
    <div>
        <DrawerAppBar introduction={introduction} navItems={nav}/>
   
        {
    quiz.map(({_id, quizName}, index)=>{
      return(<div key={_id}>
      <h2> Quiz Title {quizName}</h2>
      
      <button type='button' onClick={() => onDelete(_id)}>DELETE QUIZ</button>
      <button type='button' onClick={() => router.push(`createdQuiz/${_id}`)}>Update Quiz</button>
      <Badge badgeContent={attemptedQuiz.filter((element)=> element.quizId ==_id).length} color="primary">   
      <button type='button' onClick={()=>getAttemptedQuiz(_id) }>Get the Quiz Attempted</button>
      </Badge>
      <Divider />
    </div>  )
    })
   

   }
<button onClick={() => setDisplay(!display)}>Enter Manual exam score</button>
{ display &&

<div className='App'>
      <div className='container'>
        <p>Enter the scores of the paper conducted exams</p>
        <input        
          type='text'
          placeholder='Exam title'
          onChange={(e) =>
            setManualExam({ ...manualExam, examTitle: e.target.value })
          }
        />
        <input
          name = 'score'
          type='number'
          placeholder='Enter Score'
          onChange={(e) =>
            setManualExam({ ...manualExam, score : e.target.value })
          }
        />
        <input          
          type='email'
          placeholder='email'
          onChange={(e) =>
            setManualExam({ ...manualExam, email: e.target.value })
          }
         />
        
        <button onClick={() => submitManualExam()} disabled>Submit Manual exam score</button>
      </div>
    </div>}


    
   

   { attempts &&
     attempts.map(({_id, attemptedQuiz}, index)=>{
      const {candidate, score} = attemptedQuiz
      return(<div key={_id}>
      <h4>Candidate name: {candidate.name}</h4>
      <h4>Candidate email: {candidate.email}</h4>
      <h4>Candidate score: {score ? score: '0%' }</h4>  
      <Divider />   
    </div>  )
    })
   }
    </div>
  )
}

export default ChiefExaminerPage