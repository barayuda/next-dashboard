import React from 'react';
import BCAVA from '../../../components/SimulatorVA/BCAVA';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const Bcava = () => {
  return (
    <SimulatorLayout>
      <BCAVA />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default Bcava;
