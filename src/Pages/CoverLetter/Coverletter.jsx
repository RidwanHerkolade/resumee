import { useState } from "react"
import Covercom from "../../Component/CoverCom/Covercom"
const Coverletter = () => {
 const [isInput, setIsInput] = useState({ 
     title: '',
     companyName: '',
     textArea: '',
 })
 const handleChange = (event) => {
  const {name, value} = event.target
  setIsInput((prev) => {
      return{
          ...prev,
          [name]: value
      }
  })
}
  return (
    <div className="w-full h-[calc(100vh-4.4rem)]">
        <Covercom isInput={isInput} setIsInput={setIsInput} handleChange={handleChange}/>
    </div>
  )
}

export default Coverletter