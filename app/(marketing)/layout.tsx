import React, { ReactNode } from 'react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

const MarketingLayout = async ({ children }: { children: ReactNode }) => {
  const { userId } = await auth();

  if (userId) {
    const user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (user && user.role === 'ADMIN') {
      redirect('/admin');
    }

    return redirect('/d');
  }

  return <div>{children}</div>;
};

export default MarketingLayout;
