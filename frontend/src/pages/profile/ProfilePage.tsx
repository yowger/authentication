import { useGetProfile } from "@/api/user/useGetProfile"

export default function ProfilePage() {
    const profileQuery = useGetProfile()

    if (profileQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (profileQuery.isError) {
        return <div>Error: {profileQuery.error.message}</div>
    }

    return (
        <div>
            <h1>Profile Page</h1>
            <p>Name: {profileQuery.data?.name}</p>
            <p>Email: {profileQuery.data?.email}</p>
            <p>Verified: {profileQuery.data?.verified}</p>
        </div>
    )
}
