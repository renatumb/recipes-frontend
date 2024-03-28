export enum STATUS {
    SUCCESS = 'success',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info'
}

export const GENERIC_ERROR = {
    message: 'Generic Error',
    status: ''
}

export type User = {
    id: number,
    firstName: string
    lastName: string,
    email: string,
    password: string
}

export type Recipe = {
    id: number,
    title: string,
    image: string,
    description: string,
    vegetarian: boolean
    createdAt: Date,
    user: User
    likes: number []
}

export const BASE_URL = "https://recipe.renatobonfim.com/api"
