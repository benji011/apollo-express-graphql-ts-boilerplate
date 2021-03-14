import { Request } from 'express'
export interface UserContext {
  req: Request & {
    session: {
      userId?: any
    }
  }
  res: Response & {
    session: {
      userId?: any
    }
  }
}
