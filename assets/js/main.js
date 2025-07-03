import { fetchRoutes } from "./modules/routeLoader.js";
import { renderSidebar } from "./modules/sidebarRenderer.js";
// O nome da sua função era loadMarkdownContent, então vamos usá-lo
import { loadMarkdownContent } from "./modules/contentLoader.js"; 
import { 
  setupCategoryToggle, 
  setupSidebarToggle, 
  setupMobileMenu,
  highlightActiveLink
} from "./modules/uiInteractions.js";

// Função para lidar com a navegação e carregamento de conteúdo
async function handleNavigation() {
  const contentArea = document.querySelector(".content-area");
  const sidebarNav = document.querySelector(".sidebar-nav");

  try {
    // Apenas carrega o conteúdo se estivermos na página de visualização
    if (window.location.pathname.includes("viewer.html")) {
      await loadMarkdownContent(contentArea);
    }
    // Sempre destaca o link ativo após carregar um novo conteúdo
    highlightActiveLink(sidebarNav); 
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    contentArea.innerHTML = `<p style="color:red;">Erro ao carregar o conteúdo.</p>`;
  }
}

// Função principal de inicialização
async function main() {
  const sidebarNav = document.querySelector(".sidebar-nav");
  const contentArea = document.querySelector(".content-area");
  const container = document.querySelector(".container");
  const sidebarToggleBtn = document.querySelector(".sidebar-toggle-btn");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  try {
    // Configuração inicial que só precisa rodar uma vez
    const routes = await fetchRoutes();
    renderSidebar(sidebarNav, routes);
    
    setupCategoryToggle(sidebarNav);
    setupSidebarToggle(sidebarToggleBtn, container);
    setupMobileMenu(mobileMenuBtn, sidebar, overlay);

    // Carrega o conteúdo da página inicial
    handleNavigation();

    // --- CÓDIGO NOVO E CRÍTICO ADICIONADO ABAIXO ---

    // 1. Ouve todos os cliques na página para fazer a navegação SPA
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a.nav-link');
      // Se o clique foi em um link de navegação para o viewer...
      if (link && link.href.includes("viewer.html")) {
        event.preventDefault(); // Impede o recarregamento da página
        // Atualiza a URL na barra de endereços
        history.pushState(null, "", link.href); 
        // Carrega o novo conteúdo
        handleNavigation();
      }
    });

    // 2. Ouve os botões de voltar/avançar do navegador
    window.addEventListener("popstate", handleNavigation);

  } catch (error) {
    console.error("Falha na inicialização da aplicação:", error);
    if(contentArea) {
      contentArea.innerHTML = `<div style="text-align: center; padding: 40px; color: red;"><h2>Erro Crítico</h2><p>Não foi possível carregar a aplicação.</p></div>`;
    }
  }
}

// Roda a função principal quando o HTML estiver pronto
document.addEventListener("DOMContentLoaded", main);