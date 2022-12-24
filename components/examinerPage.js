import React from 'react'

function ExaminerPage(props) {

    const{name, email, role} = props

  return (
    <div>
    You are {name} <br />logged in with the email {email} <br /> you are a {role} <br />
      <button onClick={() => signOut({callbackUrl : `/`})}>Sign out</button>
      <Link href='/createQuestion'><a>
        Create Question
      </a></Link>
      <Link href='/questionBank'><a>
        Question Bank
      </a></Link>
    </div>
  )
}

export default ExaminerPage