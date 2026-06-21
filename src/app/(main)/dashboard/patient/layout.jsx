
import { requireAccountRole } from '@/lib/core/session';
import React from 'react';

const PatientLayout = async ({ children }) => {
    await requireAccountRole('patient_family')
    return children;
};

export default PatientLayout;