async function loadHeader(targetElement) {
  try {
    const response = await fetch("/_partials/header.html")
    const headerHTML = await response.text()

    const parser = new DOMParser()
    const doc = parser.parseFromString(headerHTML, "text/html")
    const bodyContent = doc.body.innerHTML

    targetElement.innerHTML = bodyContent

    const script = document.createElement("script")
    script.src = "/assets/js/main.js"
    document.body.appendChild(script)
  } catch (error) {
    console.error("Erro ao carregar header:", error)
  }
}
