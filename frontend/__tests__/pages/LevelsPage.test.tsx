import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Niveis from "@/app/niveis/page";
import { useLevels } from "@/hooks/useLevels";
import { IGetNiveis } from "@/utils/types";

jest.mock("@/hooks/useLevels");

const mockedUseLevels = useLevels as jest.Mock;

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Niveis Page", () => {
  beforeEach(() => {
    const data: IGetNiveis = {
      data: [
        {
          id: 1,
          nivel: "Junior",
          n_desenvolvedores: 5,
        },
        {
          id: 2,
          nivel: "Pleno",
          n_desenvolvedores: 10,
        },
      ],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
      },
    };

    mockedUseLevels.mockReturnValue({
      data,
      isLoading: false,
    });
  });

  it("should render the page title", () => {
    renderWithQueryClient(<Niveis />);

    const title = screen.getByTestId("title");

    expect(title).toBeInTheDocument();
  });

  it("should render the breadcrumb", () => {
    renderWithQueryClient(<Niveis />);

    const breadcrumb = screen.getByTestId("breadcrumbs");

    expect(breadcrumb).toBeInTheDocument();
  });

  it("should render the 'Voltar para Desenvolvedores' button", () => {
    renderWithQueryClient(<Niveis />);

    const backButton = screen.getByText(/Voltar para Desenvolvedores/i);

    expect(backButton).toBeInTheDocument();
  });

  it("should render the LevelForm component", () => {
    renderWithQueryClient(<Niveis />);

    const levelFormButton = screen.getByText(/Adicionar/i);

    expect(levelFormButton).toBeInTheDocument();
  });

  it("should render the search input", () => {
    renderWithQueryClient(<Niveis />);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    expect(searchInput).toBeInTheDocument();
  });

  it("should call setQuery when typing in search input", () => {
    renderWithQueryClient(<Niveis />);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    fireEvent.change(searchInput, { target: { value: "Pleno" } });

    expect(searchInput).toHaveValue("Pleno");
  });

  it("should render levels data in the table", () => {
    renderWithQueryClient(<Niveis />);

    const level1 = screen.getByText("Junior");
    const level2 = screen.getByText("Pleno");

    expect(level1).toBeInTheDocument();
    expect(level2).toBeInTheDocument();
  });

  it("should render not found component when data is empty", () => {
    mockedUseLevels.mockReturnValue({
      data: {
        data: [],
        meta: {
          currentPage: 1,
          totalPages: 1,
          lastPage: 1,
          total: 0,
        },
      },
      isLoading: false,
    });

    renderWithQueryClient(<Niveis />);

    const notFound = screen.getByText(/Nenhum registro encontrado/i);

    expect(notFound).toBeInTheDocument();
  });

  it("should render loading component", () => {
    mockedUseLevels.mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithQueryClient(<Niveis />);

    const loading = screen.getByText(/Carregando.../i);
    expect(loading).toBeInTheDocument();
  });

  it("should render pagination component", () => {
    renderWithQueryClient(<Niveis />);

    const pagination = screen.getByTestId("pagination");

    expect(pagination).toBeInTheDocument();
  });
});
