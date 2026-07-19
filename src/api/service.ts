
export const main_url: string = import.meta.env.VITE_API_URL

export const userService: URL = new URL(`${main_url}/api/v1/users`)
export const projectService: URL = new URL(`${main_url}/api/v1/projects`)
export const commentService: URL = new URL(`${main_url}/api/v1`)
export const collaborationRequestService: URL = new URL(`${main_url}/api/v1`)
