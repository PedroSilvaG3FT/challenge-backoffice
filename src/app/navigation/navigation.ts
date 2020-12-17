import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
  {
    id: 'applications',
    title: '',
    translate: 'NAV.APPLICATIONS',
    type: 'group',
    icon: 'add_shopping_cart',
    children: [
      // {
      //   id: 'exemple',
      //   title: 'Exemple',
      //   translate: 'NAV.ECOMMERCE',
      //   type: 'collapsable',
      //   icon: 'shopping_cart',
      //   children: [
      //     {
      //       id: 'exempleC',
      //       title: 'Exemple Item',
      //       type: 'item',
      //       icon: 'collections',
      //       url: '/exemple',
      //     },
      //   ],
      // },

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

          {
            id: 'stepRegister',
            title: 'Fases',
            type: 'item',
            icon: 'trending_up',
            url: 'registration/menu',
          },
        ],
      },
      

    ],
  },
];
