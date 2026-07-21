import { useState, useEffect, useRef } from 'react'
import {Chatbot} from 'supersimpledev';
import RobotProfile from './assets/robot.png';
import UserProfile from './assets/profile.png';
import './App.css'

// function component : dengan return JSX view text input perintah kepada chatbot
function ChatInput({ chatMessages, setChatMessages }) {
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

function ChatMessage({message, sender}){
  // props parameter itu object yang contain all attributes yg kita kasih di function return app dibawah 
  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender == "robot" && (
        <img src={RobotProfile} className="chat-message-profile"/>
      )}

      <div className="chat-message-text">
        {message}  
      </div>
      
      {sender == "user" && (
        <img src={UserProfile} className="chat-message-profile"/>
      )}            
    </div>
  );
}

function ChatMessages({chatMessages}){
  const chatMessagesRef = useRef(null);
  // container div dibawah disimpan oleh react ke var diatas
  // perlu akses ke container div karena ingin membuat auto scrollable

  // react hooks, akan di running setelah component created & everytime component update
  // [] : dependency array param control useEffect ketka di running. Empty array useEffect run only once after the component is created
  // best nya adalah setiap react useEffect kasih depen array biar dia nggak keseringan running
  useEffect(() => {
    const containerElem = chatMessagesRef.current; //dipanggil disini agar bisa auto scrollable. ref untuk referensi containernya. di useEffect untuk aksinya
    if(containerElem){
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  },[chatMessages]);
  // Running if chatMessages was updated


  // for using map we need to create a function

  // arrow function : fungsinya sama kaya function biasa cuma penulisannya lebih singkat
  // arrow function biasa dipake di map fnction gni, tujuannya biar penulisan function lebih singkat
  // .map itu mengambil tiap value yang ada di array atas lalu menyimpannya sebagai value baru
  
  //const chatMessageComponents = chatMessages.map((chatMessage) => {
    // jadi chatMessage ini sebagai parameter, dimana kalo functionnya dipanggil otomatis chatMessage akan menampilkan newValue1
    // return (<ChatMessage
      // karna tiap object memiliki 2 prop yaitu mesage & sender, jadi disini disetting juga
      
      // message={chatMessage.message}
      // sender={chatMessage.sender}
    // />);
  // });

  // penulisannya bisa ky yg diatas, atau more effective follow below

  // ketika kita manggilnya langsung "{chatMessageComponents}" maka dia akan langsung menampilkan semua value yang ada didalam arraynya
//  this -> to generate all messages (looping)
  return ( 
    <div className="chat-message-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        // jadi chatMessage ini sebagai parameter, dimana kalo functionnya dipanggil otomatis chatMessage akan menampilkan newValue1
        return (<ChatMessage
          // karna tiap object memiliki 2 prop yaitu mesage & sender, jadi disini disetting juga
          // tiap data yg/object harus punya unique key
          message={chatMessage.message}
          sender={chatMessage.sender}
          key={chatMessage.id}
        />);
      })}
    </div>
  );
}




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
