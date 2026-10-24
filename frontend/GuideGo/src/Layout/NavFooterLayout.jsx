import { Outlet } from 'react-router-dom';
import Navbar from '../component/navbar/navbar';
import Footer from '../component/footer/Footer';


const NavFooterLayout = ({isVisible}) => {
  return (
    <div className="page-layout">
      <Navbar isVisible={isVisible} />

        <Outlet />

      <Footer />
    </div>
  );
};

export default NavFooterLayout;