import { getAllProducts } from "../../ServerAction/ServerAction";
import GymBarbellComponent from "./GymBarbellComponent";

export default async function Home() {
  const categoriesIDs = [10];
  const GymBarbellProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Gym Barbell</h1>
      {GymBarbellProducts && (
        <GymBarbellComponent GymBarbellProducts={GymBarbellProducts} />
      )}
    </main>
  );
}
