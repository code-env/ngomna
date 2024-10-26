import { SessionProvider } from '@/providers/session-provider';
import { ReactNode } from 'react';

import { useCurrentUser } from '@/hooks/use-current-user';
import { redirect } from 'next/navigation';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await useCurrentUser();

  if (!user) return redirect('/sign-in');

  return <SessionProvider user={user}>{children}</SessionProvider>;
};

export default DashboardLayout;
