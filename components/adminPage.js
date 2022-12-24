
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function AdminPage(props) {
    const{name, email, role, passKeys, generateKey, handleClose, open, setOpen} = props


    
      




  return (<>
    You are {name} <br />logged in with the email {email} <br /> you are an {role} <br />
      <button onClick={() => signOut({callbackUrl : `/`})}>Sign out</button>
      
      <Link href='/createQuestion'><a>
        Create Question
      </a></Link> 
      <Link href='/questionBank'><a>
        Question Bank
      </a></Link>
      <Link href='/createQuiz'><a>
        Create Quiz
      </a></Link>
      <Stack spacing={2} direction="row">
      <Button variant="contained" onClick={generateKey} size='small'>
        Generate key 
      </Button>
      
    </Stack>
     <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You are about to generate Passkeys for Examiners and Chief Examiners registrations"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to generate a new set of keys. <br/>
           Please note that the existing validation keys remain valid
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(false)} autoFocus>Cancel</Button>
          <Button onClick={handleClose} >
            Yes 
        </Button>
        </DialogActions>
      </Dialog>
      



      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            Pass Keys
          </TableRow>
        </TableHead>
        <TableBody>
         
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Chief Examiner
              </TableCell>
              {passKeys.chiefExaminerPass.map((pass, index) => (
              <TableCell align="right" key={index}>{pass}</TableCell>
              ))}
              
            </TableRow><TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Examiner
              </TableCell>
              {passKeys.examinerPass.map((pass, index) => (
              <TableCell align="right" key={index}>{pass}</TableCell>
              ))}
              
            </TableRow>

         
        </TableBody>
      </Table>
    </TableContainer>





      
    </>
  )
}

export default AdminPage