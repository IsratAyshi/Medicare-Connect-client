
import { requireAccountRole } from '@/lib/core/session';
import React from 'react';

const MedSpecialistLayout = async ({ children }) => {
    await requireAccountRole('medical_specialist')
    return children;
};

export default MedSpecialistLayout;