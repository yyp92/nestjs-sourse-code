import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import {TestException} from './TestException'
import { Response } from 'express';

@Catch(TestException)
export class TestFilterFilter<T> implements ExceptionFilter {
  catch(exception: TestException, host: ArgumentsHost) {
    // console.log('TestFilterFilter', exception, host)

    if(host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response
        .status(500)
        .json({
          aaa: exception.aaa,
          bbb: exception.bbb
        });
    } else if(host.getType() === 'ws') {

    } else if(host.getType() === 'rpc') {

    }
  }
}
