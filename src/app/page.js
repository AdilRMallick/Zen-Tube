"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
 const [input, changeInput] = useState("");
 const router = useRouter();


 const handleInputChange = (e) => {
   changeInput(e.target.value);
 };


 const handleSubmit = (e) => {
   e.preventDefault();
   if (input.trim() !== "") {
     router.push(`/search/${encodeURIComponent(input)}`);
   }
 };


 return (
   <div className="w-screen h-screen flex items-center justify-center flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
     <div className="flex m-3 p-3">
       <div className="w-fit h-fit flex items-center justify-center p-1">
         <h1 className="italic text-teal-300 text-4xl font-light">Zen</h1>
       </div>
       <div className="bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center p-1 rounded-lg shadow-lg">
         <h1 className="text-white text-4xl font-medium">Tube</h1>
       </div>
     </div>


     <div className="mt-6 w-full flex justify-center">
       <form onSubmit={handleSubmit} className="w-full max-w-2xl px-4 flex gap-2">
         <input
           value={input}
           onChange={handleInputChange}
           type="text"
           className="bg-slate-800/50 text-white pl-4 pr-4 py-3 rounded-full w-full text-lg outline-none focus:ring-2 focus:ring-teal-400 border border-slate-600 backdrop-blur-sm"
           placeholder="Search for something..."
         />
         <button
           type="submit"
           className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 rounded-full text-lg hover:from-teal-600 hover:to-blue-700 active:from-teal-700 active:to-blue-800 transition-all duration-150 cursor-pointer shadow-lg"
         >
           Search
         </button>
       </form>
     </div>


     <div className="mt-10 flex flex-wrap justify-center gap-4">
       <button
         onClick={() => {
           if (input.trim() !== "") {
             router.push(`/playlist-search/${encodeURIComponent(input)}`);
           }
         }}
         className="bg-slate-700/50 text-teal-200 px-4 py-2 rounded-2xl hover:bg-slate-600/50 active:bg-slate-800/50 transition-all duration-200 border border-slate-600 backdrop-blur-sm"
       >
         Search Playlists
       </button>


       <button
         onClick={() => {
           if (input.trim() !== "") {
             router.push(`/playlist/${encodeURIComponent(input)}`);
           }
         }}
         className="bg-slate-700/50 text-teal-200 px-4 py-2 rounded-2xl hover:bg-slate-600/50 active:bg-slate-800/50 transition-all duration-200 border border-slate-600 backdrop-blur-sm"
       >
         Search Playlist ID
       </button>


       <button
         onClick={() => {
           if (input.trim() !== "") {
             router.push(`/video/${encodeURIComponent(input)}`);
           }
         }}
         className="bg-slate-700/50 text-teal-200 px-4 py-2 rounded-2xl hover:bg-slate-600/50 active:bg-slate-800/50 transition-all duration-200 border border-slate-600 backdrop-blur-sm"
       >
         Search Video ID
       </button>
     </div>
   </div>
 );
}