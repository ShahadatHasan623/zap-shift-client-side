import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home/Home";
import AuthLayouts from "../layouts/AuthLayouts";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/CoverageMap/Coverage";
import SendParcel from "../pages/Sendparcel/SendParcel";
import PrivateRouter from "../privateRouter/PrivateRouter";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcel from "../pages/DashBoard/MyParcel";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackingParcel from "../pages/DashBoard/TrackingParcle/TrackingParcel";
import BeARider from "../pages/DashBoard/BeARider/BeARider";
import PendingRider from "../pages/DashBoard/PendingRider/PendingRider";
import ActiveRider from "../pages/DashBoard/ActiveRider/ActiveRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("../../public/warehouses.json"),
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRouter>
            <SendParcel></SendParcel>
          </PrivateRouter>
        ),
        loader: () => fetch("../../public/warehouses.json"),
      },
      {
        path: "/BeARider",
        element: (
          <PrivateRouter>
            <BeARider></BeARider>
          </PrivateRouter>
        ),
        loader: () => fetch("../../public/warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      {
        path: "myParcel",
        element: <MyParcel></MyParcel>,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackingParcel,
      },
      {
        path: "activeRiders",
        Component:ActiveRider
      },
      {
        path: "pendingRiders",
        Component: PendingRider,
      },
    ],
  },
]);
