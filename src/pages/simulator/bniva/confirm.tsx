import React from 'react';
import BNIVAConfirm from '../../../components/SimulatorVA/BNIVAConfirm';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BnivaConfirm = () => {
  return (
    <SimulatorLayout>
      <BNIVAConfirm />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BnivaConfirm;
