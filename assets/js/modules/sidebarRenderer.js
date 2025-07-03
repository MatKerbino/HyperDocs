/**
 * Módulo para renderizar a barra de navegação lateral.
 */
function createNavList(routes) {
    const ul = document.createElement("ul");
    ul.className = "nav-list";
  
    routes.forEach((route) => {
      const li = document.createElement("li");
      li.className = "nav-item";
  
      const hasChildren = route.children && route.children.length > 0;
      const hasRoute = route.type === "html" || route.type === "md";
      const link = document.createElement("a");
      link.className = "nav-link";
      link.textContent = route.title;
  
      if (hasRoute) {
        if (route.type === "html") {
        link.href = `/${route.url}`;
        } else { 
        link.href = `/_partials/viewer.html?content=${route.path}`;
        }
      } else if (hasChildren) {
        link.classList.add("nav-link-bold");
        link.href = "#"; 
      }
  
      if (hasChildren) {
        li.classList.add("nav-item-category");
        const categoryHeader = document.createElement("div");
        categoryHeader.className = "nav-category-header";
        categoryHeader.appendChild(link);
  
        const toggle = document.createElement("span");
        toggle.className = "nav-toggle-arrow";
        toggle.textContent = "➤";
        categoryHeader.appendChild(toggle);
        li.appendChild(categoryHeader);
  
        const subList = createNavList(route.children); // Recursão
        subList.className = "nav-list nav-subcategory";
        li.appendChild(subList);
      } else {
        li.appendChild(link);
      }
  
      ul.appendChild(li);
    });
  
    return ul;
  }
  
  /**
   * Gera e insere a barra de navegação no container especificado.
   * @param {HTMLElement} containerElement - O elemento onde a sidebar será renderizada.
   * @param {Array} routes - O array de rotas.
   */
  export function renderSidebar(containerElement, routes) {
    if (!containerElement) return;
  
    const navList = createNavList(routes);
    containerElement.innerHTML = ""; // Limpa conteúdo anterior
    containerElement.appendChild(navList);
  }