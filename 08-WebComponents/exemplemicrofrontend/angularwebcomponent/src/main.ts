import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { LikeButtonComponent } from './app/like-button/like-button.component';
import 'zone.js'; // Obligatorio para Angular

createApplication()
.then((app) => {
  const LikeButton = createCustomElement(LikeButtonComponent, { injector: app.injector });
  customElements.define('like-button', LikeButton);
})
  .catch((err) => console.error(err));
