import RobotProfile from '../assets/robot.png';
import UserProfile from '../assets/profile.png';
import './ChatMessage.css';

export function ChatMessage({message, sender}){
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