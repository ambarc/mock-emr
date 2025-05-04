'use client';

import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';

type PageProps = {
  params: Promise<{}>;
};

export default function Home({ params }: PageProps) {
  React.use(params); // Ensure params are unwrapped before redirect

  useEffect(() => {
    // TODO: In a real app, this would redirect to the most recently viewed patient
    // or show a patient selection screen
    redirect('/patients/default/clinical');
  }, []);

  return null;
}
