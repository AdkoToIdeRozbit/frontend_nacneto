import React from 'react'
import  {useState} from 'react'
import { Viewer,Worker } from '@react-pdf-viewer/core';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import checkmark from "../svgs/checkmark.svg"
import '@react-pdf-viewer/core/lib/styles/index.css';
import UserInput from './UserInput';

function PdfViewer(props) {
  const rotatePluginInstance = rotatePlugin();
  const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance;

  const [image, setImage] = useState('')

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

  const send_pdf = event => {
    fetch(`/api/aspdf/`, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(props.pdf)
        }).then(response => {
          if(response.ok){
            response.json().then(json => {
            console.log(json)
            setImage(json.image)
        })
      }
    })
  }
  
  return (
    <>
      { !image && props.pdf && 
      <div className='PDF_VIEWER'>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingTop: '30px' }}>
          <RotateForwardButton />
          <RotateBackwardButton/>
          <div className='rpv-core__minimal-button'>
            <img src={checkmark} alt='logo' className="rpv-core__icon" onClick={send_pdf}/>
          </div>
        </div>

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
          { props.pdf &&  <Viewer fileUrl={props.pdf} plugins={[rotatePluginInstance]} /> }
        </Worker>
      </div>}

      {/* { image && <UserInput image={image}/> }  */}
    </>
  )
}

export default PdfViewer
