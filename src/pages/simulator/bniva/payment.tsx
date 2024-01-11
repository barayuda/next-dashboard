import React from 'react';
import BNIVAPayment from '../../../components/SimulatorVA/BNIVAPayment';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BnivaPayment = () => {
  return (
    <SimulatorLayout>
      <BNIVAPayment />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BnivaPayment;
