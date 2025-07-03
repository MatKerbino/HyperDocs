# Template de Documentação Dinâmica

Bem-vindo ao agente template de documentação! Este é um sistema leve, rápido e moderno para criar manuais e documentações, construído com JavaScript puro, HTML e CSS. Ele funciona como uma **Aplicação de Página Única (SPA)**, proporcionando uma experiência de usuário fluida e sem recarregamentos de página.

## ✨ Funcionalidades

*   **Navegação Dinâmica:** O menu lateral é gerado automaticamente a partir de um único arquivo de configuração (`routes.json`).
*   **Experiência SPA:** O conteúdo é carregado na página sem a necessidade de um reload completo, tornando a navegação instantânea.
*   **Suporte Híbrido:** Crie conteúdo facilmente usando arquivos **Markdown** (`.md`) para documentação padrão ou páginas **HTML** completas para layouts personalizados.
*   **Sem Build Step:** Não há necessidade de compiladores ou pacotes complexos. Basta editar os arquivos e abrir o `index.html` em um servidor web.
*   **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, de desktops a dispositivos móveis.
*   **Fácil de Personalizar e Implantar:** A estrutura de arquivos é simples e a implantação pode ser feita em qualquer servidor web estático.

## 🚀 Como Funciona

A arquitetura do projeto é projetada para ser simples e modular. O fluxo principal é o seguinte:

1.  **Inicialização:** O usuário acessa o `index.html`, que serve como a "casca" da aplicação.
2.  **Carregamento do Roteador:** O script principal (`assets/js/main.js`) é executado e imediatamente busca o arquivo `routes/routes.json` para obter o mapa de toda a documentação.
3.  **Renderização do Menu:** Com base no JSON, o menu de navegação é construído dinamicamente na barra lateral. O sistema suporta categorias e submenus aninhados.
4.  **Carregamento de Conteúdo:**
    *   Se uma rota é do tipo `md`, o link aponta para um visualizador (`_partials/viewer.html`) que recebe o caminho do arquivo Markdown como parâmetro (ex: `?content=repository/arquivo.md`). O visualizador então busca, converte e exibe o conteúdo Markdown.
    *   Se uma rota é do tipo `html`, o link aponta diretamente para o arquivo HTML correspondente em `pages/`.

Essa abordagem combina a simplicidade da edição de arquivos Markdown com a flexibilidade de páginas HTML completas.

## 🛠️ Como Usar

Para criar sua própria documentação usando este template, siga estes passos:

1.  **Defina a Navegação:**
    Abra o arquivo `routes/routes.json` e edite a estrutura para refletir os tópicos do seu manual. Você pode adicionar, remover ou aninhar itens.

    ```json
    [
      {
        "title": "Seu Primeiro Tópico",
        "type": "md",
        "path": "repository/seu-arquivo.md"
      },
      {
        "title": "Página Customizada",
        "type": "html",
        "url": "pages/sua-pagina.html"
      },
      {
        "title": "Categoria com Sub-itens",
        "children": [
          {
            "title": "Sub-item 1",
            "type": "md",
            "path": "repository/sub-item1.md"
          }
        ]
      }
    ]
    ```

2.  **Adicione seu Conteúdo:**
    *   Para conteúdo em **Markdown**, crie novos arquivos `.md` dentro da pasta `repository/`.
    *   Para páginas **HTML personalizadas**, crie novos arquivos `.html` dentro da pasta `pages/`.

3.  **Personalize a Aparência:**
    *   Altere o título principal no `index.html`.
    *   Modifique as cores, fontes e outros estilos no arquivo `assets/css/style.css`.

É isso! Agora você pode abrir o `index.html` (preferencialmente através de um servidor local, como o Live Server do VS Code) para ver seu manual em ação.

## 🤝 Contribuições

Colaborações são muito bem-vindas! Se você tem ideias para novas funcionalidades, adição de páginas, melhorias ou encontrou algum bug, sinta-se à vontade para contribuir.

**Áreas para contribuição:**
*   Implementação de uma funcionalidade de busca.
*   Criação de novos temas de cores.
*   Melhorias na acessibilidade (ARIA).
*   Otimização do código JavaScript.
*   Correção de bugs.

**Para contribuir, siga estes passos:**

1.  **Faça um Fork** do repositório.
2.  **Crie uma nova Branch:** `git checkout -b feature/minha-nova-feature`
3.  **Faça suas alterações** e realize o commit: `git commit -m 'Adiciona: Minha Nova Feature'`
4.  **Envie para a sua Branch:** `git push origin feature/minha-nova-feature`
5.  **Abra um Pull Request** para que possamos revisar suas alterações.

## 📄 Licença

Este projeto é distribuído sob a licença MIT.
