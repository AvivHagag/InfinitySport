"use server";
import { getServerSession } from "next-auth/next";
import { db } from "../../utils/db/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session ? session?.user.id : null;
};

export const CreateNewCatgory = async (Name: string) => {
  try {
    const NewCatgory = await db.category.create({
      data: {
        name: Name,
      },
    });
    console.log(NewCatgory);
  } catch (error) {
    console.error("Error creating a catgory - ", error);
  }
};

export const GetAllcategories = async () => {
  try {
    const categories = await db.category.findMany({});
    return categories;
  } catch (error) {
    console.error("Error fetching all categories - ", error);
  }
};

export const CreateNewProduct = async (
  Name: string,
  Manufacturer: string,
  Price: number,
  ImageUrl: string,
  Description: string,
  Color: string,
  CategoryId: number,
  Size: string,
  Quantity: number,
  OnSale: boolean,
  SalePercent: number
) => {
  try {
    const NewProduct = await db.product.create({
      data: {
        name: Name,
        manufacturer: Manufacturer,
        price: Price,
        image: ImageUrl,
        description: Description,
        color: Color,
        categoryId: CategoryId,
        size: Size,
        quantity: Quantity,
        onSale: OnSale || false,
        salePercent: SalePercent,
      },
    });
    console.log(NewProduct);
  } catch (error) {
    console.error("Error creating a product - ", error);
  }
};

export const getAllProducts = async (CategoriesID: Array<number>) => {
  try {
    const Products = await db.product.findMany({
      where: {
        categoryId: {
          in: CategoriesID,
        },
      },
    });
    return Products;
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export const addToCartNewProduct = async (
  ProductID: number,
  Quantity: number
) => {
  try {
    const user = await getSession();
    if (user) {
      const CurrentCart = await db.cart.findUnique({
        where: {
          userId: user,
        },
        include: { products: true },
      });
      if (CurrentCart && CurrentCart.id) {
        const existingProduct = CurrentCart.products.find(
          (product) => product.productId === ProductID
        );
        if (existingProduct) {
          const updatedItem = await db.cartItem.update({
            where: {
              cartId_productId: {
                cartId: CurrentCart.id,
                productId: ProductID,
              },
            },
            data: { quantity: existingProduct.quantity + Quantity },
          });
          console.log(updatedItem);
        } else {
          const NewCartItem = await db.cartItem.create({
            data: {
              cartId: CurrentCart?.id,
              productId: ProductID,
              quantity: Quantity,
            },
          });
          console.log(NewCartItem);
        }
      } else {
        const NewCart = await db.cart.create({
          data: {
            userId: user,
          },
        });
        console.log("NewCart - ", NewCart);
        const NewCartItem = await db.cartItem.create({
          data: {
            cartId: NewCart?.id,
            productId: ProductID,
            quantity: Quantity,
          },
        });
        console.log("NewCartItem - ", NewCartItem);
      }
    }
  } catch (error) {
    console.error("Error Adding New Product To Cart", error);
  }
};
