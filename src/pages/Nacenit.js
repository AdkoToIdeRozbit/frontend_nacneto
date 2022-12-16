import { useState, useRef } from 'react'

export default function About() {
  const [ setFile ] = useState(null)
  const [ fileName, setFileName ] = useState(null)

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
        console.log(result)
        setFileName(fileObj)
    
        let send_pdf = async () => {
          fetch(`/api/aspdf/`, {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(result)
          })
        }
        
        send_pdf()

      }
    })

  };

  return (
    <>
      <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />

      <div className='input_div' onClick={handleClick}>Open file upload box</div>
      { fileName && <p className="filename">{fileName.name}</p> }
    </>
  );

  // return (
  //   <>
  //     <form>
  //       <input
  //         type="file"
  //         value={selectedFile}
  //         onChange={(e) => setSelectedFile(e.target.files[0])}/>
  //     </form>
  //   </>
  // );
}
