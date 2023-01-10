import { useState, useRef} from 'react'
// import PdfViewer from '../Components/PdfViewer'
import UserInput from '../Components/UserInput';
import test from "../svgs/test.png"

function About() {
  const [pdf, setPdf] = useState('')
  const [fileName, setFileName] = useState(null)

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  }

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      cb(null, reader.result)
    }
    reader.onerror = function (error) {
      cb(error, null)
    }
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) return;
    
    if(fileObj.type !== 'application/pdf'){
      alert('Prosím vložte PDF súbor')
      return
    }
    
     fileToBase64(fileObj, async (err, result)  => {
      if (result) {
        setFileName(fileObj)
        setPdf(result)
      }
    })
  }

  return (
    <>
      {/* <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <div className='input_div' onClick={handleClick}>Vyber pdf</div>
      { fileName && <p className="filename">{fileName.name}</p> } */}

      {/* <PdfViewer pdf={pdf}/> */}

      <UserInput image={test}/>
    </>
  )
}

export default About
