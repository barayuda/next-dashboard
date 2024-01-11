import React from 'react';
import BRIVA from '../../../components/SimulatorVA/BRIVA';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const Briva = () => {
  return (
    <SimulatorLayout>
      <BRIVA />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default Briva;
