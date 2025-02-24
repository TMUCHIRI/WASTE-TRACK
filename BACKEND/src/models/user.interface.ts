export interface UserDetails{
    user_id: string,
    username: string,
    email: string,
    password: string,
    profile_picture?: string
}

export interface login_details{
    email: string,
    password: string,
    isActive: boolean
}