import React from 'react';
import BRIVAPayment from '../../../components/SimulatorVA/BRIVAPayment';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BrivaPayment = () => {
  return (
    <SimulatorLayout>
      <BRIVAPayment />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BrivaPayment;
