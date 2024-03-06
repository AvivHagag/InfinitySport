import { getAllProducts } from "../../ServerAction/ServerAction";
import RowingMachineComponent from "./RowingMachineComponent";

export default async function Home() {
  const categoriesIDs = [3];
  const RowingmachineProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Rowing Machine</h1>
      {RowingmachineProducts && (
        <RowingMachineComponent RowingmachineProducts={RowingmachineProducts} />
      )}
    </main>
  );
}
