import { getAllProducts } from "../../ServerAction/ServerAction";
import KettleBellComponent from "./KettleBellComponent";

export default async function Home() {
  const categoriesIDs = [9];
  const KettleBellProducts = await getAllProducts(categoriesIDs);
  return (
    <main className="flex min-h-screen flex-col py-12 px-2">
      <h1 className="text-center">Kettle Bell</h1>
      {KettleBellProducts && (
        <KettleBellComponent KettleBellProducts={KettleBellProducts} />
      )}
    </main>
  );
}
