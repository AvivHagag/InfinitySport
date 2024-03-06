import SubCategoryComponent from "@/app/SubCategoryComponent/SubCategoryComponent";
import { getAllProducts } from "../../ServerAction/ServerAction";

export default async function Home() {
  const categoriesIDs = [4];
  const MultitrainerProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center"> Multi Trainer</h1>
      {MultitrainerProducts && (
        <SubCategoryComponent
          Products={MultitrainerProducts}
          PageName={"Multi Trainer"}
          MainPageName={"Home Fitness Equipment"}
          PageUrl="/homefitnessequipment/multitrainer"
          MainPageUrl="/homefitnessequipment"
        />
      )}
    </main>
  );
}
