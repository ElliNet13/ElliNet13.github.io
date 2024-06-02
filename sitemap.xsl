<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        line-height: 1.6;
                        background-color: #f4f4f4;
                    }
                    .container {
                        width: 80%;
                        margin: auto;
                        overflow: hidden;
                    }
                    h1 {
                        text-align: center;
                        padding: 20px;
                        background: #333;
                        color: #fff;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    li {
                        background: #fff;
                        margin: 10px 0;
                        padding: 10px;
                        border: #ccc 1px solid;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    a {
                        text-decoration: none;
                        color: #333;
                        font-weight: bold;
                    }
                    a:hover {
                        color: #0066cc;
                    }
                    .comment {
                        font-style: italic;
                        color: #666;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Sitemap</h1>
                    <ul>
                        <xsl:for-each select="urlset/url">
                            <li>
                                <div class="comment">
                                    <xsl:value-of select="substring-after(loc, 'https://ellinet13.github.io/')" />
                                </div>
                                <a href="{loc}">
                                    <xsl:value-of select="loc" />
                                </a>
                            </li>
                        </xsl:for-each>
                    </ul>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>