import React from 'react';

// components
import SimulatorNavbar from '../components/Navbars/SimulatorNavbar';

interface AuthProps {
  children: React.ReactNode;
  heading?: string;
  description?: string;
}

export default function SimulatorLayout(props: AuthProps) {
  const { children } = props;
  return (
    <>
      <SimulatorNavbar />
      <main>
        <section className="relative h-full min-h-screen w-full">
          <div
            className="bg-full absolute top-0 h-full w-full bg-no-repeat"></div>
          {children}
        </section>
      </main>
    </>
  );
}
