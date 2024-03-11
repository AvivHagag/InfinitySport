import Contactus from "./Contactus";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen pt-8 pb-16 px-2 sm:px-4">
      <div className="flex items-center justify-center mt-4">
        <Contactus />
      </div>
    </main>
  );
}
