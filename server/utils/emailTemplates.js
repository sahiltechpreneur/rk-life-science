const getEmailTemplate = (title, content, footer = "© 2024 R. K. Life Science. All rights reserved.") => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            .container {
                font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9fbf9;
            }
            .header {
                background-color: #2E6F40;
                padding: 30px;
                text-align: center;
                border-radius: 12px 12px 0 0;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 24px;
            }
            .content {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 0 0 12px 12px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.03);
                color: #253D2C;
                line-height: 1.6;
            }
            .otp {
                font-size: 32px;
                font-weight: 800;
                color: #2E6F40;
                letter-spacing: 5px;
                text-align: center;
                margin: 30px 0;
                padding: 20px;
                background-color: #CFFFDC;
                border-radius: 8px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #2E6F40;
                color: #ffffff;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                margin-top: 20px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #68BA7F;
            }
            .order-table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
            }
            .order-table th {
                text-align: left;
                border-bottom: 2px solid #CFFFDC;
                padding: 10px;
                font-size: 14px;
            }
            .order-table td {
                padding: 10px;
                border-bottom: 1px solid #f0f0f0;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>${title}</h1>
            </div>
            <div class="content">
                ${content}
            </div>
            <div class="footer">
                ${footer}
                <br>
                R. K. Life Science, Nepal
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { getEmailTemplate };
