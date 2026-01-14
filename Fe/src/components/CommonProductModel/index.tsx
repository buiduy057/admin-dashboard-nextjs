"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Props } from "./model.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser, addUser } from "@/services/user.service";
import { toast } from "sonner";

export const formSchema = z.object({
  name: z.string().min(3, "Name ít nhất 3 ký tự"),
  price: z.number(),
  category: z.string(),
});
const CommonProductModel = ({ isOpen, setOpen, data, categories }: Props) => {
  console.log("aa", categories);
  // console.log("data", data, "categories", categories);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      category: "",
    },
  });
  const values = form.getValues();

  console.log(values);
  const queryClient = useQueryClient();
  const { mutate: mutateEdit } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      setOpen(false);
      toast.success("Update user successfully");
    },
  });
  const { mutate: mutateAdd } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      setOpen(false);
      toast.success("Add user successfully");
    },
  });
  useEffect(() => {
    // if (Object.keys(data).length) {
    //   form.reset({
    //     name: data.name,
    //     category: data.category.id,
    //   });
    // } else {
    if (categories.length > 0) {
      console.log("categories", categories);
      form.reset({
        name: "",
        category: categories.length ? categories[0].id.toString() : "",
      });
    }
    // }
  }, [categories]);
  const onSubmit = (values: any) => {
    if (Object.keys(data).length) {
      values["id"] = data.id;
      mutateEdit(values);
    } else {
      mutateAdd(values);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-white border-none">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {Object.keys(data).length ? "Edit profile" : "Add profile"}{" "}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      className="focus-visible:[--tw-ring-shadow:none] focus-visible:outline-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="number"
                      className="focus-visible:[--tw-ring-shadow:none] focus-visible:outline-none"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-25">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white">
                        {categories.map((c: any) => (
                          <SelectItem key={c.id} value={`${c.id}`}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-400 w-25 border-grebg-green-400 cursor-pointer text-amber-50"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CommonProductModel;
