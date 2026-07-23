import { useEffect, useRef } from 'react'
import {ChatMessage} from './ChatMessage'
import './ChatMessages.css';

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

export default ChatMessages;