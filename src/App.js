import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../src/i18n';
import { useTranslation } from 'react-i18next';

// Admin imports (existing - unchanged)
import Sidebar from './Admin/Sidebar';
import Dashboard from './Admin/Components/Dashboard';
import BannerMaster from './Admin/Components/BannerMaster';
import TeamMaster from './Admin/Components/TeamMaster';
import AboutUsMaster from './Admin/Components/AboutUsMaster';
import TestimonialMaster from './Admin/Components/TestimonialMaster';
import FooterMaster from './Admin/Components/FooterMaster';

// User Layout and Components
import UserLayout from './User/Layout/UserLayout';
import AboutUs from './User/Components/AboutUs';
import Home from './User/Components/Home';
import Team from './User/Components/Team';
import Disaster from './User/Components/Disaster';
import Technology from './User/Components/Technology';
import ITHelp from './User/Components/ITHelp';
import RemoteWorkplace from './User/Components/RemoteWorkplace';
import Partners from './User/Components/Partners';
import Contact from './User/Components/Contact';
import Portfolio from './User/Components/Portfolio';
import WebDevelopment from './User/Components/WebDevelopment';
import Cybersecurity from './User/Components/CyberSecurity';
import DigitalMarketingPage from './User/Components/DigitalMarketingPage';
import Mobile from './User/Components/Mobile';
import Database from './User/Components/Database';
import Devops from './User/Components/Devops';
import Cloud from './User/Components/Cloud';
import Ai_ml from './User/Components/Ai_ml';
import ScrollTop from './User/ScrollTop';
import WhatsAppIcon from './User/WhatsAppIcon';
import GlobalEnquiryIcon from './User/GlobalEnquiryIcon';
function App() {
  const { t, i18n } = useTranslation();
  console.log('Current language:', i18n.language);
  console.log('Translations loaded:', i18n.exists('header.home'))
  return (
    <Router>
  <GlobalEnquiryIcon/>
 <WhatsAppIcon/>
<ScrollTop/>
      <Routes>
        {/* User Routes with Layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="team" element={<Team />} />
          <Route path="partners" element={<Partners />} />

          {/* <Route path="testimonials" element={<Testimonials />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/cybersecurity" element={<Cybersecurity />} />
          <Route path="/digital-marketing" element={< DigitalMarketingPage/>} />
          <Route path="/generative-ai" element={<Ai_ml />} />
          <Route path="/cloud-solutions" element={<Cloud />} />
          <Route path="/database-management" element={< Database/>} />
          <Route path="/mobile-development" element={<Mobile />} />
          <Route path="/devops-services" element={< Devops/>} />
          <Route path="/help-desc" element={< ITHelp/>} />
          <Route path="/backup-disaster-recovery" element={< Disaster/>} />
          <Route path="/remote-workplace" element={< RemoteWorkplace/>} />
          <Route path="/technology-consulting" element={< Technology/>} />


          

        </Route>

        {/* Admin Routes (existing - unchanged) */}
        <Route path="/admin" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="banner" element={<BannerMaster />} />
          <Route path="team" element={<TeamMaster />} />
          <Route path="about" element={<AboutUsMaster />} />
          <Route path="footer" element={<FooterMaster />} />
          <Route path="testimonial" element={<TestimonialMaster />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;