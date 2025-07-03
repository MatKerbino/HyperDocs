import { fetchRoutes } from "./modules/routeLoader.js";
import { renderSidebar } from "./modules/sidebarRenderer.js";
import { loadMarkdownContent } from "./modules/contentLoader.js"; 
import { 
  setupCategoryToggle, 
  setupSidebarToggle, 
  setupMobileMenu,
  highlightActiveLink
} from "./modules/uiInteractions.js";

async function handleNavigation() {
  const contentArea = document.querySelector(".content-area");
  const sidebarNav = document.querySelector(".sidebar-nav");

  try {
    if (window.location.pathname.includes("viewer.html")) {
      await loadMarkdownContent(contentArea);
    }
    highlightActiveLink(sidebarNav); 
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    contentArea.innerHTML = `<p style="color:red;">Erro ao carregar o conteúdo.</p>`;
  }
}

async function main() {
  const sidebarNav = document.querySelector(".sidebar-nav");
  const contentArea = document.querySelector(".content-area");
  const container = document.querySelector(".container");
  const sidebarToggleBtn = document.querySelector(".sidebar-toggle-btn");
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  try {
    const routes = await fetchRoutes();
    renderSidebar(sidebarNav, routes);
    
    setupCategoryToggle(sidebarNav);
    setupSidebarToggle(sidebarToggleBtn, container);
    setupMobileMenu(mobileMenuBtn, sidebar, overlay);

    handleNavigation();

    document.addEventListener("click", (event) => {
      const link = event.target.closest('a.nav-link');
      if (link && link.href.includes("viewer.html")) {
        event.preventDefault(); 
        history.pushState(null, "", link.href); 
        handleNavigation();
      }
    });

    window.addEventListener("popstate", handleNavigation);

  } catch (error) {
    console.error("Falha na inicialização da aplicação:", error);
    if(contentArea) {
      contentArea.innerHTML = `<div style="text-align: center; padding: 40px; color: red;"><h2>Erro Crítico</h2><p>Não foi possível carregar a aplicação.</p></div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", main);
