import React from 'react';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import MEGAVAConfirm from '../../../components/SimulatorVA/MEGAVAConfirm';
import { getServerSideProps } from '../index';

const MegavaConfirm = () => {
  return (
    <SimulatorLayout>
      <MEGAVAConfirm />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default MegavaConfirm;
