import React from 'react';
import MANDIRIVA from '../../../components/SimulatorVA/MANDIRIVA';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const Mandiriva = () => {
  return (
    <SimulatorLayout>
      <MANDIRIVA />
    </SimulatorLayout>
  );
};

export { getServerSideProps };
export default Mandiriva;
