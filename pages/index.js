import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex ite justify-between">
        <div>Hello, <b>{session?.user?.name}</b></div>
        <div className="flex justify-center items-center bg-blue-200 text-black gap-1 rounded-lg overflow-hidden p-1">
          <img src={session?.user?.image} className="h-8 w-8 rounded-full" alt="User Photo" />
          <small>{session?.user.name}</small>
        </div>
      </div>
    </Layout>
  )
}
