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
    <div className="h-screen flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-96 p-8 rounded-lg shadow-lg flex flex-col border"
        >
          <h1 className="text-center">Register</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
              <FormItem>
                <FormLabel>Password</FormLabel>
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
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="ghost">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
