import { getAllProducts } from "../../ServerAction/ServerAction";
import HandWeightsComponent from "./HandWeightsComponent";

export default async function Home() {
  const categoriesIDs = [6];
  const HandWeightsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Hand Weights</h1>
      {HandWeightsProducts && (
        <HandWeightsComponent HandWeightsProducts={HandWeightsProducts} />
      )}
    </main>
  );
}
