/**
 * Módulo para carregar as rotas da aplicação.
 * Busca o arquivo JSON de rotas e o retorna.
 */
export async function fetchRoutes() {
    try {
      // Com a tag <base> no HTML, podemos usar um caminho direto da raiz do projeto.
      const response = await fetch("routes/routes.json");
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