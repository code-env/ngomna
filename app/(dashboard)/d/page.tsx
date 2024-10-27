import { useCurrentUser } from "@/hooks/use-current-user";
import Buttons from "../_components/buttons";
import TabsComponents from "../_components/tabs";
import Welcome from "../_components/welcome";

const VroumDashboard = async () => {
  const user = await useCurrentUser();

  if (!user) return;

  return (
    <>
      <Welcome />
      <Buttons />
      <TabsComponents user={user} />
    </>
  );
};

export default VroumDashboard;
