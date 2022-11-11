
const supabaseUrl = 'https://bqhnvwfovmcxrqrsmfxr.supabase.co'
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"

const client = supabase.createClient(supabaseUrl, SUPABASE_KEY)

async function descargar(){
    const { data, error } = await client.storage.from('avatars').download('avatar1.png');
    console.log(data,error);
    document.querySelector('#avatar').src = URL.createObjectURL(data);
}

descargar();

