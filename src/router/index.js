import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import GoodsList from '@/pages/data/GoodsList'
import CommodityUnit from '@/pages/data/CommodityUnit'
import CommodityAttributes from '@/pages/data/CommodityAttributes'
import AddGoods from '@/pages/data/AddGoods'
import EditingGoods from '@/pages/data/EditingGoods'
import AddUnit from '@/pages/data/AddUnit'
import EditeUnit from '@/pages/data/EditeUnit'
import AddAttr from '@/pages/data/AddAttr'
import EditeAttr from '@/pages/data/EditeAttr'
import CustomerList from '@/pages/customer/CustomerList'
import AddCustomer from '@/pages/customer/AddCustomer'
import EditeCustomer from '@/pages/customer/EditeCustomer'
import CustomerDetail from '@/pages/customer/CustomerDetail'
import SalesOrders from '@/pages/sales/SalesOrders'
import AddOrder from '@/pages/sales/AddOrder'
import OrdersDetail from '@/pages/sales/OrdersDetail'
import SalesInvoice from '@/pages/sales/SalesInvoice'
import InvoiceDetail from '@/pages/sales/InvoiceDetail'
import CommoditySpecifications from '@/pages/data/CommoditySpecifications'
import AddSpgg from '@/pages/data/AddSpgg'
import EditOrder from '@/pages/sales/EditOrder'
import UserList from '@/pages/SystemSet/UserList'
import RoleManagement from '@/pages/SystemSet/RoleManagement'
import FunMangement from '@/pages/SystemSet/FunMangement'
import CustomerGroup from '@/pages/SystemSet/CustomerGroup'
import TransportBillList from '@/pages/sales/TransportBillList'
import TransportBillDetails from '@/pages/sales/TransportBillDetails'
import password from '@/components/password'
import ApprovalProcess from '@/pages/SystemSet/ApprovalProcess'
import ApprovalAdd from '@/pages/SystemSet/ApprovalAdd'
import ProcessConfiguration from '@/pages/SystemSet/ProcessConfiguration'
import Warehousinglist from '@/pages/Inventorymanagement/Warehousinglist'
import InventoryList from '@/pages/Inventorymanagement/InventoryList'
import ReceiptIssueList from '@/pages/Inventorymanagement/ReceiptIssueList'
import AddWarehousing from '@/pages/Inventorymanagement/AddWarehousing'
import InventoryDetails from '@/pages/Inventorymanagement/InventoryDetails'
import orderList from '@/owner/orderList'
import GetDispatchList from '@/owner/GetDispatchList'
import orderDetail from '@/owner/orderDetail'
import dispatchDetail from '@/owner/dispatchDetail'
import owerIndex from '@/owner/owerIndex'
import transport from '@/owner/transport'
import Transportticketdetail from '@/owner/Transportticketdetail'
import invoice from '@/pages/sales/invoice'
import Npassword from '@/owner/Npassword'
// import 404 from '@/components/404'
import notfound from '@/components/notfound'
import myGarage from '@/owner/myGarage'
import deliveryRecord from '@/owner/deliveryRecord'
import Wcontent from '@/owner/Wcontent'

Vue.use(Router)
export default new Router({
mode: 'history',
routes: [
  {
    path: '/Index',
    component: Index,
    meta:{
    	keepAlive: true
    }
  },
  {
    path: '/',
    component: Login,
    meta:{
    	keepAlive: false
    }
  },
  {
    path: '/transport',
    component:transport,
    meta:{
    	keepAlive: true
    }
  },
  {
    path: '/myGarage',
    component:myGarage,
    meta:{
    	keepAlive: true
    }
  },
 {
   path: '/deliveryRecord',
   component:deliveryRecord,
   meta:{
   	keepAlive: true
   }
 },
  {
    path: '/Transportticketdetail',
    component:Transportticketdetail,
    meta:{
    	keepAlive: true
    }
  },
  {
    path: '/Wcontent',
    component:Wcontent,
    meta:{
    	keepAlive: true
    }
  },
  {
    path: '/invoice',
    component: invoice,
    meta:{
    	keepAlive: true
    }
  },
  {
    path: '/Npassword',
    component: Npassword,
    meta:{
    	keepAlive: true
    }
  },
    {
      path: '/password',
      component: password,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/GoodsList',
      component: GoodsList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/CommodityUnit',
      component: CommodityUnit,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/CommodityAttributes',
      component: CommodityAttributes,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/AddGoods',
      component: AddGoods,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/EditingGoods/',
      component: EditingGoods,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/AddUnit',
      component: AddUnit,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/EditeUnit',
      component: EditeUnit,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/AddAttr',
      component: AddAttr,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/EditeAttr',
      component: EditeAttr,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/CustomerList',
      component: CustomerList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/AddCustomer',
      component: AddCustomer,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/EditeCustomer',
      component: EditeCustomer,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/CustomerDetail',
      component: CustomerDetail,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/SalesOrders',
      component: SalesOrders,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/AddOrder',
      component: AddOrder,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/OrdersDetail',
      component: OrdersDetail,
      meta:{
      	keepAlive: true
      }
    },
    ,
     {
      path: '/SalesInvoice',
      component: SalesInvoice,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/InvoiceDetail',
      component:InvoiceDetail,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/CommoditySpecifications',
      component:CommoditySpecifications,
      meta:{
      	keepAlive: true
      }
    },
      {
      path: '/AddSpgg',
      component:AddSpgg,
      meta:{
      	keepAlive: true
      }
    },
    //  {
    //   path: '/EditeSpgg',
    //   component: EditeSpgg,
    //   meta:{
    //   	keepAlive: true
    //   }
    // },
     {
      path: '/EditOrder',
      component:EditOrder,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/UserList',
      component: UserList,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/RoleManagement',
      component:RoleManagement,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '/FunMangement',
      component:FunMangement,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/CustomerGroup',
      component:CustomerGroup,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/TransportBillList',
      component:TransportBillList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/TransportBillDetails',
      component:TransportBillDetails,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/ApprovalProcess',
      component: ApprovalProcess,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/ProcessConfiguration',
      component: ProcessConfiguration,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/ApprovalAdd',
      component:ApprovalAdd,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/Warehousinglist',
      component: Warehousinglist,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/InventoryList',
      component: InventoryList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/ReceiptIssueList',
      component: ReceiptIssueList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/AddWarehousing',
      component: AddWarehousing,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/InventoryDetails',
      component: InventoryDetails,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/orderList',
      component: orderList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/GetDispatchList',
      component:GetDispatchList,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/orderDetail',
      component:orderDetail,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/dispatchDetail',
      component:dispatchDetail,
      meta:{
      	keepAlive: true
      }
    },
    {
      path: '/owerIndex',
      component:owerIndex,
      meta:{
      	keepAlive: true
      }
    },
     {
      path: '*',
      name:'notfound',
      component:notfound
    }
    //  {
    //  path: "/404",
    //  name: "notFound",
    //  component: notFound
    //  }, {
    //  path: "*", // 此处需特别注意置于最底部
    //  redirect: "/404"
    //  }

]
})
