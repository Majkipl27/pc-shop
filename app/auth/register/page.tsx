"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { toast } from "@components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Bg from "./9205967.jpg";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  repeatPassword: z.string(),
});

export default function RegisterPage(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    if (values.password !== values.repeatPassword) {
      toast({
        title: "Cannot register",
        description: "Passwords do not match.",
      });
    }

    const req = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    switch (req.status) {
      case 200:
        toast({
          title: "Succesfully registered!",
        });
        break;
      case 400:
        toast({
          title: "Email is already taken",
        });
        break;
      default:
        toast({
          title: "Cannot register",
          description: "An error occured.",
        });
    }
  }

  return (
    <div className="h-screen flex  py-40 px-56">
      <Image
        className="w-full h-full shadow-lg dark:brightness-75 rounded-l-lg "
        alt=""
        src={Bg}
      />
      <div className="w-2/5 h-full border shadow-lg rounded-r-lg flex flex-col gap-4 items-center justify-center">
        <h1 className="text-center font-poppins text-4xl font-semibold">
          Register
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-96 p-8 rounded-lg flex flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="E-Mail" type="email" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email is used for login and notifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="text-md">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password should be at least 8 characters long.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Repeat Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-muted-foreground text-sm flex items-center gap-1 justify-center mt-4 mb-2">
              Already have an account?
              <Link
                href="/auth/login"
                className="underline space-x-2 hover:no-underline"
              >
                Login
              </Link>
            </span>
            <Button type="submit" variant="outline">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
