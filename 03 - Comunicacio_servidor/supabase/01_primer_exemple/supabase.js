async function fetchProducts(){
   let response = await fetch('https://sxmhalwwwortzueczlno.supabase.co/rest/v1/products?select=*',
        {
            method: 'get',
            headers: {
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWhhbHd3d29ydHp1ZWN6bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDIsImV4cCI6MjAxNDg0MjMwMn0.6t5wygarFGkpH3N3UjWYmEnoEdDeB2zsfgZevCl9VPo",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bWhhbHd3d29ydHp1ZWN6bG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDIsImV4cCI6MjAxNDg0MjMwMn0.6t5wygarFGkpH3N3UjWYmEnoEdDeB2zsfgZevCl9VPo"
            }
            });
    let data = await response.json();
    console.log(data);
}


fetchProducts();