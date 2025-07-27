import { authClient } from '@/lib/auth';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';


interface AuthContextType {
    session: { user: User; session: Session } | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<{ user: User; session: Session } | null>(null);
    const [loading, setLoading] = useState(true);

    const { data } = authClient.useSession();

    useEffect(() => {
        if (data && data.user && data.session) {
            setSession({ user: data.user, session: data.session });
        } else {
            setSession(null);
        }
        setLoading(false);
    }, [data]);

    const signOut = async () => {
        try {
            await authClient.signOut();
            setSession(null);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { session, loading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (loading || !mounted) {
        return null; // Or a loading spinner
    }

    if (!session) {
        // Redirect to sign-in page only after component is mounted

        setTimeout(() => {
            router.replace('/sign-in');
        }, 0);
        return null;
    }

    return <>{children}</>;
}
