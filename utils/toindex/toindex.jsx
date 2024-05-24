import Router from 'next/router'

export function toIndex(user) {
    if (!user) {
        Router.push("/");
    }
}