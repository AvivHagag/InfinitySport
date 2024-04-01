"use server";
import { getServerSession } from "next-auth/next";
import { db } from "../../utils/db/prisma";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Address, CartItem } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getSession = async () => {
  const session = await getServerSession(authOptions);
  return session ? session?.user.id : null;
};
export const getSessionEmail = async () => {
  const session = await getServerSession(authOptions);
  return session ? session?.user.email : null;
};

export const getRule = async () => {
  const session = await getServerSession(authOptions);
  return session ? session.user.role : "";
};

export const getAddress = async () => {
  const session = await getServerSession(authOptions);
  try {
    const Address = await db.address.findUnique({
      where: {
        userId: session?.user.id,
      },
      select: {
        state: true,
        city: true,
        street: true,
        homeNumber: true,
        apartmentNumber: true,
      },
    });
    return Address;
  } catch (error) {
    console.error("Error Fetching the address - ", error);
  }
};

interface AddressFormValues {
  city: string;
  street: string;
  homeNumber: string;
  apartmentNumber: string;
  state: string;
}

export const setAddress = async (values: AddressFormValues) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Not authenticated");
  }
  try {
    const Address = await db.address.create({
      data: {
        city: values.city,
        street: values.street,
        homeNumber: parseInt(values.homeNumber, 10),
        apartmentNumber: parseInt(values.apartmentNumber, 10),
        state: values.state,
        userId: session.user.id,
      },
    });
    console.log(Address);
  } catch (error) {
    console.error("Error creating an Address - ", error);
  }
};

interface AddressUpdate {
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
  state: string;
}

export const UpdateAddress = async (values: AddressUpdate) => {
  const userID = await getSession();
  if (!userID) {
    throw new Error("Not authenticated");
  }
  try {
    const Address = await db.address.update({
      where: { userId: userID },
      data: {
        city: values.city,
        street: values.street,
        homeNumber: values.homeNumber,
        apartmentNumber: values.apartmentNumber,
        state: values.state,
      },
    });
    console.log("New Address - ", Address);
  } catch (error) {
    console.error("Error updating the Address - ", error);
  }
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

export const UpdateExistProduct = async (
  ProductId: number,
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
    if (ProductId) {
      const UpdatedProduct = await db.product.update({
        where: { id: ProductId },
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
      console.log("Updated Product: ", UpdatedProduct);
    }
  } catch (error) {
    console.error("Error saving a product - ", error);
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

export const UpdateQuantityItemInCart = async (
  newQuantity: number,
  productId: number,
  cartId: number
) => {
  try {
    if (newQuantity == 0) {
      const DeleteCartItem = await db.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cartId,
            productId: productId,
          },
        },
      });
      console.log(
        "DeleteCartItem CartID - ",
        DeleteCartItem.cartId,
        " ProductID - ",
        DeleteCartItem.productId
      );
    } else {
      const updatedItem = await db.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cartId,
            productId: productId,
          },
        },
        data: { quantity: newQuantity },
      });
      console.log("updatedItem ", updatedItem);
    }
  } catch (error) {
    console.error("Error Updating Products In Cart", error);
  }
};

export const getUserCart = async () => {
  try {
    const user = await getSession();
    if (user) {
      const Usercart = await db.user.findUnique({
        where: { id: user },
        include: { cart: { include: { products: true } } },
      });
      return Usercart?.cart?.products;
    }
  } catch (error) {
    console.error("Error Fetching Products From Cart", error);
  }
};

export const getProductsDetails = async (ProductIDs: Array<number>) => {
  try {
    const Products = await db.product.findMany({
      where: {
        id: {
          in: ProductIDs,
        },
      },
    });
    return Products;
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export const UpdateProductQuantity = async (
  ProductID: number,
  newQuantity: number
) => {
  try {
    const Product = await db.product.update({
      where: {
        id: ProductID,
      },
      data: {
        quantity: newQuantity,
      },
    });
    console.log(Product);
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export async function createOrderAndClearCart(
  TotalPrice: number,
  PaymentMethod: string
) {
  try {
    const result = await db.$transaction(async (db) => {
      const userID = await getSession();
      if (userID) {
        const userCart = await db.cart.findUnique({
          where: { userId: userID },
          include: { products: true },
        });
        if (!userCart) {
          throw new Error("No cart found for this user.");
        }

        const userAddress = await db.address.findUnique({
          where: { userId: userID },
        });

        if (!userAddress) {
          throw new Error("No address found for this user.");
        }
        const newOrder = await db.order.create({
          data: {
            user: {
              connect: { id: userID },
            },
            address: {
              connect: { id: userAddress.id },
            },
            totalPrice: TotalPrice,
            status: "Shipping",
            paymentMethod: PaymentMethod,
          },
        });
        for (const cartItem of userCart.products) {
          await db.cartItemOrders.create({
            data: {
              orderId: newOrder.id,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
            },
          });
          await db.product.update({
            where: { id: cartItem.productId },
            data: {
              soldCount: {
                increment: cartItem.quantity,
              },
              quantity: {
                decrement: cartItem.quantity,
              },
            },
          });

          await db.cartItem.delete({
            where: {
              cartId_productId: {
                cartId: userCart.id,
                productId: cartItem.productId,
              },
            },
          });
        }
        await db.cart.delete({
          where: { id: userCart.id },
        });

        return newOrder;
      }
    });

    return result;
  } catch (error) {
    console.error("Failed to create order and clear cart:", error);
  }
}

export const getOrders = async () => {
  try {
    const user = await getSession();
    if (user) {
      const currentDate: Date = new Date();
      let flag = false;
      let orders = await db.order.findMany({
        where: {
          userId: user,
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
          address: true,
        },
        orderBy: {
          id: "desc",
        },
      });
      for (const order of orders) {
        const createdAtDate: Date = new Date(order.createdAt);
        const differenceInDays: number = Math.floor(
          (currentDate.getTime() - createdAtDate.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        if (differenceInDays >= 4 && order.status != "Arrived") {
          try {
            const updateArrived = await db.order.update({
              where: { id: order.id },
              data: { status: "Arrived" },
            });
            console.log("Update to Arrived -", updateArrived);
            flag = true;
          } catch (updateError) {
            console.error("Error updating order:", updateError);
          }
        } else if (
          differenceInDays > 1 &&
          differenceInDays < 4 &&
          order.status != "On the way"
        ) {
          try {
            const updateOnTheWay = await db.order.update({
              where: { id: order.id },
              data: { status: "On the way" },
            });
            console.log("Update to On the way -", updateOnTheWay);
            flag = true;
          } catch (updateError) {
            console.error("Error updating order:", updateError);
          }
        }
      }
      if (flag) {
        orders = await db.order.findMany({
          where: {
            userId: user,
          },
          include: {
            products: {
              include: {
                product: true,
              },
            },
            address: true,
          },
          orderBy: {
            id: "desc",
          },
        });
      }
      return orders;
    }
  } catch (error) {
    console.error("Error Fetching orders ", error);
  }
};

export const AddCreditCard = async (
  CardNumber: string,
  Cvv: string,
  Exp: string,
  lastFourDigits: string
) => {
  const [monthStr, yearStr] = Exp.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);
  try {
    const userID = await getSession();
    if (userID) {
      const newCreditCard = await db.creditCard.create({
        data: {
          user: {
            connect: { id: userID },
          },
          cardNumber: CardNumber,
          cvv: Cvv,
          month: month,
          year: year,
          last4Digits: lastFourDigits,
        },
      });
      console.log("newCreditCard - ", newCreditCard);
    }
  } catch (error) {
    console.error("Error creating Cart in DB ", error);
  }
};

export const getExistCreditCards = async () => {
  try {
    const userID = await getSession();
    if (userID) {
      const ExistCards = await db.creditCard.findMany({
        where: { userId: userID },
        select: {
          last4Digits: true,
          year: true,
          month: true,
        },
      });
      return ExistCards;
    }
  } catch (error) {
    console.error("Error fetching Cart in DB ", error);
  }
};

type ExtendedAddress = {
  state: string;
  city: string;
  street: string;
  homeNumber: number;
  apartmentNumber: number;
};

export async function createOrderForGuest(
  TotalPrice: number,
  Address: ExtendedAddress,
  cartItems: CartItem[],
  PaymentMethod: string,
  GuestName: string
) {
  try {
    const result = await db.$transaction(async (db) => {
      const userAddress = await db.address.create({
        data: {
          state: Address.state,
          city: Address.city,
          street: Address.street,
          homeNumber: Address.homeNumber,
          apartmentNumber: Address.apartmentNumber,
        },
      });

      if (!userAddress) {
        throw new Error("No address found for this user.");
      }

      const newOrder = await db.order.create({
        data: {
          address: {
            connect: { id: userAddress.id },
          },
          totalPrice: TotalPrice,
          status: "Shipping",
          paymentMethod: PaymentMethod,
          guestName: GuestName ? GuestName + "_Guest" : null,
        },
      });

      for (const cartItem of cartItems) {
        await db.cartItemOrders.create({
          data: {
            orderId: newOrder.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          },
        });

        await db.product.update({
          where: { id: cartItem.productId },
          data: {
            soldCount: {
              increment: cartItem.quantity,
            },
            quantity: {
              decrement: cartItem.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    return result;
  } catch (error) {
    console.error("Failed to create order and clear cart:", error);
  }
}

export const getBestProducts = async () => {
  try {
    const BestProducts = await db.product.findMany({
      orderBy: {
        soldCount: "desc",
      },
      take: 5,
    });
    return BestProducts;
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export const getAllTheProducts = async () => {
  try {
    const BestProducts = await db.product.findMany({});
    return BestProducts;
  } catch (error) {
    console.error("Error fetching Products", error);
  }
};

export const UpdateUserDetails = async (
  NewName: string | null,
  NewImage: string | null
) => {
  try {
    const userID = await getSession();
    if (userID) {
      if (NewName && !NewImage) {
        const Update = await db.user.update({
          where: { id: userID },
          data: {
            name: NewName,
          },
        });
        console.log("Update Name - ", Update.name);
        revalidatePath("/");
      } else if (NewImage && !NewName) {
        const Update = await db.user.update({
          where: { id: userID },
          data: {
            image: NewImage,
          },
        });
        console.log("Update Image - ", Update.image);
        revalidatePath("/");
      } else {
        const Update = await db.user.update({
          where: { id: userID },
          data: {
            name: NewName,
            image: NewImage,
          },
        });
        console.log("Update Name - ", Update.name);
        console.log("Update Image - ", Update.image);
        revalidatePath("/");
      }
    }
  } catch (error) {
    console.error("Error Changing User Name in DB ", error);
  }
};

type CreditCardInfo = {
  last4Digits: string;
  year: number;
  month: number;
};

export const DeleteExistCreditCard = async (Card: CreditCardInfo) => {
  try {
    const userID = await getSession();
    if (userID) {
      const CuurentCard = await db.creditCard.findFirst({
        where: {
          userId: userID,
          last4Digits: Card.last4Digits,
          month: Card.month,
          year: Card.year,
        },
      });
      if (CuurentCard) {
        const Deleted = await db.creditCard.delete({
          where: {
            id: CuurentCard.id,
          },
        });
        console.log("Deleted Credit card - ", Deleted);
      } else {
        console.log("No matching credit card found.");
      }
    }
  } catch (error) {
    console.error("Error Deleting Credit Card ", error);
  }
};
