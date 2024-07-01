import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-[#face14]"></div>
    </div>
  );
};

export default LoadingOverlay;
// "use client";

// import React from "react";

// const LoadingOverlay = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
//       <div className="relative w-full max-w-sm">
//         <div className="absolute top-1/2 left-0 w-full h-1 bg-transparent overflow-hidden">
//           <div className="h-full bg-[#face14] animate-slide"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingOverlay;
