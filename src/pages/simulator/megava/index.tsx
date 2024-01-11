import React from 'react';
import MEGAVA from '../../../components/SimulatorVA/MEGAVA';
import SimulatorLayout from '../../../layouts/SimulatorLayout';
import { getServerSideProps } from '../index';

const Megava = () => {
  return (
    <SimulatorLayout>
      <MEGAVA />
    </SimulatorLayout>
  );
};

export { getServerSideProps };

export default Megava;
