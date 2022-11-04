(() => {
    document.addEventListener('DOMContentLoaded', () => {

        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM"
        let access_token = '';
     /*   let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY3MDU0ODc0LCJzdWIiOiJiMDc5ODMyZC1lMjQzLTRhYWYtYmQ5Mi1iNGZiOTYxZTg2NzQiLCJlbWFpbCI6ImpvY2FzYWxAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjQyOTQzZDI2LWEyNWUtNGEzMi1iODgzLWNhNzFkNTQyZTUxYSJ9.lFTwGO-2dbhPMg7XBMg2EXU4iBjmeQrvWMbbw798GPE"
        fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/graphs',{ 
            method: 'get',
            headers: {
                "apiKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxaG52d2Zvdm1jeHJxcnNtZnhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYyNzk4MDYsImV4cCI6MTk4MTg1NTgwNn0.jVhmEO__GFSxqRlbzdCxyeb_VxWWD7Bqk9sj3Po8xtM",
                "Authorization": "Bearer "+token
            }
        })
            .then(r => r.json())
            .then(d => console.log(d));*/




            document.querySelector('#signupbtn').addEventListener('click',async ()=>{
                let signUpObject = {
                    email:  document.querySelector('#signupemail').value,
                    password:  document.querySelector('#signuppassword').value 
                };
                let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/signup',{
                    method: 'post',
                    headers: {
                        "apiKey": SUPABASE_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpObject)
                });
                let data = await response.json();
                document.querySelector('#userInfo').innerHTML = JSON.stringify(data);
            });

            document.querySelector('#loginbutton').addEventListener('click',async ()=>{
                let signUpObject = {
                    email:  document.querySelector('#loginemail').value,
                    password:  document.querySelector('#loginpassword').value 
                };
                let response = await fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/auth/v1/token?grant_type=password',{
                    method: 'post',
                    headers: {
                        "apiKey": SUPABASE_KEY,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(signUpObject)
                });
                let data = await response.json();
                document.querySelector('#userInfo').innerHTML = JSON.stringify(data);
                access_token = data.access_token;

            });



            document.querySelector('#pedirDatos').addEventListener('click',()=>{
                fetch('https://bqhnvwfovmcxrqrsmfxr.supabase.co/rest/v1/graphs',{ 
                    method: 'get',
                    headers: {
                        "apiKey": SUPABASE_KEY,
                        "Authorization": "Bearer "+access_token
                    }
                })
                    .then(r => r.json())
                    .then(d => {
                        document.querySelector('#datosServidor').innerHTML = JSON.stringify(d);
                        console.log(d);
                    } );
            });


    });



   
 })
();


/*

http://localhost:3000/#access_token=


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY3MDU0ODc0LCJzdWIiOiJiMDc5ODMyZC1lMjQzLTRhYWYtYmQ5Mi1iNGZiOTYxZTg2NzQiLCJlbWFpbCI6ImpvY2FzYWxAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjQyOTQzZDI2LWEyNWUtNGEzMi1iODgzLWNhNzFkNTQyZTUxYSJ9.lFTwGO-2dbhPMg7XBMg2EXU4iBjmeQrvWMbbw798GPE


&expires_in=3600&refresh_token=6ZUQ3UCziqllMEiA7BLEHg&token_type=bearer&type=invite*/