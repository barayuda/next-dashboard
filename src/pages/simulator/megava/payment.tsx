import React from 'react';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import MEGAVAPayment from '../../../components/SimulatorVA/MEGAVAPayment';
import { getServerSideProps } from '../index';

const MandirivaPayment = () => {
  return (
    <SimulatorLayout>
      <MEGAVAPayment/>
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default MandirivaPayment;
