import React from 'react';
import BNIVA from '../../../components/SimulatorVA/BNIVA';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const Bniva = () => {
  return (
    <SimulatorLayout>
      <BNIVA />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default Bniva;
