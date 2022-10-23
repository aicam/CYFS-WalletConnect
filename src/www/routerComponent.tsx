import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import GreenomicsHomepage from "@www/pages/Welcome/Welcome";

const RouterComponent: React.SFC = () => (
    <Routes>
        <Route path="/test" element={<div>hello world</div>} />
        <Route path="/" element={<GreenomicsHomepage />} />
    </Routes>
);
export default RouterComponent
