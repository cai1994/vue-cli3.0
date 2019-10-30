export default [
  {
    path: "/exchangeComfirmnDetail",
    name: "ExchangeComfirmnDetail",
    component: () => import("@/views/ExchangeComfirmnDetail"),
    meta: {
      breadcrumbName: "交易确认明细",
      keepAlive: true
    }
  }
];
