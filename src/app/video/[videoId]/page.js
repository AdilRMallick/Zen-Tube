"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Content() {
  const { videoId } = useParams();

  // since this will be rendered later, since embed is an API
  // we can use useState() to set the video
  const [video, setVideo] = useState(null);

  // fetch the video and set it to the video variable
  // if there is one
  // review useEffect and useState if this seems confusing
  useEffect(() => {
    const fetchVideo = async () => {
      const res = await fetch(`/api/video?videoId=${encodeURIComponent(videoId)}`, { cache: "force-cache" });
      const vid = await res.json();
      setVideo(vid?.items?.[0] ?? null);
    };

    fetchVideo();
  }, [videoId]);

  // get the snippet from the video to extract
  const title = video?.snippet?.title ?? "No title";
  const description = video?.snippet?.description ?? "No description";

  // now display all the information
  return (
    <>
      <div className="h-lvh w-lvw flex flex-col items-center justify-start text-white bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <h1 className="text-3xl p-2 m-2 text-teal-200 font-light">{title}</h1>
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600 backdrop-blur-sm shadow-xl">
          <iframe
            width="960"
            height="540"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
        <div className="flex items-center justify-between max-h-1/4 w-full max-w-5xl p-4 mt-4 bg-slate-800/50 rounded-lg border border-slate-600 backdrop-blur-sm overflow-scroll"> 
          <p className="mt-4 text-gray-300">{description}</p>
        </div>
      </div>
    </>
  );
}

