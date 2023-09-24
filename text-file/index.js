class TextFile extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const src = this.getAttribute("src");

        if (src) {
            fetch(src)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error(`An error occurred while loading the file: ${response.status} ${response.statusText}`);
                    }
                })
                .then(data => {
                    this.innerHTML = data;
                })
                .catch(error => {
                    console.error("Error loading the file:", error);
                    this.innerHTML = `An error occurred while loading the file here are some details: ${error.message}`;
                });
        } else {
            this.innerHTML = "Please put an src attribute.";
        }
    }
}

customElements.define('text-file', TextFile);
