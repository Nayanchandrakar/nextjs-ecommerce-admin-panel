import { prismadb } from "@/lib/prismadb";
import { FC } from "react";
import { BillboardForm } from "./components/billboard-form";

interface pageProps {
  params: { billboardId: string };
}

const page: FC<pageProps> = async ({ params }) => {
  console.log(params);
  const billboard = await prismadb?.billboard?.findUnique({
    where: {
      id:
        params?.billboardId === "new"
          ? "653b863376781ec62d565f40"
          : params?.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default page;
