"use client";

import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import axios from "axios";
import { useModalsStore } from "@/providers/modals";
import { useForm } from "react-hook-form";
import { licenceSchema, LicenseType } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const UploadDocument = () => {
  const { isOpen, onClose } = useModalsStore();
  const router = useRouter();

  const form = useForm<LicenseType>({
    resolver: zodResolver(licenceSchema),
  });

  async function handleSubmit(values: LicenseType) {
    try {
      console.log(values);
      const { data } = await axios.post("/api/licence", values);

      if (data) {
        router.refresh();
      }
    } catch (error: any) {
      console.log("Nothing is coming on localhost");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a Licence</DialogTitle>
          <DialogDescription>
            Select a file from your computer to upload
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="cardId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Content title"
                      {...field}
                      disabled={isSubmitting}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Content title"
                      {...field}
                      disabled={isSubmitting}
                      className="disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDocument;
