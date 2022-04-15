import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
  {
    id: "applications",
    title: "",
    translate: "NAV.APPLICATIONS",
    type: "group",
    icon: "add_shopping_cart",
    children: [
      {
        id: "registration",
        title: "Cadastros",
        translate: "NAV.ECOMMERCE",
        type: "collapsable",
        icon: "add",
        children: [
          {
            id: "menuRegister",
            title: "Cardapio",
            type: "item",
            icon: "restaurant",
            url: "registration/menu",
          },
          {
            id: "exerciceRegister",
            title: "Exercício",
            type: "item",
            icon: "directions_run",
            url: "registration/exercice",
          },
          {
            id: "paymentRegister",
            title: "Forma de Pagamento",
            type: "item",
            icon: "credit_card",
            url: "registration/payment",
          },
        ],
      },
      {
        id: "member",
        title: "Membros",
        translate: "NAV.ECOMMERCE",
        type: "collapsable",
        icon: "group",
        children: [
          {
            id: "members",
            title: "Todos",
            type: "item",
            icon: "list",
            url: "member/list",
          },
          {
            id: "members",
            title: "Novos Membros",
            type: "item",
            icon: "group_add",
            url: "member/member-aproval",
          },
          {
            id: "assignMenu",
            title: "Atribuir Cardapio",
            type: "item",
            icon: "restaurant",
            url: "member/assign-menu",
          },
          {
            id: "assignMenu",
            title: "Atribuir Exercicio",
            type: "item",
            icon: "directions_run",
            url: "member/assign-exercice",
          },
        ],
      },
      {
        id: "faithfulness",
        title: "Fidelidade",
        translate: "NAV.ECOMMERCE",
        type: "collapsable",
        icon: "group",
        children: [
          {
            id: "members",
            title: "Todos",
            type: "item",
            icon: "list",
            url: "member/faithfulness/list",
          },
          {
            id: "assignMenu",
            title: "Atribuir Cardapio",
            type: "item",
            icon: "restaurant",
            url: "member/faithfulness/assign-menu",
          },
          {
            id: "assignMenu",
            title: "Atribuir Exercicio",
            type: "item",
            icon: "directions_run",
            url: "member/faithfulness/assign-exercice",
          },
        ],
      },
    ],
  },
];
