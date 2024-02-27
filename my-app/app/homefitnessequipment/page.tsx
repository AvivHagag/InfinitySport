import Link from "next/link";
import { getAllHomeFitnessProducts } from "../ServerAction/ServerAction";
import FilterComponent from "./FilterComponent";
import ProductsList from "./ProductsList";

export default async function Home() {
  const HomeFitnessProducts = await getAllHomeFitnessProducts();
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Home Fitness Equipment</h1>
      <div className="p-2 flex text-sm sm:text-base text-gray-500 space-x-1">
        <Link href="/" className="hover:scale-105">
          Home Page
        </Link>
        <p>/</p>
        <Link
          href="/homefitnessequipment"
          className="hover:scale-105 text-gray-800 dark:text-text-gray-200 font-medium"
        >
          Home Fitness Equipment
        </Link>
      </div>
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
