import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../services/Services';
import ClientLogoSlider from '../ClientLogoSlider/ClientLogoSlider';
import ServiceHighlights from '../ServiceHighlight/ServiceHighlights';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogoSlider></ClientLogoSlider>
            <ServiceHighlights></ServiceHighlights>
        </div>
    );
};

export default Home;