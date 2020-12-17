import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { NewMenuComponent } from './pages/menu/new-menu/new-menu.component';


export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'menu/new', component: NewMenuComponent },
    { path: 'menu/edit/:id', component: NewMenuComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class RegistrationRoutingModule { }
