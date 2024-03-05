import { getAllProducts } from "../../ServerAction/ServerAction";
import ExerciseBikeComponent from "./ExerciseBikeComponent";

export default async function Home() {
  const categoriesIDs = [5];
  const ExercisebikeProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Exercise Bike</h1>
      {ExercisebikeProducts && (
        <ExerciseBikeComponent ExercisebikeProducts={ExercisebikeProducts} />
      )}
    </main>
  );
}
