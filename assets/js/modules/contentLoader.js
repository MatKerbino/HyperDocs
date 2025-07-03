// Importa a dependência no topo do módulo que a utiliza.
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

/**
 * Exibe uma mensagem de erro na área de conteúdo.
 * @param {HTMLElement} container - O elemento de conteúdo.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
function showError(container, message) {
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px; color: #6C757D;">
        <h2>Erro</h2>
        <p>${message}</p>
      </div>
    `;
  }
}

/**
 * Carrega, parseia e renderiza o conteúdo Markdown na página.
 * @param {HTMLElement} contentArea - O elemento onde o conteúdo será renderizado.
 */
export async function loadMarkdownContent(contentArea) {
  const urlParams = new URLSearchParams(window.location.search);
  const contentPath = urlParams.get("content");

  if (!contentPath) {
    showError(contentArea, "Nenhum conteúdo especificado.");
    return;
  }
  
  if (!contentArea) return;

  try {
    contentArea.innerHTML = '<div class="loading">Carregando...</div>';

    const response = await fetch(`/${contentPath}`);
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const markdownText = await response.text();
    contentArea.innerHTML = marked.parse(markdownText);

    // Atualiza o título da página
    const firstHeading = contentArea.querySelector("h1");
    if (firstHeading) {
      document.title = `${firstHeading.textContent} - Manual SIGP`;
    }
  } catch (error) {
    console.error("Erro ao carregar conteúdo:", error);
    showError(contentArea, `Erro ao carregar o conteúdo: ${error.message}`);
  }
}