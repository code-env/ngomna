import { db } from '@/lib/db';
import React from 'react';

interface ProfilePageProps {
  params: {
    profileId: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const user = await db.user.findFirst({
    where: {
      id: params.profileId,
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="fixed top-0 w-full left-0 h-screen overflow-y-auto bg-background">
      <div className="container">
        <div className="size-20 rounded-full bg-muted"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
