import axios from "axios"

import { IClient, ICreateService, IGetService } from "@/utils/types"

const apiUrl = 'http://localhost:3000/'

export const createService = async (data: IClient): Promise<ICreateService> => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${apiUrl}clients`,
            headers: { 'Content-Type': 'application/json' },
            data
        })

        if (response.status === 400) return {
            response: response.data,
            success: false
        }

        if (response.status !== 201) throw new Error()

        return response.data
    } catch (error: any) {
        return { success: false, response: {} as IClient, error: error?.response?.data?.error }
    }
}

export const getService = async (): Promise<IGetService> => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}clients`
        })

        if (response.status !== 200) throw new Error()

        return response.data
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const filterService = async (filter: string): Promise<IGetService> => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}clients/search/${filter}`
        })

        if (response.status !== 200) throw new Error()

        return response.data
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const deleteService = async (id: string): Promise<{ success: boolean }> => {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${apiUrl}clients/${id}`
        })

        if (response.status !== 200) throw new Error()

        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false }
    }
}

export const routeService = async (): Promise<{ success: boolean, response: IClient[] }> => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${apiUrl}clients/route`
        })

        if (response.status !== 200) throw new Error()

        return response.data
    } catch (error) {
        console.error(error)
        return { success: false, response: [] }
    }
} 