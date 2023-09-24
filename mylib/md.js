customElements.define('markdown-renderer', class extends HTMLElement {
    constructor() {
        super();

        // Create a shadow DOM
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Check if the element has a 'src' attribute
        const src = this.getAttribute('src');
        if (src) {
            this.loadMarkdownWithDelay(src, shadowRoot);
        } else {
            this.renderMarkdownWithDelay(shadowRoot);
        }
    }

    renderMarkdownWithDelay(shadowRoot) {
        setTimeout(() => {
            const markdownText = this.textContent;
            const html = marked(markdownText);

            // Clear any existing content
            shadowRoot.innerHTML = '';
            
            // Append the rendered HTML to the shadow DOM
            shadowRoot.innerHTML = html;
        }, 3000); // Delay for 3 seconds (3000 milliseconds)
    }

    loadMarkdownWithDelay(file, shadowRoot) {
        setTimeout(() => {
            fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error(`Error loading: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(markdown => {
                    const html = marked(markdown);

                    // Clear any existing content
                    shadowRoot.innerHTML = '';
                    
                    // Append the rendered HTML to the shadow DOM
                    shadowRoot.innerHTML = html;
                })
                .catch(error => {
                    this.renderError(error.message, shadowRoot);
                    console.error(error);
                });
        }, 3000); // Delay for 3 seconds (3000 milliseconds)
    }

    renderError(errorMessage, shadowRoot) {
        // Clear any existing content
        shadowRoot.innerHTML = '';

        // Display the error message in the shadow DOM
        shadowRoot.textContent = errorMessage;

        // Use document.write to set a red background and display the error message
        document.write(`<style>body { background-color: red; }</style>Hey, an error happened while loading. Here's some details: ${errorMessage}`);
    }
});
