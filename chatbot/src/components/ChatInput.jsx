import { useState} from 'react'
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';

// function component : dengan return JSX view text input perintah kepada chatbot
export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  // function yg dijalankan untuk save input text user ke state by event.target.value, jadi setiap kali user mengetik di input box maka state akan berubah sesuai dengan value yg diketik
  function saveInputText(event){
    setInputText(event.target.value);
  }

  // function yg dijalankan untuk menambahkan data baru dari inputan user ke state chatMessages. jdi nnti muncul di conversationnya
  function sendMessage(){
    // kalau ada dua setChatMessages kya gini, nnti yang punya user akan hilang, karena react merubah ketika code done running
    // makanya kita perlu save ke variable agar valuenya sudah kesimpan sebelum dilanjutkan ke response chatbot
    const newChatMessages = [
      ...chatMessages,
      // ini data baru yg mau ditambahan di copy array chatMessages, jadi kalo mau nambahin data baru tinggal ditambahin aja di array ini
      {
        message:inputText,
        sender:'user',
        id:crypto.randomUUID() //generate unique key id
      }
    ]
    setChatMessages(newChatMessages);

    // membuat respon dari chatbot, external library
    const response = Chatbot.getResponse(inputText);
    // create new messages for chatbot response
      setChatMessages([
      // dengan menggunakan newChatMessages maka rewuest kita sudah tersimpan dan akan tampil uga.
      // karena yg dipakai merupakan array terbaru include request ktia
      ...newChatMessages, //...mean copy
      {
        message:response,
        sender:'robot',
        id:crypto.randomUUID() //generate unique key id
      }
    ]);

    // delete current data
    setInputText('');
  }

  return (
    // size di input box adalah berapa banyaknya karakter yang fits didalamya
    // ingin membuat komponen search & buttonnya flexible, jd ngikutin uk chromenya. Pakai flexbox
      
    <div className="chat-input-container">            
      <input 
      placeholder="Send a mesage to chatbot" 
      size="40"
      onChange={saveInputText}
      value={inputText}
      className="chat-input"
      />

      <button onClick={sendMessage} className="send-button ">Send</button>
    </div>
  );
}