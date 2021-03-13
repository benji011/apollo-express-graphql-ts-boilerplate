import { Request } from 'express'
export interface LoginContext {
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
