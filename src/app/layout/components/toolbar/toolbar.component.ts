import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { Router } from '@angular/router';
import { MemberInterface } from 'app/modules/member/interfaces/member.interface';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    public horizontalNavbar: boolean;
    public rightNavbar: boolean;
    public hiddenNavbar: boolean;
    public languages: any;
    public navigation: any;
    public selectedLanguage: any;
    public userStatusOptions: any[];

    private _unsubscribeAll: Subject<any>;

    public user: MemberInterface = {} as MemberInterface;

    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private router: Router,
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._getUser();

        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    _getUser() {
        const userLocalStorage = localStorage.getItem("@CLAuth:user");
        this.user = JSON.parse(userLocalStorage);
    }

    singOut() {
        localStorage.removeItem("@CLAuth:token");
        localStorage.removeItem("@CLAuth:user");

        this.router.navigate(['/auth/login']);
    }

    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    search(value): void {
        console.log(value);
    }

    setLanguage(lang): void {
        this.selectedLanguage = lang;
        this._translateService.use(lang.id);
    }
}
