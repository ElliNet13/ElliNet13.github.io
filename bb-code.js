function replaceRegExp(strString, strPattern, strReplace) {
    let re = new RegExp(strPattern, 'g');
    return strString.replace(re, strReplace);
}

function bbCodeToHTML(strString) {
    strString = replaceRegExp(strString, /(http|ftp|https)(:\/\/[\w\-_]+)((\.[\w\-_]+)+)([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/g, '<a href="$1$2$3$5" target="_blank">$1$2$3$5</a>');
    strString = replaceRegExp(strString, /\[color=([^\]]*)\]([^\[]*)\[\/color\]/g, '<span style="color: $1;">$2</span>');
    strString = replaceRegExp(strString, /\[size=([^\]]*)\]([^\[]*)\[\/size\]/g, '<font size="$1">$2</font>');
    strString = replaceRegExp(strString, /\[font=([^\]]*)\]([^\[]*)\[\/font\]/g, '<span style="font-family: $1, Sans-Serif, Serif;">$2</span>');
    strString = replaceRegExp(strString, /\[quote=([^\]]*)\]([^\[]*)\[\/quote\]/g, '<div class="quote"><span style="font-weight: bold; font-size: 8pt;">$1 said:</span><pre class="quote1">$2</pre></div>');

    strString = strString.replace(/\[b\]/g, '<span style="font-weight: bold;">')
        .replace(/\[B\]/g, '<span style="font-weight: bold;">')
        .replace(/\[u\]/g, '<span style="text-decoration: underline;">')
        .replace(/\[U\]/g, '<span style="text-decoration: underline;">')
        .replace(/\[i\]/g, '<span style="font-style: italic;">')
        .replace(/\[I\]/g, '<span style="font-style: italic;">')
        .replace(/\[\/b\]/g, '</span>')
        .replace(/\[\/B\]/g, '</span>')
        .replace(/\[\/u\]/g, '</span>')
        .replace(/\[\/U\]/g, '</span>')
        .replace(/\[\/i\]/g, '</span>')
        .replace(/\[\/I\]/g, '</span>');

    strString = strString.replace(/\[li\]/g, '<li>')
        .replace(/\[\/li\]/g, '</li>');

    strString = strString.replace(/\[ol\]/g, '<ol>')
        .replace(/\[\/ol\]/g, '</ol>');

    strString = strString.replace(/\[ul\]/g, '<ul>')
        .replace(/\[\/ul\]/g, '</ul>');

    strString = strString.replace(/\[center\]/g, '<center>')
        .replace(/\[\/center\]/g, '</center>');

    return strString;
}

class BBCodeElement extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
            :host {
                font-family: 'Arial', sans-serif;
                color: #666;
            }
        `;
        shadow.appendChild(style);

        const content = document.createElement('div');
        content.innerHTML = bbCodeToHTML(this.innerHTML);
        shadow.appendChild(content);
    }
}

customElements.define('bb-code', BBCodeElement);
