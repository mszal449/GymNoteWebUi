import { Button } from "@mantine/core";
import { useAuth } from "../providers/AuthProvider";

function LoginButton() {
    const { login, isLoading, user } = useAuth();
  
    if (isLoading) return <div>Loading...</div>;
    if (user) return <div>Welcome, {user.username}!</div>;
  
    return <Button onClick={login}>Login with OAuth</Button>;
}

export default LoginButton;