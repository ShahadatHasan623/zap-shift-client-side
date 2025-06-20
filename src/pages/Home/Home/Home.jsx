import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../services/Services';
import ClientLogoSlider from '../ClientLogoSlider/ClientLogoSlider';
import ServiceHighlights from '../ServiceHighlight/ServiceHighlights';
import Merchant from '../Merchant/Merchant';
import CustomerSay from '../CustomerSay/CustomerSay';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogoSlider></ClientLogoSlider>
            <ServiceHighlights></ServiceHighlights>
            <Merchant></Merchant>
            <CustomerSay></CustomerSay>
        </div>
    );
};

export default Home;