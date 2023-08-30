import React from 'react'
import Mainheading from '../components/Main-Heading/Main-heading'
import './styles/messageboard.css'
import Select from '../components/Select/Select'
import Select2 from '../components/Select2/Select2'
import Button from '../components/Button'
import sendImgWhite from './images/send-white.png'
import { useState } from 'react'

const MessageBoard = () => {
    const [groupData, setGroupData] = useState([]);

    const handleChecked = (e) => {
        let data = e.target.checked;
        if(data === true){
    
            setGroupData(prevItems => [...prevItems, e.target.id]);
            console.log(groupData, "de");
    
        }else{
    
            let index = groupData.indexOf(e.target.id);
            groupData.splice(index, 1);
    
        }
    
      }

  return (
    <div>
      <Mainheading name="Message Center" className="messagecenter-heading"/>
        <div className='message-board-div'>
            <div className="group-div">
                <Select name="Group" extraClass="fullheight" onChange={handleChecked}/>
            </div>
            <div className="food-selection-div">
                <Select2 name="Schedule" extraClass="fullheight" />
            </div>

        </div>
        <div className="send-button-div">
                <Button name="Send" className="send-button" imgName='send-img' imgSrc={sendImgWhite} />
        </div>
    </div>
  )
}

export default MessageBoard;
