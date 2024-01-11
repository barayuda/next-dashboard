import React from 'react';
import MANDIRIVAConfirm from '../../../components/SimulatorVA/MANDIRIVAConfirm';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const MandirivaConfirm = () => {
  return (
    <SimulatorLayout>
      <MANDIRIVAConfirm />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default MandirivaConfirm;
