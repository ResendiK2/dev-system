import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Desenvolvedores from "@/app/page";
import { useDevs } from "@/hooks/useDevs";

jest.mock("@/hooks/useDevs");

const mockedUseDevs = useDevs as jest.Mock;

// Create a new QueryClient instance
const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Desenvolvedores Page", () => {
  beforeEach(() => {
    mockedUseDevs.mockReturnValue({
      data: {
        data: [
          { id: 1, nome: "Dev 1", nivel: { nivel: "Junior" } },
          { id: 2, nome: "Dev 2", nivel: { nivel: "Pleno" } },
        ],
        meta: {
          currentPage: 1,
          totalPages: 1,
        },
      },
      isLoading: false,
    });
  });

  it("should render the page title", () => {
    renderWithQueryClient(<Desenvolvedores />);
    const title = screen.getByText(/Dev System/i);
    expect(title).toBeInTheDocument();
  });

  it("should render the search input", () => {
    renderWithQueryClient(<Desenvolvedores />);
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);
    expect(searchInput).toBeInTheDocument();
  });

  it("should render developers data in the table", () => {
    renderWithQueryClient(<Desenvolvedores />);
    const dev1 = screen.getByText("Dev 1");
    const dev2 = screen.getByText("Dev 2");
    expect(dev1).toBeInTheDocument();
    expect(dev2).toBeInTheDocument();
  });

  it("should call setQuery when typing in search input", () => {
    renderWithQueryClient(<Desenvolvedores />);
    const searchInput = screen.getByPlaceholderText(/Buscar.../i);
    fireEvent.change(searchInput, { target: { value: "Dev" } });
    expect(searchInput).toHaveValue("Dev");
  });
});
