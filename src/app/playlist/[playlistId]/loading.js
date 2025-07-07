export default function Loading() {
   return (
       <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
           <div className="text-center">
               <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-400 mx-auto mb-4"></div>
               <h1 className="text-teal-200 text-2xl font-light">Loading playlist...</h1>
           </div>
       </div>
   );
} 