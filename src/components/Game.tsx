import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import eye1 from '../resources/image/eye1.png'
import eye2 from '../resources/image/eye2.png'
import eye3 from '../resources/image/ete3.png'
import eye4 from '../resources/image/eye4.png'
import { Button, FormHelperText } from "@mui/material";
import { toast } from "react-toastify";

function Game(){
    const [isLoading, setIsLoading] = useState(true)
    const [complete, setComplete] = useState(false)
    const [herAnswer, setHerAnswer] = useState('')
    const [selectedOption, setSelectedOption] = useState('')
    const [helperText, setHelperText] = useState('Choose wisely')
    const [OwO, setOwO] = useState(false)

    useEffect(() => {

        async function fetchData(){
          await getDocs(collection(db, 'game')).then((response: any) => {
    
            let tempEvents = response.docs.map((val: { data: () => any; },key: any)=>({data: val.data()}))
    
            for(let i=0; i<tempEvents.length; i++){
              if(tempEvents[i].data.answer !== undefined){
                setComplete(true)
                setHerAnswer(tempEvents[i].data.answer)
              }
            }
            setIsLoading(false)
        });}
    
        fetchData()
        
        
      },[OwO])


      //handle event when the radio buttons are clicked
      const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption((event.target as HTMLInputElement).value);

        if (selectedOption === 'eye1') {
          setHelperText('Sure bo?');
        } else if (selectedOption === 'eye2') {
          setHelperText('I think you are right');
        }else if (selectedOption === 'eye3') {
          setHelperText('Dont ask me, I dont know');
        }else if (selectedOption === 'eye3') {
          setHelperText('Huh? UwU OwO');
        }
      };


      //handle event when the submit button is pressed
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dbRef = collection(db, "game")
    
        if(selectedOption === undefined){
          alert('Please select an option')
        }
        else{
          const dataToStore = {
            answer: selectedOption
          }
          
          // eslint-disable-next-line no-restricted-globals
          if(confirm('Sure you want to submit?') === true){
            addDoc(dbRef, dataToStore).then(response => {
              toast.success("Answer submitted")
            })
            .catch(error => {
              console.log(error)
            })
          }

          setOwO(true)

        }
      };


      const checkAnswer = () => {
        if(herAnswer !== undefined){
          if(herAnswer === 'eye1'){
            return(
              <>
                <div>Your own eyes!!!</div>
                <img src={eye1}></img>
              </>
            )
          }

          if(herAnswer === 'eye2'){
            return(
              <>
                <div>My good friend's eye!!!</div>
                <img src={eye2}></img>
              </>
            )
          }

          if(herAnswer === 'eye3'){
            return(
              <>
                <div>Doggo's eyes!!!</div>
                <img src={eye3}></img>
              </>
            )
          }
          
          if(herAnswer === 'eye4'){
            return(
              <>
                <div>Wah, you actually selected correctly!!!</div>
                <div>Think wisely about your prize</div>
                <img src={eye4}></img>
              </>
            )
          }
        }
      }


      const content = () => {
        if(isLoading === false){
          if(complete === false){
            return(
              <>
              <div>
                <h1>Wei Ling, WELCOME TO THE GAME!!!!!</h1>
                <h2 style={{color: 'red'}}>Do you know your love well enough? Today you shall be exposed!</h2>
              </div>

              <div>
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Choose</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="eye1"
                      name="radio-buttons-group"
                      onChange={handleRadioChange}
                    >
                      <div>
                        <FormControlLabel value="eye1" control={<Radio />} label="Isit me?"></FormControlLabel>
                        <img src={eye1} style={{width: '50px', height: 'auto'}}/>
                      </div>
                      <div>
                        <FormControlLabel value="eye2" control={<Radio />} label="Not me"></FormControlLabel>
                        <img src={eye2} style={{width: '50px', height: 'auto'}}/>
                      </div>
                      <div>
                        <FormControlLabel value="eye3" control={<Radio />} label="Confirm is me"></FormControlLabel>
                        <img src={eye3} style={{width: '50px', height: 'auto'}}/>
                      </div>
                      <div>
                        <FormControlLabel value="eye4" control={<Radio />} label="My Brother"></FormControlLabel>
                        <img src={eye4} style={{width: '50px', height: 'auto'}}/>
                      </div>
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                    <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                      Submit Answer
                    </Button>
                  </FormControl>
                </form>
              </div>
              </>
            )
          }

          else{
            return(
              <div>
                <h1>Well Done WeiLing!!!</h1>
                <h2>You have Selected: &nbsp;{checkAnswer()}</h2>
              </div>
            )
          }
        }
      }


    return(
      <>
      {content()}
        
      </>
    )
}

export default Game