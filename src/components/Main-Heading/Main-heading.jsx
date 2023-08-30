import "./main-heading.css";

function Mainheading({name, className})  {
    return(
        <header className={`${className} main-heading`} >
            {name}
        </header>
    )
} 

export default Mainheading;