import { prismadb } from "@/lib/prismadb";
import { FC } from "react";
import { CategoryForm } from "./components/category-form";

interface pageProps {
  params: { categoryId: string; storeId: string };
}

const page: FC<pageProps> = async ({ params }) => {
  const category = await prismadb?.category?.findUnique({
    where: {
      id:
        params?.categoryId === "new"
          ? "653b863376781ec62d565f40"
          : params?.categoryId,
    },
  });

  const billboard = await prismadb?.billboard?.findMany({
    where: {
      storeId:
        params?.storeId === "new"
          ? "653b863376781ec62d565f40"
          : params?.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboard} />
      </div>
    </div>
  );
};

export default page;
