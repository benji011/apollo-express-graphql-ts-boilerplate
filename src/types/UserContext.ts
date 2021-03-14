import { Request } from 'express'

export interface UserContext {
  req: Request & {
    session: {
      userId: number
    }
  }
  res: Response & {
    session: {
      userId: number
    }
  }
}
