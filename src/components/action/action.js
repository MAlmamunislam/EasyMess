import { authClient } from "@/lib/auth-client"

export const GetUser = () => {
    const user = authClient.useSession();
    const { data: session, isPending } = user;
    return session;
}