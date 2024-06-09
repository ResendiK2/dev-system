import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Desenvolvedores from "@/app/page";
import { useDevs } from "@/hooks/useDevs";
import { IGetDesenvolvedores } from "@/utils/types";

jest.mock("@/hooks/useDevs");

const mockedUseDevs = useDevs as jest.Mock;

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("Desenvolvedores Page", () => {
  beforeEach(() => {
    const data: IGetDesenvolvedores = {
      data: [
        {
          id: 1,
          nome: "Dev 1",
          nivel: { nivel: "Junior", id: 1, n_desenvolvedores: 1 },
          nivel_id: 1,
          sexo: "M",
          data_nascimento: "1990-01-01",
          hobby: "Teste",
          idade: 31,
        },
        {
          id: 2,
          nome: "Dev 2",
          nivel: { nivel: "Pleno", id: 2, n_desenvolvedores: 1 },
          nivel_id: 2,
          sexo: "F",
          data_nascimento: "1990-01-01",
          hobby: "Teste",
          idade: 31,
        },
      ],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 2,
      },
    };

    mockedUseDevs.mockReturnValue({
      data,
      isLoading: false,
    });
  });

  it("should render the page title", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const title = screen.getByText(/Dev System/i);

    expect(title).toBeInTheDocument();
  });

  it("should render the 'Link para documentação' button", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const docsButton = screen.getByText(/Link para documentação/i);

    expect(docsButton).toBeInTheDocument();
  });

  it("should render the breadcrumb", () => {
    renderWithQueryClient(<Desenvolvedores />);
    const breadcrumb = screen.getByText(/Desenvolvedores/i);
    expect(breadcrumb).toBeInTheDocument();
  });

  it("should render the 'Ver Niveis' button", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const niveisButton = screen.getByText(/Ver Niveis/i);

    expect(niveisButton).toBeInTheDocument();
  });

  it("should render the DevForm component", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const devFormButton = screen.getByText(/Adicionar/i);

    expect(devFormButton).toBeInTheDocument();
  });

  it("should open DevForm modal when clicking on 'Adicionar' button", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const devFormButton = screen.getByText(/Adicionar/i);

    fireEvent.click(devFormButton);

    const modal = screen.getByText(/Adicionar Desenvolvedor/i);

    expect(modal).toBeInTheDocument();
  });

  it("should render the search input", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    expect(searchInput).toBeInTheDocument();
  });

  it("should call setQuery when typing in search input", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const searchInput = screen.getByPlaceholderText(/Buscar.../i);

    fireEvent.change(searchInput, { target: { value: "Dev" } });

    expect(searchInput).toHaveValue("Dev");
  });

  it("should render not found component when data is empty", () => {
    mockedUseDevs.mockReturnValue({
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

    renderWithQueryClient(<Desenvolvedores />);

    const notFound = screen.getByText(/Nenhum registro encontrado/i);

    expect(notFound).toBeInTheDocument();
  });

  it("should render loading component", () => {
    mockedUseDevs.mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithQueryClient(<Desenvolvedores />);

    const loading = screen.getByText(/Carregando.../i);
    expect(loading).toBeInTheDocument();
  });

  it("should render developers data in the table", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const dev1 = screen.getByText("Dev 1");
    const dev2 = screen.getByText("Dev 2");

    expect(dev1).toBeInTheDocument();
    expect(dev2).toBeInTheDocument();
  });

  it("should render pagination component", () => {
    renderWithQueryClient(<Desenvolvedores />);

    const pagination = screen.getByTestId("pagination");

    expect(pagination).toBeInTheDocument();
  });
});
