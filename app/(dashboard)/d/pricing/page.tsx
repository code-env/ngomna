import VroumPricing from "@/components/ui/pricing"
import { useCurrentUser } from "@/hooks/use-current-user"
import { redirect } from "next/navigation"


const Page = async() => {

  const current_user = await useCurrentUser()
  console.log("current_user", current_user)

  if (!current_user){
    return redirect('/login')
  }


  return (
    <div>
      <VroumPricing params={{userId: current_user.id, email:current_user.email}}/>
    </div>
  )
}

export default Page