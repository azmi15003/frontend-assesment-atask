import { useState } from "react";
import type { GitHubUser } from "../types/github";
import UserAccordion from "./UserCard";

type Props = {
  users: GitHubUser[];
  loading: boolean;
  query: string;
};

const UserAccordionList = ({ users, loading, query }: Props) => {
  const [openUserLogin, setOpenUserLogin] = useState<string | null>(null);

  const toggleUser = (login: string) => {
    setOpenUserLogin((prev) => (prev === login ? null : login));
  };

  const showNoResult = !loading && query.trim() !== "" && users.length === 0;

  return (
    <div className="mt-4 space-y-4 max-w-md mx-auto">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : loading && showNoResult ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        users.map((user) => (
          <UserAccordion
            key={user.id}
            user={user}
            isOpen={openUserLogin === user.login}
            onToggle={() => toggleUser(user.login)}
          />
        ))
      )}
    </div>
  );
};

export default UserAccordionList;
