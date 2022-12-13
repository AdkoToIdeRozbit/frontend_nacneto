import { useState } from 'react'

export default function About() {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  return (
    <>
      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}/>

        <input
          type="file"
          value={selectedFile}
          onChange={(e) => setSelectedFile(e.target.files[0])}/>
      </form>
    </>
  );
}
