import { getAllProducts } from "../ServerAction/ServerAction";
import HomeFitnessComponent from "./HomeFitnessComponent";

export default async function Home() {
  const categoriesIDs = [1, 2, 3, 4, 5];
  const HomeFitnessProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Home Fitness Equipment</h1>
      {HomeFitnessProducts && (
        <HomeFitnessComponent HomeFitnessProducts={HomeFitnessProducts} />
      )}
    </main>
  );
}
