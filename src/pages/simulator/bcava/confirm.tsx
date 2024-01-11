import React from 'react';
import BCAVAConfirm from '../../../components/SimulatorVA/BCAVAConfirm';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const BcavaConfirm = () => {
  return (
    <SimulatorLayout>
      <BCAVAConfirm />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default BcavaConfirm;
