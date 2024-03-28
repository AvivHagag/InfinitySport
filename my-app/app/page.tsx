import AdsComponent from "./Main/IndexComponents/AdsComponent";
import Carousel from "./Main/CarouselPopular/page";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <AdsComponent />
      <Carousel />
    </main>
  );
}
