export async function GET(request) {
   const { searchParams } = new URL(request.url);
  
   const text = searchParams.get('text');
   const channel = searchParams.get('channel');
   const type = searchParams.get('type');

   const url = new URL("https://www.googleapis.com/youtube/v3/search");

   url.searchParams.set("part", "snippet");
   url.searchParams.set("q", text);
   url.searchParams.set("type", type);
   url.searchParams.set("key", process.env.API_KEY);
  
   if (type === "video") {
       url.searchParams.set("videoDuration", "medium");
       url.searchParams.set("videoDefinition", "high");
       url.searchParams.set("maxResults", "20");
   }

   try {
       const response = await fetch(url.toString());
      
       if (!response.ok) {
           const errorText = await response.text();
           console.error("YouTube API Error:", errorText);
           throw new Error('Network response was not ok');
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