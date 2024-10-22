import { Outlet } from "react-router-dom";
import Layout from "../common/components/app-layout/Layout";

const AppLayout = () => {
  return (
    
      <Layout>
        <Outlet />
      </Layout>
    
  );
};

export default AppLayout;
