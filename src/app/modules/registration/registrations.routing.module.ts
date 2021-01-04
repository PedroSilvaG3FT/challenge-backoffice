import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { NewMenuComponent } from './pages/menu/new-menu/new-menu.component';

import { ExerciceComponent } from './pages/exercice/exercice.component';
import { NewExerciceComponent } from './pages/exercice//new-exercice/new-exercice.component';


export const routes: Routes = [
    { path: 'menu', component: MenuComponent },
    { path: 'menu/new', component: NewMenuComponent },
    { path: 'menu/edit/:id', component: NewMenuComponent },

    { path: 'exercice', component: ExerciceComponent },
    { path: 'exercice/new', component: NewExerciceComponent },
    { path: 'exercice/edit/:id', component: NewExerciceComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class RegistrationRoutingModule { }
