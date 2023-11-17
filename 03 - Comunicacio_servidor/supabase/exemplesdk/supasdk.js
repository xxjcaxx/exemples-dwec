
const supabaseUrl = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"

const client = supabase.createClient(supabaseUrl, SUPABASE_KEY)

async function descargar(){
    const { data, error } = await client.storage.from('avatars').download('avatar1.png');
    console.log(data,error);
    document.querySelector('#avatar').src = URL.createObjectURL(data);
}



//descargar();



async function supaRequest(url,method,headers,body){
    // headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
    const { data, error } = await client
    .from('profiles')
    .update({
         username: "asdf", full_name: "asdf", website: "asdf" 
    })
    .eq('id', "45ed7239-c49d-4c32-9c29-871e490be8c8")
    .select()
  
    console.log(data,error);
     
     
 }

//supaRequest();


async function supaCount(){
  
const { count, error } = await client
.from('products')
.select('*', { count: 'exact', head: true })

  console.log(count,error);
   
  let { data, erroor } = await client
  .from('products')
  .select('*')

  console.log(data,error);
}

supaCount()


async function supaLike(){
  
  const { count, error } = await client
  .from('products')
  .select('*')
  .like('asin','%AX%')
  
    console.log(count,error);
     
  
  }



  //supaLike();


  async function supaChain(){
  
    const { data, count, error } = await client
    .from('products')
    .select('*')
    .or('id.eq.464, id.eq.466')
      console.log(data, count,error);
    }

   // supaChain();

   

   async function supaNeq(){
  
    const { data, count, error } = await client
    .from('products')
    .select('*')
    .neq('id',464)
    .neq('id',466)
      console.log(data, count,error);
    }

    supaNeq();








document.addEventListener('DOMContentLoaded',()=>{

    document.querySelector('#avatarI').addEventListener('change', async (event)=>{
        const avatarFile = event.target.files[0]
        const { data, error } = await client.storage
        .from('avatars')

  .upload('/avatar46.png', avatarFile, {

    cacheControl: '3600',

    upsert: true

  })
    })


    const supabaseRealTimeClient = supabase.createClient(supabaseUrl, SUPABASE_KEY);


    const channel = supabaseRealTimeClient.channel('schema-db-changes')
   // const realtime = supabaseRealTimeClient
   channel.on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        //table: 'products',
        //filter: `room_id=eq.${roomId}`,
      },
      (payload) => console.log(payload)
    ).subscribe()

});