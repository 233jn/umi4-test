import { request } from '@umijs/max';

export function queryUserList({ current = 1, pageSize = 5 }) {
    return request(`/api/users?current=${current}&pageSize=${pageSize}`)
}

export function queryUserById(id: number) {
    return request(`/api/users/${id}`);
}

export function deleteUserById(id: number, { current = 1, pageSize = 5 }) {
    // return request(`/api/users/delete/${id}?current=${current}&pageSize=${pageSize}`);
    return request(`/api/users/delete/${id}`, {
        params: { current: current, pageSize: pageSize },
    })
}

export function createUser(user: any) {
    return request(`/api/users/create`, {
        method: "POST",
        data: user,
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
}