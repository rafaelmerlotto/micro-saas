
export const main_url: string = import.meta.env.VITE_API_URL

export const userService = new URL(`${main_url}/api/v1/users`)
export const projectService = new URL(`${main_url}/api/v1/projects`)
export const commentService = new URL(`${main_url}/api/v1`)
// export const companyService = new URL(`${main_url}/api/companies`)