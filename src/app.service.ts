import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }

  protected users(): Promise<object> {
    return Promise.resolve({ name: 'John Doe' })
  }
}
