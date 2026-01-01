export type AuthUser = {
    name: string;
    email: string;
};

export type PageProps = {
    auth: {
        user: AuthUser | null;
    };
    flash: {
        success?: string;
        error?: string;
    };
};
