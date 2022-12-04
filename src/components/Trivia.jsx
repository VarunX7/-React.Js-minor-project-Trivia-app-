import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'
import play from '../assets/sounds/play.mp3'
import correct from '../assets/sounds/correct.mp3'
import wrong from '../assets/sounds/wrong.mp3'

export default function Trivia({data, setStop, questionNum, setQuestionNum}) {

    const[question, setQuestion] = useState(null)
    const[selectAns, setSelectAns] = useState(null)
    const[className, setClassName] = useState(null)

    const [letsPlay] = useSound(play)
    const [correctAns] = useSound(correct)
    const [wrongAns] = useSound(wrong)

    useEffect(()=>{
        letsPlay()
    },[letsPlay])

    useEffect(()=>{
        setQuestion(data[questionNum-1])
    },[data, questionNum])

    const handleClick = (a)=>{
        setSelectAns(a)
        setClassName("answer active")
        setTimeout(()=>{
            setClassName(a.correct? "answer correct" : "answer wrong")
        }, 3000)

        setTimeout(()=>{
            if(a.correct){
                correctAns()
                setTimeout(()=>{
                    setQuestionNum((prev)=> prev+1)
                    setSelectAns(null)
                },1000)
            }
            else{
                wrongAns()
                setTimeout(()=>{
                    setStop(true)
                },1000)
            }
        }, 5000)
    }

  return (  
    <div className='trivia'>
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((a)=>(
            <div className={selectAns === a? className : "answer"} onClick={()=> handleClick(a)}>{a.text}</div>
        ))}
      </div>
    </div>
  )
}
