import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import UserAccordion from "./UserCard";
const UserAccordionList = ({ users, loading, query }) => {
    const [openUserLogin, setOpenUserLogin] = useState(null);
    const toggleUser = (login) => {
        setOpenUserLogin((prev) => (prev === login ? null : login));
    };
    const showNoResult = !loading && query.trim() !== "" && users.length === 0;
    return (_jsx("div", { className: "mt-4 space-y-4 max-w-md mx-auto", children: loading ? (_jsx("div", { className: "flex justify-center items-center py-4", children: _jsx("div", { className: "w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" }) })) : loading && showNoResult ? (_jsx("p", { className: "text-center text-gray-500", children: "No users found." })) : (users.map((user) => (_jsx(UserAccordion, { user: user, isOpen: openUserLogin === user.login, onToggle: () => toggleUser(user.login) }, user.id)))) }));
};
export default UserAccordionList;
