import React from 'react'
import { useState } from 'react'
import Input from './Input'
import './Form.css'
import {useNavigate} from 'react-router-dom'


const Form : React.FC = () => {
  const numQuestion = 10
  // create an array of numQuestion size
  const [questions, setQuestions] = useState(Array(numQuestion).fill({
    inputs: '',
  }))

  const navigate = useNavigate()

  const updateQuestion = (idx: number, value: string) => {
    // update the state by changing the value of the question at idx
    setQuestions((prev) =>{
      // copy the previous state
      const copy = [...prev]
      // update the value of the question at idx
      copy[idx] = {
        inputs: value
      }
      // return the copy
      return copy
    })
  }

  // Submit handler
  const submitHandler = () => {
    // navigate to the comic page
    navigate('/comic', {state: {questions: questions}})
  }

  return (
    <div className='Form'>
      {questions.map((quest, i) => {
        return (
          <Input key={i} idx={i} value={quest.inputs} setQuestion={updateQuestion} numQuestion={numQuestion} submitHandler={submitHandler}/>
        )
      })}
    </div>
  )
}

export default Form