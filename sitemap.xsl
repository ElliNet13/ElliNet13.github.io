<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes"/>

    <!-- Template to match the root element -->
    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h1 {
                        color: #2c3e50;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                        text-align: left;
                    }
                    tr:hover {
                        background-color: #f5f5f5;
                    }
                </style>
            </head>
            <body>
                <h1>Site Sitemap</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Site Name</th>
                            <th>Site Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Apply template for each <url> element -->
                        <xsl:for-each select="//*[local-name()='url']">
                            <tr>
                                <!-- Site Name -->
                                <xsl:variable name="siteName" select="*[local-name()='name']"/>
                                <td>
                                    <xsl:value-of select="$siteName"/>
                                </td>
                                <!-- Site Link -->
                                <td>
                                    <a href="{*[local-name()='loc']}">
                                        <xsl:value-of select="*[local-name()='loc']"/>
                                    </a>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>

</xsl:stylesheet>