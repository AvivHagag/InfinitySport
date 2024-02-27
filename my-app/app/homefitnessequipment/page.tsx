import { getAllHomeFitnessProducts } from "../ServerAction/ServerAction";
import FilterComponent from "./FilterComponent";
import ProductsList from "./ProductsList";

export default async function Home() {
  const HomeFitnessProducts = await getAllHomeFitnessProducts();
  console.log(HomeFitnessProducts);
  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-2">
      <h1>Home Fitness Equipment</h1>
      <div className="flex flex-row w-full">
        <FilterComponent />
        <div className="flex flex-grow">
          {HomeFitnessProducts ? (
            <ProductsList HomeFitnessProducts={HomeFitnessProducts} />
          ) : (
            <div className="text-base text-center">
              There are currently no products in the selected category
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
