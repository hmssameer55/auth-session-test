"use server";

import { cookies } from "next/headers";

export async function login(phone: string, password: string) {
    try {
        const response = await fetch('https://9717-49-204-64-101.ngrok-free.app/customusers/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password }),
            credentials: 'include',
        });

        if (response.ok) {
            const user = await response.json();

            const cookiesStore = await cookies();

            // Extract sessionid and csrftoken from the response headers
            const setCookieHeader = response.headers.get('set-cookie');
            const sessionMatch = setCookieHeader?.match(/sessionid=([^;]+)/);
            const csrfMatch = setCookieHeader?.match(/csrftoken=([^;]+)/);

            const sessionCookie = sessionMatch ? sessionMatch[1] : null;
            const csrfCookie = csrfMatch ? csrfMatch[1] : null;

            if (sessionCookie && csrfCookie) {
                // Save both tokens to the cookies store for future use
                cookiesStore.set('sessionid', sessionCookie, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });

                cookiesStore.set('csrftoken', csrfCookie, {
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    path: '/',
                });
            }

            return user;
        } else {
            console.error('Login failed:', await response.text());
            return null;
        }
    } catch (error) {
        console.error('Login error:', error);
        return null;
    }
}

export async function getUser() {
    try {
        const cookiesStore = await cookies();

        // Retrieve sessionid and csrftoken
        const sessionCookie = cookiesStore.get('sessionid');
        const csrfCookie = cookiesStore.get('csrftoken');

        if (!sessionCookie || !csrfCookie) {
            console.error('Session or CSRF token is missing. Aborting request.');
            return null;
        }

        // Construct the single `Cookie` header
        const cookieHeader = `csrftoken=${csrfCookie.value}; sessionid=${sessionCookie.value}`;

        const response = await fetch('https://9717-49-204-64-101.ngrok-free.app/profileactivity/get_profile/1', {
            method: 'GET',
            headers: {
                'Cookie': cookieHeader, // Send cookies in the same header
            },
            credentials: 'include',
        });

        if (response.ok) {
            return response.json();
        } else {
            console.error('Get user failed:', response.status, await response.text());
            return null;
        }
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

export async function logout() {
    try {
        const cookiesStore = await cookies();
        cookiesStore.delete('sessionid');
        cookiesStore.delete('csrftoken');
        console.log('User logged out. Session and CSRF token removed.');
    } catch (error) {
        console.error('Logout error:', error);
    }
}
