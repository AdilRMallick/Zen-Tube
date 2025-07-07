export async function GET(request) {
   // get the parameters from the request
   const { searchParams } = new URL(request.url);
   const videoId = searchParams.get("videoId");

   // Build the url to call the API
   const url = new URL("https://www.googleapis.com/youtube/v3/videos");
   url.searchParams.set("part", "snippet,contentDetails,statistics");
   url.searchParams.set("id", videoId);
   url.searchParams.set("key", process.env.API_KEY);

   // make the attempt to call the API
   try {
       const response = await fetch(url.toString());

       // we can check if it went okay, if not we want to raise
       // an error to show the API access was unsuccessful
       if (!response.ok) {
           const errorText = await response.text();
           console.error("YouTube API Error:", errorText);
           throw new Error("Failed to fetch video details");
       }

       // If it is fine, that means we can take the JSON
       // string and convert to a JSON Object so we can parse
       // the data
       const data = await response.json();

       // since this was successful, we return a Response
       // with the status 200, and a json string of the data
       return new Response(JSON.stringify(data), {
           status: 200,
           headers: { 'Content-Type': 'application/json' }
       });
   } catch (error) {
       // If the API ends up not working, return why it did not
       // work, and make the status 500
       return new Response(JSON.stringify({ error: error.message }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' }
       });
   }
} 