async function fetchProducts(){
   let response = await fetch('https://zjwnfbhnemehixhiupey.supabase.co/rest/v1/products?select=*',
        {
            method: 'get',
            headers: {
                    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd25mYmhuZW1laGl4aGl1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxMzgsImV4cCI6MjA3NjEwODEzOH0.3cNnBxWPVvpfr0vcFvbr2fxz2y20ZW2GNS6IZS6pHK0",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd25mYmhuZW1laGl4aGl1cGV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MzIxMzgsImV4cCI6MjA3NjEwODEzOH0.3cNnBxWPVvpfr0vcFvbr2fxz2y20ZW2GNS6IZS6pHK0"
            }
            });
    let data = await response.json();
    console.log(data);
}


fetchProducts();