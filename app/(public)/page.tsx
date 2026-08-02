import { getSession } from "@/lib/actions/auth.actions";
import { getMe } from "@/lib/actions/user.actions";

export default async function Home() {
  let me;
  const session = await getSession();
  console.log(session);
  if (session) {
    me = await getMe();
  }
  console.log(me);
  return <div>{me?.data?.user.name}</div>;
}
