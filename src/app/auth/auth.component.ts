import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { alertComponent } from '../shared/alert/alert.component';
import { placeholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  templateUrl: 'auth.component.html',
  selector: 'app-component',
})
export class authComponent implements OnDestroy {
  isLogInMode = true;
  msg: string | any;
  isLoding = false;
  error: string | any = null;

  private closeSub: Subscription | any;
  @ViewChild(placeholderDirective) alertHost: placeholderDirective | any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  myForm: any;
  onSwitchMode() {
    this.isLogInMode = !this.isLogInMode;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData> | any;

    this.isLoding = true;
    if (this.isLogInMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (data: any) => {
        this.error = null;
        this.isLoding = false;
        console.log(data);
        this.router.navigate(['recipes']);
      },
      (error: any) => {
        this.error = error;
        console.log(this.error);
        this.showAlert(error);
        this.isLoding = false;
      }
    );

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  showAlert(message: string) {
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(alertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(factory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.seventEmit.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
  onCheck() {
    this.error = null;
  }
}
