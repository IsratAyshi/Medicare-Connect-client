
import { requireAccountRole } from '@/lib/core/session';
import React from 'react';

const MedSpecialistLayout = async ({ children }) => {
    await requireAccountRole('admin')
    return children;
};

export default MedSpecialistLayout;