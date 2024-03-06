import { getAllProducts } from "../ServerAction/ServerAction";
import StandAndFacilitiesComponent from "./StandAndFacilitiesComponent";

export default async function Home() {
  const categoriesIDs = [11, 12, 13];
  const StandAndFacilitiesProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Stand & Facilities</h1>
      {StandAndFacilitiesProducts && (
        <StandAndFacilitiesComponent
          StandAndFacilitiesProducts={StandAndFacilitiesProducts}
        />
      )}
    </main>
  );
}
