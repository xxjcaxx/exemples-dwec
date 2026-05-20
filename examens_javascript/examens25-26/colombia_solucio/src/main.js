import "./components/header/header.js";
import "./components/content/content.js";

import "./components/content/content.js";



document.addEventListener('DOMContentLoaded', async () => {
    const content = document.querySelector('colombia-content');
  
    const header = document.querySelector('colombia-header');
    header.addEventListener('search-change', (event) => {
      const searchTerm = event.detail.value;
      content.highlightAttractions(searchTerm);
    });
 
});

