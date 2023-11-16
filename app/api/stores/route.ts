import { prismadb } from "@/lib/prismadb";
import { formSchema } from "@/schema/schemaTypes";
import { auth } from "@clerk/nextjs";
import { z } from "zod";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized user!", { status: 404 });
    }

    const requestbody = await req.json();
    const { name } = formSchema?.parse(requestbody);

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    if (!store) {
      return new Response("database error try after some time", {
        status: 402,
      });
    }

    return NextResponse.json(store, { status: 200 });
  } catch (error) {
    console.log("STORE POST ERROR", error);
    if (error instanceof z.ZodError) {
      console.log(error?.message);
      return new Response(error?.message, {
        status: 401,
      });
    }
  }

  return new Response("Server Error try after some time", {
    status: 500,
  });
};
