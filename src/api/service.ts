
export const main_url: string = "http://localhost:3000"

export const userService = new URL(`${main_url}/api/v1/users`)
export const projectService = new URL(`${main_url}/api/v1/projects`)
export const commentService = new URL(`${main_url}/api/v1`)
// export const companyService = new URL(`${main_url}/api/companies`)