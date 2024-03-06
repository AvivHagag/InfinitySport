import { getAllProducts } from "../ServerAction/ServerAction";
import DumbbellsAndBarsComponent from "./DumbbellsAndBarsComponent";

export default async function Home() {
  const categoriesIDs = [6, 7, 8, 9, 10];
  const dumbbellsAndBarsProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Dumbbells & Bars</h1>
      {dumbbellsAndBarsProducts && (
        <DumbbellsAndBarsComponent
          dumbbellsAndBarsProducts={dumbbellsAndBarsProducts}
        />
      )}
    </main>
  );
}
