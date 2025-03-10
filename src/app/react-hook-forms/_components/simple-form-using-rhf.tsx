'use client'

import { useForm, type FieldValues } from "react-hook-form";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SimpleFormUsingRFH() {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    reset,
    getValues
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-80 flex flex-col gap-y-3">
      <h1 className="text-sm text-center pb-6"> SIMPLE FORM USING RHF </h1>    
      <Input 
        type="email" 
        placeholder="Email"
        {...register("email", {
          required: "Email is required"
        })}
      />
      {errors.email && (
        <p className="text-sm text-red-500 px-1">{`${errors.email.message}`}</p>
      )}
      <Input 
        type="password" 
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        })} 
      />
      {errors.password && (
        <p className="text-sm text-red-500 px-1">{`${errors.password.message}`}</p>
      )}
      <Input 
        type="password" 
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          required: "Confirm Password is required",
          validate: ( value:string ) => 
            value === getValues("password") || "Passwords must match"
        })}
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500 px-1">{`${errors.confirmPassword.message}`}</p>
      )}
      <div className="flex justify-end">
        <Button 
          type="submit"
          disabled={isSubmitting} 
          className="w-1/2"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}