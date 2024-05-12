import { useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLogin } from "@/api/auth/useLogin"

const formSchema = z.object({
    email: z
        .string()
        .min(1, {
            message: "Email must not be empty",
        })
        .email("This is not a valid email address."),
    password: z.string().min(1, { message: "Password cannot be empty" }),
})

type LoginFormProps = {
    onSuccess: () => void
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const loginMutation = useLogin()
    
    const [errorMessage, setErrorMessage] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        loginMutation.mutate(
            { data: values },
            {
                onSuccess: () => {
                    onSuccess()
                    setErrorMessage("")
                },
                onError: (error) => {
                    const status = error.response?.status

                    switch (status) {
                        case 401:
                            setErrorMessage(
                                "Login credentials are incorrect. Please try again."
                            )
                            break
                        case 403:
                            setErrorMessage(
                                "Email verification required. Please check your inbox for the verification link."
                            )
                            break
                        case 404:
                            setErrorMessage(
                                "The email address you entered was not found."
                            )
                            break
                        default:
                            setErrorMessage(
                                "An unexpected error occurred. Please try again later."
                            )
                    }
                },
            }
        )
        onSuccess()
    }

    return (
        <>
            <h1>Login</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {errorMessage && <FormMessage>{errorMessage}</FormMessage>}

                    <Link to="/register">Register instead</Link>
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </>
    )
}
