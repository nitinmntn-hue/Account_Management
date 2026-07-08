src/
│
├── app/
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.jsx
│   │   │
│   │   ├── transactions/
│   │   │   ├── page.jsx                 # All Transactions
│   │   │   ├── income/
│   │   │   │   └── page.jsx
│   │   │   ├── expense/
│   │   │   │   └── page.jsx
│   │   │   ├── cash-deposit/
│   │   │   │   └── page.jsx
│   │   │   ├── cash-withdraw/
│   │   │   │   └── page.jsx
│   │   │   ├── contra/
│   │   │   │   └── page.jsx
│   │   │   ├── bank-transfer/
│   │   │   │   └── page.jsx
│   │   │   └── transaction-history/
│   │   │       └── page.jsx
│   │   │
│   │   ├── parties/
│   │   │   ├── vendors/
│   │   │   │   └── page.jsx
│   │   │   ├── customers/
│   │   │   │   └── page.jsx
│   │   │   └── ledger/
│   │   │       └── page.jsx
│   │   │
│   │   ├── accounts/
│   │   │   ├── bank-accounts/
│   │   │   │   └── page.jsx
│   │   │   ├── cash-accounts/
│   │   │   │   └── page.jsx
│   │   │   ├── wallet/
│   │   │   │   └── page.jsx
│   │   │   └── opening-balance/
│   │   │       └── page.jsx
│   │   │
│   │   ├── reports/
│   │   │   ├── daily/
│   │   │   ├── weekly/
│   │   │   ├── monthly/
│   │   │   ├── annual/
│   │   │   ├── cash-flow/
│   │   │   ├── income-expense/
│   │   │   ├── head-wise/
│   │   │   ├── vendor/
│   │   │   ├── ledger/
│   │   │   └── trial-balance/
│   │   │
│   │   ├── export/
│   │   │   ├── pdf/
│   │   │   ├── excel/
│   │   │   ├── whatsapp/
│   │   │   ├── email/
│   │   │   └── schedule/
│   │   │
│   │   ├── financial-year/
│   │   │   ├── page.jsx
│   │   │   ├── create/
│   │   │   └── close/
│   │   │
│   │   ├── settings/
│   │   │   ├── company/
│   │   │   ├── users/
│   │   │   ├── roles/
│   │   │   ├── taxes/
│   │   │   ├── backup/
│   │   │   └── system/
│   │   │
│   │   └── layout.jsx          # Dashboard Layout
│   │
│   ├── login/
│   ├── otp/
│   ├── page.jsx
│   ├── layout.jsx
│   └── globals.css
│
├── components/
│   │
│   ├── layout/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── MobileSidebar.jsx
│   │   ├── SidebarItem.jsx
│   │   ├── SidebarDropdown.jsx
│   │   └── Breadcrumb.jsx
│   │
│   ├── forms/
│   ├── tables/
│   ├── cards/
│   ├── charts/
│   ├── modals/
│   └── ui/
│
├── config/
│   ├── sidebar.js
│   ├── routes.js
│   └── permissions.js
│
├── lib/
│   ├── axios.js
│   ├── auth.js
│   ├── helper.js
│   └── constants.js
│
├── services/
│   ├── transaction.service.js
│   ├── report.service.js
│   ├── vendor.service.js
│   ├── account.service.js
│   └── auth.service.js
│
├── hooks/
│
├── store/
│
├── context/
│
├── utils/
│
├── types/
│
└── middleware.js


components/layout/
│
├── Sidebar.jsx
├── SidebarItem.jsx
├── SidebarDropdown.jsx
├── MobileSidebar.jsx
└── Navbar.jsx

config/
│
├── sidebar.js
├── routes.js
└── permissions.js