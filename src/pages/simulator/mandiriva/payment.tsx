import React from 'react';
import MANDIRIVAPayment from '../../../components/SimulatorVA/MANDIRIVAPayment';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const MandirivaPayment = () => {
  return (
    <SimulatorLayout>
      <MANDIRIVAPayment />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default MandirivaPayment;
