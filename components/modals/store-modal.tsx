"use client";
import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import Modal from "../ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { formSchema } from "@/schema/schemaTypes";
import axios, { AxiosError } from "axios";
import { toast } from "../ui/use-toast";

const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setisLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setisLoading(true);
      const { data } = await axios.post("/api/stores", {
        name: values?.name,
      });

      window.location.assign(`/${data?.id}`);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error?.response?.status === 401 || 402) {
          return toast({
            title: "please fill mandatory fields!",
            description: error?.message,
            variant: "destructive",
          });
        }
      }

      return toast({
        title: "server error !",
        description: "plese try after some time!",
        variant: "destructive",
      });
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Modal
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
      title="Create Store"
      description="Add a new Store to manage products and categories"
    >
      <div className="">
        <div className="space-y-4  py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-commerce"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex justify-end items-center">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={() => storeModal.onClose()}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
