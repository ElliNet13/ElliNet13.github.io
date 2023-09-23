// Create a function to initialize the Markdown renderer
function initializeMarkdownRenderer() {
    customElements.define('markdown-renderer', class extends HTMLElement {
        constructor() {
            super();

            // Check if the element has a 'src' attribute
            const src = this.getAttribute('src');
            if (src) {
                this.loadMarkdown(src);
            } else {
                this.renderMarkdown();
            }
        }

        renderMarkdown() {
            const markdownText = this.textContent;
            const html = marked(markdownText);
            this.innerHTML = html;
        }

        loadMarkdown(file) {
            fetch(file)
                .then(response => response.text())
                .then(markdown => {
                    const html = marked(markdown);
                    this.innerHTML = html;
                })
                .catch(error => console.error(error));
        }
    });
}

// Load the 'marked.min.js' script dynamically
function loadMarkedScript() {
    const markedScript = document.createElement('script');
    markedScript.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    markedScript.onload = initializeMarkdownRenderer;
    document.head.appendChild(markedScript);
}

// Call the function to load the 'marked.min.js' script
loadMarkedScript();
