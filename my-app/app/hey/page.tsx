// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1>Hey</h1>
//     </main>
//   );
// }

"use client";
import React, { useState, useEffect } from "react"; // Import useEffect and useState
import Loading from "../loading";

export default function Home() {
  const [loading, setLoading] = useState(true); // Set loading state
  const hey = "hey";

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulates fetching data
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>{hey}</h1>
    </main>
  );
}
