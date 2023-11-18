import './Input.css'
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { VscSend } from "react-icons/vsc";
import { IoInformationCircle } from "react-icons/io5";
import Navbar from './Navbar';


type InputProps = {
    idx: number,
    value: string,
    setQuestion: (idx: number, value: string) => void,
    numQuestion: number,
    submitHandler: () => void
}


const Input = ({idx , value, setQuestion, numQuestion, submitHandler} : InputProps) => {
  return (
    <section className='Input' key={idx} id = {`question${idx}`}>
        <Navbar />
        <label htmlFor={`question_input${idx}`}><IoInformationCircle className='icon'/> Please provide prompt {idx+1} of {numQuestion}</label>
        <textarea name={`question${idx}`} id={`question_input${idx}`} value={value} onChange={(e) => setQuestion(idx, e.target.value)} placeholder='Start creating amazing comic by providing a prompt!'/>
        <div className="buttons">
        {/* Go to previous section if there */}
        {
            idx == 0 ? null : value && <a href={`#question${idx-1}`} className="button previous"> <GrLinkPrevious /> Previous</a>
        }
        {/* Go to next section if there */}
        {
            idx == numQuestion - 1 ? null : value && <a href={`#question${idx+1}`} className="button next">Next <GrLinkNext /></a>
        }
        
        {/* Submit button at the last page */}
        {
            idx == numQuestion - 1 ? value && <button className='button' onClick={submitHandler}>Submit <VscSend /></button> : null
        }
        </div>
    </section>
  )
}

export default Input