import { ReactNode } from 'react';
import { auth } from '@clerk/nextjs/server';
import { SessionProvider } from '@/providers/session-provider';

import { db } from '@/lib/db';

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) return null;

  return <SessionProvider user={user}>{children}</SessionProvider>;
};

export default DashboardLayout;
