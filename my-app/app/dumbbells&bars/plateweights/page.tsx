import { getAllProducts } from "../../ServerAction/ServerAction";
import PlateWeightsComponent from "./PlateWeightsComponent";

export default async function Home() {
  const categoriesIDs = [7];
  const PlateWeightsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Plate Weights</h1>
      {PlateWeightsProducts && (
        <PlateWeightsComponent PlateWeightsProducts={PlateWeightsProducts} />
      )}
    </main>
  );
}
