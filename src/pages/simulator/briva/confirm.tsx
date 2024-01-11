import React from 'react';
import BRIVAConfirm from '../../../components/SimulatorVA/BRIVAConfirm';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BrivaConfirm = () => {
  return (
    <SimulatorLayout>
      <BRIVAConfirm />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BrivaConfirm;
