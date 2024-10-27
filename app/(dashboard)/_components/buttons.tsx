'use client';

import { Button } from '@/components/ui/button';
import { useModalsStore } from '@/providers/modals';

const Buttons = () => {
  const { onOpen } = useModalsStore();

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <Button onClick={onOpen} size="lg" className="w-full">
        Upload License
      </Button>
      <Button size="lg" variant="default" className="w-full">
        Update Profile
      </Button>
      <Button size="lg" variant="default" className="w-full">
        Contact Support
      </Button>
    </div>
  );
};

export default Buttons;
