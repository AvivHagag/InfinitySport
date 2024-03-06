import { getAllProducts } from "../../ServerAction/ServerAction";
import StandAndRacksComponent from "./StandAndRacksComponent";

export default async function Home() {
  const categoriesIDs = [13];
  const StandAndRacksProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Stand & Racks</h1>
      {StandAndRacksProducts && (
        <StandAndRacksComponent StandAndRacksProducts={StandAndRacksProducts} />
      )}
    </main>
  );
}
