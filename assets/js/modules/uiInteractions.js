/**
 * Módulo para configurar todas as interações do usuário com a UI.
 */

/**
 * Configura o toggle para expandir/recolher categorias na sidebar.
 * Usa delegação de eventos para performance.
 * @param {HTMLElement} navContainer - O container da navegação.
 */
export function setupCategoryToggle(navContainer) {
    if (!navContainer) return;
  
    navContainer.addEventListener("click", (event) => {
      const categoryHeader = event.target.closest(".nav-category-header");

      // Se o clique não foi dentro de um cabeçalho de categoria, não faz nada.
      if (!categoryHeader) return;

      const link = categoryHeader.querySelector(".nav-link");
      const isArrowClick = event.target.classList.contains("nav-toggle-arrow");

      // Expande/recolhe o menu se o clique foi na seta OU em um link que não é uma página.
      if (isArrowClick || (link && link.getAttribute("href") === "#")) {
        event.preventDefault();
        const categoryItem = categoryHeader.closest(".nav-item-category");
        if (categoryItem) {
          categoryItem.classList.toggle("open");
        }
      }
    });
  }
  
  /**
   * Configura o botão que colapsa/expande a sidebar na versão desktop.
   * @param {HTMLElement} toggleBtn - O botão de toggle.
   * @param {HTMLElement} container - O container principal da aplicação.
   */
  export function setupSidebarToggle(toggleBtn, container) {
    if (!toggleBtn || !container) return;
    toggleBtn.addEventListener("click", () => {
      container.classList.toggle("sidebar-collapsed");
    });
  }
  
  /**
   * Configura o menu mobile (botão hambúrguer e overlay).
   * @param {HTMLElement} mobileBtn - O botão do menu mobile.
   * @param {HTMLElement} sidebar - O elemento da sidebar.
   * @param {HTMLElement} overlay - O elemento do overlay.
   */
  export function setupMobileMenu(mobileBtn, sidebar, overlay) {
    if (!mobileBtn || !sidebar || !overlay) return;
  
    const closeMenu = () => {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    };
  
    mobileBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      overlay.classList.toggle("show");
    });
  
    overlay.addEventListener("click", closeMenu);
  }
  
  
  /**
   * Destaca o link ativo na sidebar e expande as categorias pai.
   * @param {HTMLElement} navContainer - O container da navegação.
   */
  export function highlightActiveLink(navContainer) {
      const currentUrl = window.location.href;
      const contentParam = new URLSearchParams(window.location.search).get("content");
  
      navContainer.querySelectorAll(".nav-link").forEach(link => {
          link.classList.remove("active");
          let isActive = false;
  
          if (contentParam && link.href.includes(`content=${contentParam}`)) {
              isActive = true;
          } else if (!contentParam && link.href === currentUrl) {
              isActive = true;
          }
  
          if (isActive) {
              link.classList.add("active");
              let parent = link.closest(".nav-item-category");
              while (parent) {
                  parent.classList.add("open");
                  parent = parent.parentElement.closest(".nav-item-category");
              }
          }
      });
  }