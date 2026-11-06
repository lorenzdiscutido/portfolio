import { render, screen } from "@testing-library/react";
import Hero from "@/components/Hero";

describe("Hero Component", () => {
  it("renders the user's name", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Hi, I'm Lorenz\./i);
  });

  it("renders the CTA links for View Projects and Contact Me", () => {
    render(<Hero />);
    const projectsLink = screen.getByRole("link", { name: /View Projects/i });
    const contactLink = screen.getByRole("link", { name: /Contact Me/i });

    expect(projectsLink).toBeInTheDocument();
    expect(projectsLink).toHaveAttribute("href", "#projects");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "#contact");
  });
});
