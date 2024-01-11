import React from 'react';
import BCAVAPayment from '../../../components/SimulatorVA/BCAVAPayment';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BcavaPayment = () => {
  return (
    <SimulatorLayout>
      <BCAVAPayment />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BcavaPayment;
