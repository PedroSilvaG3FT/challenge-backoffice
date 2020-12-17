import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
  {
    path: 'academy',
    loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule),
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
  },
  {
    path: 'import/ax',
    loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule),
  },
  {
    path: 'import/vtex',
    loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule),
  },
  {
    path: 'export/occ',
    loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FuseSharedModule],
})
export class AppsModule {}
