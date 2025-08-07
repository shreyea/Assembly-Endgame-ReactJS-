import { useState } from 'react'
import {languages} from './components/lang.js'
import clsx from 'clsx'
import './App.css' 
import {getFarewellText} from './components/outmess.js'
import {words} from  './components/words.js'
import Confetti from 'react-confetti'

function App() {
  function getRandomWords(){
     const randomIndex = Math.floor(Math.random() * words.length)
    
    return words[randomIndex].toUpperCase()
  }

   const [currentword, setCurrentWord] = useState(() => getRandomWords());
   const [guessLetters, setGuessLetters] = useState([]);
   const wrongcount= guessLetters.filter(letter => !currentword.includes(letter)).length
   const iswon =currentword.split('').every(letter => guessLetters.includes(letter))
   const lastGuessedLetter = guessLetters[guessLetters.length-1]
   const isLastGuessIncorrect = lastGuessedLetter && !currentword.includes(lastGuessedLetter)
   console.log(currentword)

   function addGuessLetter(letter) {
    setGuessLetters(prevLetters => 
      prevLetters.includes(letter) ?
          prevLetters:
         [...prevLetters, letter] )
    };
  
    const language = languages.map((language ,index) => {
      const islost=index<wrongcount
      return(
      
      <span className= "language " style={{
        backgroundColor: islost ? "rgb(83, 83, 83)" : language.backgroundColor,
        color: language.color
        }} key={language.name}>{language.name}</span> )

    });
   
    const letter = currentword.split('').map((letter, index) => (
      <span key={index} className="letter">
        {guessLetters.includes(letter) ? letter.toUpperCase():""}
      </span>
))

  const keypad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, index) => {
    const isguessed=guessLetters.includes(letter)
    const iscorrect= isguessed && currentword.includes(letter)
    const iswrong= isguessed && !currentword.includes(letter)
  
    const className=clsx({
      correct:iscorrect,
      wrong:iswrong

    })

return(
    <button disabled={iswon || wrongcount >= 8}
    onClick={() => addGuessLetter(letter)} 
    key={index} 
    className={className}>{letter}
    </button>
  );
}) 

  function reset(){
   setCurrentWord(getRandomWords())
   setGuessLetters([])
  
  }



  return (
    <> 
    <div className="container">
       <h1 className="title">Assembly:Endgame</h1>
      <p className="instructions">Guess the word to save the programming languages!</p>
    
      <section className="win-section">
       {iswon && <div className='win-box'> <p className="win-message">You Win! </p></div>}
       {iswon && <Confetti/>}
       {wrongcount>=8 && 
       <>
       <div className="lost-message1-box">
        <p className='lost-message1'>You Lost!</p>
        <h1 className='lost-message2'>Better Learn Assembly !!</h1>

       </div>
       </>
       }
       {(isLastGuessIncorrect && wrongcount<8 )&& <div className='lang-message'>{getFarewellText(languages[wrongcount-1].name)}</div>}
      </section> 
      {wrongcount< 8 && (
      <>
      <div className='lang'>
        {language}
      </div>
      <section className="current-word-section">
        {letter}
      </section>
      <div className="box-container">
      <div className="keypad"> 
            {keypad}
      </div>
      </div>
      </>)}
      {  wrongcount >=8 && ( 
        <>
          <p className='guess-word'>Word is: {currentword}</p>
          
          <button onClick={reset} className="another-try">Another Try?</button>
          
        </>
      )} 
      { iswon &&
      <button onClick={reset} className="new-game">New Game</button>}
    </div>
    </>
  )
}

export default App
