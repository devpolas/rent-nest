import type { MeResponse } from "@/types/user";

import AccountActions from "./account-actions";
import RoleOverview from "./role-overview";

type Props = {
  user: MeResponse;
};

export default function ProfileSidebar({ user }: Props) {
  return (
    <aside>
      <div
        className='top-24 sticky space-y-6'
      >
        <AccountActions />
        <RoleOverview user={user} />
      </div>
    </aside>
  );
}
