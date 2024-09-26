import * as bootstrap from 'bootstrap'
import './styles.scss'

document.querySelector('#app').innerHTML = `
  <div>
  <div class="container py-4 px-3 mx-auto">
  <h1>Hello, Bootstrap and Vite!</h1>
  <button class="btn btn-primary">Primary button</button>
</div>

<div id="host">
  <template shadowrootmode="open">
    <span>I'm in the shadow DOM</span>
  </template>
</div>


    
  </div>
`
