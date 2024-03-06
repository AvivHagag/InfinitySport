"use server";
import { getServerSession } from "next-auth/next";
import { db } from "../../utils/db/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.id;
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
