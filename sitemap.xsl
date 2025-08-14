<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - Everest Claims & Advisory</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background-color: #f8f9fa;
          }
          h1 {
            font-size: 24px;
            color: #1a365d;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            border-collapse: collapse;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            background-color: #fff;
          }
          th {
            background-color: #3b82f6;
            color: white;
            text-align: left;
            padding: 12px 15px;
          }
          td {
            padding: 10px 15px;
            border-bottom: 1px solid #e2e8f0;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          tr:hover {
            background-color: #f1f5f9;
          }
          .url {
            word-break: break-all;
          }
          .priority-high {
            color: #10b981;
            font-weight: bold;
          }
          .priority-medium {
            color: #f59e0b;
          }
          .priority-low {
            color: #64748b;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            color: #64748b;
            font-size: 12px;
          }
          a {
            color: #3b82f6;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>XML Sitemap - Everest Claims & Advisory</h1>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Last Modified</th>
              <th>Change Frequency</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td class="url">
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td>
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
                <td>
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td>
                  <xsl:attribute name="class">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt; 0.8">priority-high</xsl:when>
                      <xsl:when test="sitemap:priority &gt; 0.5">priority-medium</xsl:when>
                      <xsl:otherwise>priority-low</xsl:otherwise>
                    </xsl:choose>
                  </xsl:attribute>
                  <xsl:value-of select="sitemap:priority"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
        <div class="footer">
          Generated on <xsl:value-of select="current-dateTime()"/> | 
          <a href="https://www.everestclaims.com/">Everest Claims & Advisory</a>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>