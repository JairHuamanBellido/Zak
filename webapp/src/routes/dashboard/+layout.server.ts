import type {LayoutServerLoad} from './$types'
export const load:LayoutServerLoad = async ({cookies}) => {

    const jwtCookie  = cookies.get('token') ?? '';

    return {jwtCookie}

}