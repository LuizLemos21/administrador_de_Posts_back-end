import axios from 'axios';

export async function postToLinkedIn(accessToken: string, message: string): Promise<void> {
  try {
    const response = await axios.post(
      `https://api.linkedin.com/v2/shares`,
      {
        content: {
          contentEntities: [
            {
              entityLocation: "https://www.example.com/content.html",
              thumbnails: [
                {
                  resolvedUrl: "https://www.example.com/image.jpg"
                }
              ]
            }
          ],
          title: "Test Share with Content"
        },
        distribution: {
          linkedInDistributionTarget: {}
        },
        owner: `urn:li:person:${accessToken}`, // Replace with actual owner URN
        subject: "Test Share Subject",
        text: {
          text: message
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );
    console.log("LinkedIn post response:", response.data);
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
    throw error;
  }
}
