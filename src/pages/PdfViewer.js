import React from 'react'
import { Viewer,Worker } from '@react-pdf-viewer/core';
import { rotatePlugin } from '@react-pdf-viewer/rotate';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import checkmark from "../svgs/checkmark.svg"
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewer(props) {
  const rotatePluginInstance = rotatePlugin();
  const getFilePluginInstance = getFilePlugin();

  const { RotateBackwardButton, RotateForwardButton } = rotatePluginInstance;
  const { DownloadButton } = getFilePluginInstance;

  return (
    <>       
        { props.pdf && <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingTop: '30px' }}>
          <RotateForwardButton />
          <RotateBackwardButton/>
          <div className='rpv-core__minimal-button'>
            <img src={checkmark} alt='logo' className="rpv-core__icon"/>
          </div>
          <DownloadButton />
        </div>}
        

        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
          { props.pdf &&  <Viewer fileUrl={props.pdf} plugins={[rotatePluginInstance, getFilePluginInstance]} /> }
       </Worker>
        
    </>
  )
}

export default PdfViewer
