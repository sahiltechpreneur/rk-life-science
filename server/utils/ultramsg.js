/**
 * Sends a WhatsApp message using the UltraMsg API.
 * 
 * @param {string} to - The phone number to send to (e.g., "97798XXXXXXXX").
 * @param {string} body - The message content.
 */
const sendWhatsAppMessage = async (to, body) => {
    try {
        const instanceId = process.env.ULTRAMSG_INSTANCE_ID;
        const token = process.env.ULTRAMSG_TOKEN;

        // Skip if credentials are not configured or still placeholder
        if (!instanceId || !token || instanceId === 'your_instance_id_here' || token === 'your_token_here') {
            console.log("UltraMsg: Credentials not configured. Skipping WhatsApp message.");
            return false;
        }

        // Clean up the phone number and ensure format
        // UltraMsg typically requires country code but no '+' character.
        let formattedTo = String(to).replace(/\+/g, '').replace(/ /g, '');
        if (formattedTo.length === 10) {
            formattedTo = '977' + formattedTo; 
        }

        const url = `https://api.ultramsg.com/${instanceId}/messages/chat`;
        
        const params = new URLSearchParams({
            token: token,
            to: formattedTo,
            body: body,
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        });

        const data = await response.json();
        
        if (response.ok) {
            console.log(`UltraMsg: Successfully sent message to ${formattedTo}`);
            return true;
        } else {
            console.error(`UltraMsg API Error: ${JSON.stringify(data)}`);
            return false;
        }
    } catch (error) {
        console.error("UltraMsg Request Failed:", error);
        return false;
    }
};

module.exports = { sendWhatsAppMessage };
