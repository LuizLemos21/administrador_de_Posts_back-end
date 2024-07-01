import axios from 'axios';

export async function postToTwitter(accessToken: string, message: string): Promise<void> {
  try {
    const response = await axios.post(
      `https://api.twitter.com/2/tweets`,
      {
        text: message
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    console.log("Twitter post response:", response.data);
  } catch (error) {
    console.error("Error posting to Twitter:", error);
    throw error;
  }
}
