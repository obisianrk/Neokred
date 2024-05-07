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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const hasNumber = /[0-9]/;
const hasUppercase = /[A-Z]/;
const isAlphabetic = /^[A-Za-z]+$/;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const numericRegex = /^\d+$/;

const formSchema = z
  .object({
    name: z.string().max(50).regex(isAlphabetic, {
      message: "The value must contain only alphabets",
    }),
    email: z.string().email().min(5).max(50),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(hasNumber, {
        message: "Password must contain at least one number",
      })
      .regex(hasUppercase, {
        message: "Password must contain at least one uppercase letter",
      }),
    dateOfBirth: z
      .string()
      .regex(dateRegex, { message: "Date must be in DD/MM/YYYY format" }),
    phoneNo: z
      .string()
      .max(10, { message: "Phone Number must be at least 10 characters" })
      .regex(numericRegex, { message: "The field must contain only numbers" }),
    conformPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(hasNumber, {
        message: "Password must contain at least one number",
      })
      .regex(hasUppercase, {
        message: "Password must contain at least one uppercase letter",
      }),
    question: z.string().max(100, { message: "Maximum 100 characters" }),
    address: z.string().max(100, { message: "Maximum 100 characters" }),
    city: z
      .string()
      .max(50, { message: "Maximum 50 characters" })
      .regex(isAlphabetic, {
        message: "The value must contain only alphabets",
      }),
    state: z.string(),
    zipCode: z
      .string()
      .min(6, { message: "Minimum 6 characters" })
      .regex(numericRegex, { message: "The field must contain only numbers" }),
    country: z.string(),
  })
  .refine((data) => data.password === data.conformPassword, {
    message: "Confirm password must match the original password",
    path: ["conformPassword"],
  });

const RegistrationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      phoneNo: "",
      conformPassword: "",
      question: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const navigate = useNavigate();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { conformPassword, ...rest } = values;

    console.log("Modified values:", rest);

    axios
      .post("http://localhost:5000/api/user/register", rest)
      .then((response) => {
        console.log("Registration successful:", response.data);
        const token = response.data.token;
        Cookies.set("token", token, { expires: 1 });
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  }

  return (
    <Form {...form}>
      <div className="flex flex-col justify-start w-[95%]">
        <p className="welcome-heading">Welcome</p>
        <h2 className="form-heading">Sign-Up</h2>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-2">
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="form-input2"
                    placeholder="John Doe"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Email</FormLabel>
                <FormControl>
                  <Input
                    className="form-input2"
                    placeholder="john.snow@gmail.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Date Of Birth</FormLabel>
                <FormControl>
                  <Input
                    className="form-input2"
                    placeholder="12/12/12"
                    type="text"
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
                    className="form-input2"
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Phone Number</FormLabel>
                <FormControl>
                  <Input
                    className="form-input2"
                    placeholder="8925172395"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="conformPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Conform Password</FormLabel>
                <FormControl>
                  <Input
                    className="form-input2"
                    placeholder="********"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Security Question</FormLabel>
              <FormDescription className="form-label">
                What is your school name.
              </FormDescription>
              <FormControl>
                <Input className="form-input" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Address</FormLabel>
              <FormControl>
                <Input
                  className="form-input4"
                  placeholder="********"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">City</FormLabel>
                <FormControl>
                  <Input
                    className="form-input3"
                    placeholder="********"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">State</FormLabel>
                <FormControl>
                  <Input
                    className="form-input3"
                    placeholder="********"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">ZIP Code</FormLabel>
                <FormControl>
                  <Input
                    className="form-input3"
                    placeholder="********"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Country</FormLabel>
                <FormControl>
                  <Input
                    className="form-input3"
                    placeholder="********"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="form-button">
          Submit
        </Button>
        <p className="text-xs font-normal text-[#A0ABC0]">
          Already have an account?{" "}
          <Link className="text-[#3361FF] text-sm underline ml-1" to="/login">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegistrationForm;
