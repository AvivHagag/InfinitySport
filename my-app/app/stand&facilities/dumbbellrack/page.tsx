import { getAllProducts } from "../../ServerAction/ServerAction";
import DumbbellRackComponent from "./DumbbellRackComponent";

export default async function Home() {
  const categoriesIDs = [11];
  const DumbbellRackProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Dumbbell Rack</h1>
      {DumbbellRackProducts && (
        <DumbbellRackComponent DumbbellRackProducts={DumbbellRackProducts} />
      )}
    </main>
  );
}
