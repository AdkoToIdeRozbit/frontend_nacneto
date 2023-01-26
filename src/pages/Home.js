import { CustomLink } from "../Components/Navbar"
import svg1 from "../svgs/1.svg"
import svg2 from "../svgs/2.svg"
import svg3 from "../svgs/3.svg"

export default function Home() {
  return(
    <div>
      <h1>Nechajte umelú inteligenciu naceniť Vaše projekty.</h1>

      <div className="zacni">
        <CustomLink to="/nacenit">Začni naceňovať</CustomLink> 
      </div>

      <p>Ako to funguje</p>

      <div className="projekty_svg">
         <div className="card_container"><a href={svg2} target="_blank" rel="noreferrer"><img src={svg2} alt='logo' className="card"/></a></div> 
         <div className="card_container"><a href={svg1} target="_blank" rel="noreferrer"><img src={svg1} alt='logo' className="card"/></a></div> 
         <div className="card_container"><a href={svg3} target="_blank" rel="noreferrer"><img src={svg3} alt='logo' className="card"/></a></div> 
      </div>



    </div>
  ) 
}
