import { Button } from '@/components/ui/button';
import Sidebar from '../_components/sidebar';
import TabsComponents from '../_components/tabs';
import Welcome from '../_components/welcome';

const VroumDashboard = async () => {
  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
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
        <TabsComponents />
      </main>
    </div>
  );
};

export default VroumDashboard;
