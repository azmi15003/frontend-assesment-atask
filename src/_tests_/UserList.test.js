import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from "@testing-library/react";
import UserAccordion from "../components/UserCard";
const mockUser = {
    login: "mockuser",
    repos_url: "https://api.github.com/users/azminewasi/repos",
    id: 1,
    avatar_url: "https://example.com/avatar.png",
};
jest.mock("../store/githubStore", () => ({
    useGitHubStore: () => ({
        repos: {
            mockuser: [
                {
                    id: 1,
                    name: "mock-repo",
                    html_url: "https://github.com/mockuser/mock-repo",
                    description: "Test repository",
                    stargazers_count: 42,
                },
            ],
        },
        fetchRepos: jest.fn(),
    }),
}));
describe("UserAccordion", () => {
    test("renders user login", () => {
        render(_jsx(UserAccordion, { user: mockUser, isOpen: false, onToggle: jest.fn() }));
        expect(screen.getByText("mockuser")).toBeInTheDocument();
    });
    test("calls onToggle when clicked", () => {
        const onToggle = jest.fn();
        render(_jsx(UserAccordion, { user: mockUser, isOpen: false, onToggle: onToggle }));
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(onToggle).toHaveBeenCalledTimes(1);
    });
    test("shows repo list when open", () => {
        render(_jsx(UserAccordion, { user: mockUser, isOpen: true, onToggle: jest.fn() }));
        expect(screen.getByText("mock-repo")).toBeInTheDocument();
        expect(screen.getByText("Test repository")).toBeInTheDocument();
        expect(screen.getByText("42")).toBeInTheDocument();
    });
});
