import { db } from "@/lib/db";
import React from "react";
import { Badge } from "@/components/ui/badge";

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

  const CarLicence = await db.carLicence.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="fixed top-0 w-full left-0 h-screen overflow-y-auto bg-background">
      <div className="min-h-screen max-w-2xl w-full mx-auto flex items-center p-10">
        <div className="flex flex-col gap-10 w-full">
          <div className="flex gap-2 items-center w-full">
            <div className="size-20 min-w-20 rounded-full bg-muted" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-2xl">{user.username}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            {CarLicence &&
              CarLicence.length > 0 &&
              CarLicence.map(licence => (
                <div className="flex flex-col gap-1 w-full" key={licence.id}>
                  <h3 className="font-semibold text-2xl ">Car Licences</h3>
                  <div className="w-full flex items-center justify-between">
                    <p className="flex items-center gap-2 ">
                      <span className="font-semibold">Name: </span>
                      <span>{licence.carId}</span>
                    </p>
                    <Badge>{licence.status}</Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
