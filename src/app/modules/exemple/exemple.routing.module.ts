import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExempleComponent } from './components/exempleComponent/exemple.component';


export const routes = [
    { path: '', component: ExempleComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ExempleRoutingModule { }
