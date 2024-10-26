import { Button } from '@/components/ui/button';
import Sidebar from '../_components/sidebar';
import TabsComponents from '../_components/tabs';
import Welcome from '../_components/welcome';
import { useCurrentUser } from '@/hooks/use-current-user';

const VroumDashboard = async () => {
  const user = await useCurrentUser();

  if (!user) return;

  return (
    <>
      <Welcome />
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Button size="lg" className="w-full">
          Renew License
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          Update Profile
        </Button>
        <Button size="lg" variant="outline" className="w-full">
          Contact Support
        </Button>
      </div>
      <TabsComponents user={user} />
    </>
  );
};

export default VroumDashboard;
