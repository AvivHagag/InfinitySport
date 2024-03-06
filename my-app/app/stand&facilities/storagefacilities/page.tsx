import { getAllProducts } from "../../ServerAction/ServerAction";
import StorageFacilitiesComponent from "./StorageFacilitiesComponent";

export default async function Home() {
  const categoriesIDs = [12];
  const StorageFacilitiesProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Storage Facilities</h1>
      {StorageFacilitiesProducts && (
        <StorageFacilitiesComponent
          StorageFacilitiesProducts={StorageFacilitiesProducts}
        />
      )}
    </main>
  );
}
