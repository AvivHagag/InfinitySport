import { getAllProducts } from "../../ServerAction/ServerAction";
import CrossoverComponent from "./CrossoverComponent";

export default async function Home() {
  const categoriesIDs = [2];
  const CrossoverProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Cross Over</h1>
      {CrossoverProducts && (
        <CrossoverComponent CrossoverProducts={CrossoverProducts} />
      )}
    </main>
  );
}
