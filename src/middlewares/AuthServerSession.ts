"use server"

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AuthOptions } from 'next-auth'

export async function middlewareSession(authOptions: AuthOptions) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/auth/signin')
    if (!session.user.isAdmin) redirect('/pages/user')
    return session
}   