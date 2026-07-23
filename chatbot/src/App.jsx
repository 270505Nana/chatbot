import { useState } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css'

function App(){

  // variabel yg menyimpan informasi, yang berbentuk array dengan object >1
  // masih belum menggunakan state


  // return sebagai sebuah array, jadi sekarang kl array ini ditambah maka statenya akan bertambah dan berubah juga di HTML nya
  const [chatMessages, setChatMessages] = useState([
  // lalu ada shortcur lagi, daripada melakukan destructuring setelah state kita langsung destructuring di statenya aja
  // before : const array = React.useState([...]);
  
  //const [chatMessages, setChatMessages] = array; //shortcut dari 2 baris dibawah ini
  //const chatMessages = array[0]; //the current data
  //const setChatMessages = array[1]; //updater function

    // object 1, dengan 2 properties
    {
      message: 'hello chatbot',
      sender: 'user',
      id:'id1'
    },
    {
      message: 'Hello! how can i help you?',
      sender: 'robot',
      id:'id2'
    },
    {
      message: 'Todays date',
      sender: 'user',
      id:'id3'
    },
    {
      message: 'Today is July 1',
      sender: 'robot',
      id:'id4' //wajib memiliki unique key
    }
  ]);

  return (
  <div className ="app-container">

    <ChatMessages
      chatMessages={chatMessages}/>
    
    <ChatInput
    // by props, fo distribution/sharing/inheri to child
      chatMessages={chatMessages}
      setChatMessages={setChatMessages}
    />
  </div>
  )      
}
export default App