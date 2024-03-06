import { getAllProducts } from "../../ServerAction/ServerAction";
import TreadmillComponent from "./TreadmillComponent";

export default async function Home() {
  const categoriesIDs = [1];
  const TreadmillProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Treadmill</h1>
      {TreadmillProducts && (
        <TreadmillComponent TreadmillProducts={TreadmillProducts} />
      )}
    </main>
  );
}
