export async function GET(request) {
   const { searchParams } = new URL(request.url);
   const playlistId = searchParams.get("playlistId");

   const url = new URL("https://www.googleapis.com/youtube/v3/playlists");
   url.searchParams.set("part", "snippet,contentDetails");
   url.searchParams.set("id", playlistId);
   url.searchParams.set("key", process.env.API_KEY);

   try {
       const response = await fetch(url.toString());

       if (!response.ok) {
           const errorText = await response.text();
           console.error("YouTube API Error:", errorText);
           throw new Error("Failed to fetch playlist details");
       }

       const data = await response.json();

       return new Response(JSON.stringify(data), {
           status: 200,
           headers: { 'Content-Type': 'application/json' }
       });
   } catch (error) {
       return new Response(JSON.stringify({ error: error.message }), {
           status: 500,
           headers: { 'Content-Type': 'application/json' }
       });
   }
} 