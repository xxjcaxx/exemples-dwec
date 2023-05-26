
const supabaseUrl = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"

const supabaseRealTimeClient = supabase.createClient(supabaseUrl, SUPABASE_KEY);

const currentUser = Math.random()+"";

const channel = supabaseRealTimeClient.channel('chat', {
    config: {
      broadcast: {
        self: true,
      },
    },
  })



channel.subscribe()
  .on('broadcast', { event: 'supa' }, (payload) => {
    console.log(payload);
    const messageContainer = document.getElementById('message-container');
   
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(payload.payload.user === currentUser ? 'outgoing' : 'incoming');
  
    const messageContent = document.createElement('span');
    messageContent.classList.add('message-content');
    messageContent.textContent = payload.payload.message;
  
    messageElement.appendChild(messageContent);
    messageContainer.appendChild(messageElement);
  
    // Hacer scroll hacia abajo para mostrar el último mensaje
    messageContainer.scrollTop = messageContainer.scrollHeight;
  })



  document.addEventListener("DOMContentLoaded",()=>{
   document.querySelector("#send-button").addEventListener("click",()=>{
    let message = document.querySelector('#message-input').value;
    channel.send({
        type: 'broadcast',
        event: 'supa',
        payload: {message,user:currentUser},
      })
   }); 
  })