import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const hasNumber = /[0-9]/;
const hasUppercase = /[A-Z]/;
const formSchema = z.object({
  email: z.string().email().min(5).max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(hasNumber, { message: "Password must contain at least one number" }) // At least one number
    .regex(hasUppercase, {
      message: "Password must contain at least one uppercase letter",
    }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("http://localhost:5000/api/user/login", values)
      .then((response) => {
        console.log("Login successful:", response.data);
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-start w-3/4 ml-8">
        <p className="welcome-heading">Welcome</p>
        <h2 className="form-heading">Login</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="john.snow@gmail.com"
                  type="email"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  type="password"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="form-button">
          Submit
        </Button>
        <p className="text-xs font-normal text-[#A0ABC0]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-[#3361FF] text-sm underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
