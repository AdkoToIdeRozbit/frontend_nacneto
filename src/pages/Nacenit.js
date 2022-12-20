import { useState, useRef } from 'react'
import PdfViewer from './PdfViewer'

export default function About() {
  const [image, setImage] = useState('')
  const [pdf, setPdf] = useState('')
  const [ fileName, setFileName] = useState(null)

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
    
        // let send_pdf = async () => {
        //   return fetch(`/api/aspdf/`, {
        //     method:'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(result)
        //   }).then(response => {
        //     if(response.ok){
        //       response.json().then(json => {
        //         setImage(json.image)
        //         console.log(json['ponuka'])

        //       })
        //     }
        //   })
        // }
        // send_pdf()
        setPdf(result)

      }
    })
  }

  return (
    <>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <div className='input_div' onClick={handleClick}>Vyber pdf</div>
      { fileName && <p className="filename">{fileName.name}</p> }
      { image && <img src={`data:image/jpeg;base64,${image}`} alt="A" /> }

      <PdfViewer pdf={pdf}/>

    </>

  )
}
