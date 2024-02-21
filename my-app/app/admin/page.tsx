import AddProduct from "./AddProduct";
import CreateCatgory from "./CreateCatgory";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Welcome Admin</h1>
      <div className="mt-4">
        <AddProduct />
        <CreateCatgory />
      </div>
    </main>
  );
}
