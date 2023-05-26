
const supabaseUrl = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"

const supabaseRealTimeClient = supabase.createClient(supabaseUrl, SUPABASE_KEY);

const currentUser = Math.random()+"";

const channel = supabaseRealTimeClient.channel('chat-db')

function renderMessage(message){
  const messageContainer = document.getElementById('message-container');
   
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(message.user === currentUser ? 'outgoing' : 'incoming');

  const messageContent = document.createElement('span');
  messageContent.classList.add('message-content');
  messageContent.textContent = message.message;

  messageElement.appendChild(messageContent);
  messageContainer.appendChild(messageElement);

  // Hacer scroll hacia abajo para mostrar el último mensaje
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

channel
  .on(
    'postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'chat',
  }, (payload) => {
    console.log(payload);
    renderMessage(payload.new)
  }).subscribe((status) => console.log(status))



  async function downloadHistoric(){
    const { data, error } = await supabaseRealTimeClient.from("chat").select();
   // console.log(data);
   data.forEach(renderMessage);
  }

  document.addEventListener("DOMContentLoaded",()=>{

    downloadHistoric();


   document.querySelector("#send-button").addEventListener("click", async ()=>{
    let message = document.querySelector('#message-input').value;
    const { data, error } = await supabaseRealTimeClient.from("chat").insert([
      {
      user: currentUser,
      message: message
      },
  ]);
   }); 
  })