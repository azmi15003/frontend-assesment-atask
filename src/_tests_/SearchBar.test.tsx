import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar component", () => {
  test("renders SearchBar and triggers onSearchBar when button clicked", () => {
    const handleSearchBar = jest.fn();
    render(<SearchBar onSearchBar={handleSearchBar} />);

    const input = screen.getByPlaceholderText("Search GitHub username...");

    fireEvent.change(input, { target: { value: "query" } });

    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    expect(handleSearchBar).toHaveBeenCalledWith("query");
    expect(handleSearchBar).toHaveBeenCalledTimes(1);
  });

  test("triggers onSearchBar when Enter key is pressed", () => {
    const handleSearchBar = jest.fn();
    render(<SearchBar onSearchBar={handleSearchBar} />);

    const input = screen.getByPlaceholderText("Search GitHub username...");

    fireEvent.change(input, { target: { value: "query" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleSearchBar).toHaveBeenCalledWith("query");
    expect(handleSearchBar).toHaveBeenCalledTimes(1);
  });
});
