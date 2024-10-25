// import { auth } from "@clerk/nextjs";
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export async function useCurrentUser() {
  try {
    const user = await currentUser();

    if (!user) return;

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });

    if (userInDb) return userInDb;

    const username = user.emailAddresses[0].emailAddress.split('@')[0];

    const createNewUserInDb = await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        username,
      },
    });

    return createNewUserInDb;
  } catch (error: any) {
    console.log(error.message);
  }
}
