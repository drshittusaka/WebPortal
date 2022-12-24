import TextField from "@mui/material/TextField";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSession, signIn, signOut, getSession} from "next-auth/react"
import { useEffect, useState, useRef } from "react";
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





function PromptBox(props) {
    const{open, handleClose, setQuizName, setQuizPass, attemptQuiz, quizname, quizpass } = props
  return (
    <div>
          <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Enter the quiz details</DialogTitle>
  <DialogContent>
    <DialogContentText>
    Enter the quiz details
    </DialogContentText>
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Enter the Quiz Name to confirm your role"
      type="text"
      fullWidth
      variant="standard"
      name="quizName"
      value={quizname}
      onChange={(e)=>setQuizName(e.target.value)}
    />
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label="Enter the passkey to confirm your role"
      type="password"
      fullWidth
      variant="standard"
      name="quizPass"
      value={quizpass}
      onChange={(e)=>setQuizPass(e.target.value)}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={attemptQuiz}>Submit</Button>
  </DialogActions>
</Dialog>

    </div>
  )
}

export default PromptBox