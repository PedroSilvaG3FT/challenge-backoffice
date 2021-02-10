import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';

import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/auth.service';

@Component({
    selector: 'login-2',
    templateUrl: './login-2.component.html',
    styleUrls: ['./login-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})

export class Login2Component implements OnInit {
    public loginForm: FormGroup;
    public hasError: boolean = false;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    doLogin() {
        this.authService
            .singIn(this.loginForm.value)
            .subscribe(
                response => {
                    const session: any = response;
                    localStorage.setItem("@CLAuth:token", JSON.stringify(session.token));
                    localStorage.setItem("@CLAuth:user", JSON.stringify(session.user));
                    
                    this.router.navigate(['/registration/menu']);
                    console.log("RESPONSE :", response)
                },
                error => {
                    alert("ERROR :" + error.error.message)
                }
            )

        
        // this.hasError = false;
        // this.hasError = true;
    }
}
