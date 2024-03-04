"use client";
import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
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
import Bg from "./9205971.jpg";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function LoginPage(): JSX.Element {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    const req = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });

    switch (req.status) {
      case 200:
        toast({
          title: "Succesfully logged in!",
        });
        break;
      case 401:
        toast({
          title: "Cannot login",
          description: "Wrong email or password.",
        });
        break;
      case 400:
        toast({
          title: "Cannot login",
          description: "Email and password are required.",
        });
        break;
      default:
        toast({
          title: "Cannot login",
          description: "An error occured.",
        });
    }
  }

  return (
    <div className="flex h-screen w-screen py-40 px-56">
      <div className="w-2/5 h-full border rounded-l-lg flex flex-col gap-4 items-center justify-center shadow-lg">
        <h1 className="text-center font-poppins text-4xl font-semibold">
          Login
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-96 p-8 flex flex-col"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="text-muted-foreground text-sm mb-2 flex items-center gap-1 justify-center">
              No account?
              <Link
                href="/auth/register"
                className="underline space-x-2 hover:no-underline"
              >
                Register
              </Link>
            </span>
            <Button type="submit" variant="outline">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <Image
        className="w-full h-full shadow-lg rounded-r-lg dark:brightness-75"
        alt=""
        src={Bg}
      />
    </div>
  );
}
