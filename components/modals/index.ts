import { lazy } from 'react';

// Lazy load modal components to optimize bundle size
export const ChangePasswordModal = lazy(() => import('./ChangePasswordModal'));
export const PrivacyPoliciesModal = lazy(() => import('./PrivacyPoliciesModal'));
export const HelpSupportModal = lazy(() => import('./HelpSupportModal')); 