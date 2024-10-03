import { Component } from '@angular/core';
import { SingUpFormComponent } from "../../component/sing-up-form/sing-up-form.component";


@Component({
  selector: 'app-sign-up-form-page',
  standalone: true,
  imports: [SingUpFormComponent],
  templateUrl: './sign-up-form-page.component.html',
  styleUrl: './sign-up-form-page.component.scss'
})
export class SignUpFormPageComponent {

}
