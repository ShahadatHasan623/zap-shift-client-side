import axios from 'axios';
import React from 'react';

const axioseSecure =axios.create({
    baseURL:`http://localhost:5000`
})
const useAxioseSecure = () => {
    return axioseSecure;
};

export default useAxioseSecure;