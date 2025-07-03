/**
 * Módulo para carregar as rotas da aplicação.
 * Busca o arquivo JSON de rotas e o retorna.
 */
export async function fetchRoutes() {
    try {
      // Determina o caminho base dependendo de onde o script está sendo executado.
      const basePath = window.location.pathname.includes("viewer.html") ? "../" : "";
      const response = await fetch(`${basePath}routes/routes.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Rotas carregadas de:", response.url);
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar rotas:", error);
      // Propaga o erro para que o módulo principal possa lidar com ele.
      throw error;
    }
  }