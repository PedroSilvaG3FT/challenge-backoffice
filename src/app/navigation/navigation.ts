import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'add_shopping_cart',
    children: [
      {
        id: 'registration',
        title: 'Cadastros',
        translate: 'NAV.ECOMMERCE',
        type: 'collapsable',
        icon: 'add',
        children: [
          {
            id: 'menuRegister',
            title: 'Cardapio',
            type: 'item',
            icon: 'restaurant',
            url: 'registration/menu',
          },
        ],
      },
      {
        id: 'member',
        title: 'Membros',
        translate: 'NAV.ECOMMERCE',
        type: 'collapsable',
        icon: 'group',
        children: [
          {
            id: 'members',
            title: 'Todos',
            type: 'item',
            icon: 'list',
            url: 'member/list',
          },
          {
            id: 'members',
            title: 'Novos Membros',
            type: 'item',
            icon: 'group_add',
            url: 'member/member-aproval',
          },
        ],
      },

    ],
  },
];
