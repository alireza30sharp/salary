import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: "E-commerce",
  //   icon: "shopping-cart-outline",
  //   link: "/pages/dashboard",
  //   home: true,
  // },

  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: "اطلاعات اولیه",
    icon: "layout-outline",
    children: [
      {
        title: "گارگاه",
        link: "/salary/work-shops/list",
      },
      {
        title: "مدارک تحصیلی",
        link: "/salary/education-evidences/list",
      },
      {
        title: "رشته تحصیلی",
        link: "/salary/education-fields/list",
      },
      {
        title: "واحد سازمانی",
        link: "/salary/organization-units",
      },

      {
        title: "نوع استخدامی",
        link: "/salary/employment-types/list",
      },
      {
        title: "پست سازمانی",
        link: "/salary/organization-post",
      },
      {
        title: "محل های پرداخت",
        link: "/salary/payment-location",
      },
      {
        title: "مزایا و کسورات",
        link: "/salary/benefit-deduction",
      },
      {
        title: "جدول مالیاتی",
        link: "/salary/tax",
      },
      {
        title: "کارمندان",
        link: "/salary/employes-list",
      },
      {
        title: "حکم حقوقی",
        link: "/salary/wage-orders/list",
      },
      {
        title: "حکم استخدامی",
        link: "/salary/employment-order/list",
      },
      {
        title: "نوع بیمه",
        link: "/salary/insurance-type/list",
      },
      {
        title: "نوع معافیت",
        link: "/salary/exemption-types/list",
      },
      // {
      //   title: "حکم استخدامی",
      //   link: "/salary/employment-orders-list",
      // },
    ],
  },
  {
    title: "عملیات سیستم",
    icon: "edit-2-outline",
    children: [
      {
        title: "لیست",
        link: "/salary/system-operation/list",
      },
      {
        title: "کارکرد ماهانه ",
        link: "/salary/system-operation/monthly-performance",
      },
      {
        title: "محاسبه حقوق",
        link: "/salary/system-operation/salary-calculation",
      },
      {
        title: "مزایا و کسورات کارمندان",
        link: "/salary/benefit-deduction-employees-list",
      },

      {
        //همونی که داخل path هست
        title: "مساعده",
        link: "/salary/advance",
      },
    ],
  },
  // {
  //   title: "UI Features",
  //   icon: "keypad-outline",
  //   link: "/pages/ui-features",
  //   children: [
  //     {
  //       title: "Grid",
  //       link: "/pages/ui-features/grid",
  //     },
  //     {
  //       title: "Icons",
  //       link: "/pages/ui-features/icons",
  //     },
  //     {
  //       title: "Typography",
  //       link: "/pages/ui-features/typography",
  //     },
  //     {
  //       title: "Animated Searches",
  //       link: "/pages/ui-features/search-fields",
  //     },
  //   ],
  // },
  // {
  //   title: "Modal & Overlays",
  //   icon: "browser-outline",
  //   children: [
  //     {
  //       title: "Dialog",
  //       link: "/pages/modal-overlays/dialog",
  //     },
  //     {
  //       title: "Window",
  //       link: "/pages/modal-overlays/window",
  //     },
  //     {
  //       title: "Popover",
  //       link: "/pages/modal-overlays/popover",
  //     },
  //     {
  //       title: "Toastr",
  //       link: "/pages/modal-overlays/toastr",
  //     },
  //     {
  //       title: "Tooltip",
  //       link: "/pages/modal-overlays/tooltip",
  //     },
  //   ],
  // },
  // {
  //   title: "Extra Components",
  //   icon: "message-circle-outline",
  //   children: [
  //     {
  //       title: "Calendar",
  //       link: "/pages/extra-components/calendar",
  //     },
  //     {
  //       title: "Progress Bar",
  //       link: "/pages/extra-components/progress-bar",
  //     },
  //     {
  //       title: "Spinner",
  //       link: "/pages/extra-components/spinner",
  //     },
  //     {
  //       title: "Alert",
  //       link: "/pages/extra-components/alert",
  //     },
  //     {
  //       title: "Calendar Kit",
  //       link: "/pages/extra-components/calendar-kit",
  //     },
  //     {
  //       title: "Chat",
  //       link: "/pages/extra-components/chat",
  //     },
  //   ],
  // },
  // {
  //   title: "Maps",
  //   icon: "map-outline",
  //   children: [
  //     {
  //       title: "Google Maps",
  //       link: "/pages/maps/gmaps",
  //     },
  //     {
  //       title: "Leaflet Maps",
  //       link: "/pages/maps/leaflet",
  //     },
  //     {
  //       title: "Bubble Maps",
  //       link: "/pages/maps/bubble",
  //     },
  //     {
  //       title: "Search Maps",
  //       link: "/pages/maps/searchmap",
  //     },
  //   ],
  // },
  // {
  //   title: "Charts",
  //   icon: "pie-chart-outline",
  //   children: [
  //     {
  //       title: "Echarts",
  //       link: "/pages/charts/echarts",
  //     },
  //     {
  //       title: "Charts.js",
  //       link: "/pages/charts/chartjs",
  //     },
  //     {
  //       title: "D3",
  //       link: "/pages/charts/d3",
  //     },
  //   ],
  // },
  // {
  //   title: "Editors",
  //   icon: "text-outline",
  //   children: [
  //     {
  //       title: "TinyMCE",
  //       link: "/pages/editors/tinymce",
  //     },
  //     {
  //       title: "CKEditor",
  //       link: "/pages/editors/ckeditor",
  //     },
  //   ],
  // },
  // {
  //   title: "Tables & Data",
  //   icon: "grid-outline",
  //   children: [
  //     {
  //       title: "Smart Table",
  //       link: "/pages/tables/smart-table",
  //     },
  //     {
  //       title: "Tree Grid",
  //       link: "/pages/tables/tree-grid",
  //     },
  //   ],
  // },
  // {
  //   title: "Miscellaneous",
  //   icon: "shuffle-2-outline",
  //   children: [
  //     {
  //       title: "404",
  //       link: "/pages/miscellaneous/404",
  //     },
  //   ],
  // },
  // {
  //   title: "Auth",
  //   icon: "lock-outline",
  //   children: [
  //     {
  //       title: "Login",
  //       link: "/auth/login",
  //     },
  //     {
  //       title: "Register",
  //       link: "/auth/register",
  //     },
  //     {
  //       title: "Request Password",
  //       link: "/auth/request-password",
  //     },
  //     {
  //       title: "Reset Password",
  //       link: "/auth/reset-password",
  //     },
  //   ],
  // },
];
