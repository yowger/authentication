import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useRegister } from "@/api/auth/useRegister"

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

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must not be empty",
    }),
    email: z
        .string()
        .min(1, {
            message: "Email must not be empty",
        })
        .email("This is not a valid email address."),
    password: z
        .string()
        .min(5, { message: "Password must be at least 5 characters long" })
        .regex(
            /^(?=.*[A-Z])(?=.*[0-9]).+$/,
            "Password must contain at least one uppercase letter and one number"
        ),
})

type RegisterFormProps = {
    onSuccess: () => void
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const { mutate } = useRegister()

    const [errorMessage, setErrorMessage] = useState("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(
            { data: values },
            {
                onSuccess: () => {
                    onSuccess()
                    setErrorMessage("")
                },
                onError: (error) => {
                    const status = error.response?.status

                    switch (status) {
                        case 409:
                            setErrorMessage(
                                "Email address already in use. Please try a different email."
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
    }

    return (
        <>
            <h1>Register</h1>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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

                    <Link to="/login">Login instead</Link>
                    <Button type="submit">Sign up</Button>
                </form>
            </Form>
        </>
    )
}
