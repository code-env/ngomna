'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from '@/providers/session-provider';

const Welcome = () => {
  const { user } = useSession();
  return (
    <Card className="mb-8">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">
            Your license status:{' '}
            <span className="font-semibold text-green-600">Active</span>
          </p>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt={user?.username || 'nothing'}
          />
          <AvatarFallback>
            {user?.username ||
              ''
                .split(' ')
                .map(n => n[0])
                .join('')}
          </AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  );
};

export default Welcome;
