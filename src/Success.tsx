import React from 'react'
import { useAuth } from './providers/AuthProvider'

const Success = () => {
    const { user, isLoading, error } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    if (!user) {
        return <div>Not authenticated</div>
    }

    return (
        <div>
            <h1>Success!</h1>
            <pre>
                {JSON.stringify(user, null, 2)}
            </pre>
            <p>Hello, {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default Success