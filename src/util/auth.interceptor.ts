import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    UnauthorizedException,
  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

  @Injectable()
  export class AuthInterceptor implements NestInterceptor {
    private logger: LoggerService = new LoggerService('coc-auth-interceptor');
    constructor() {}
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const httpContext = context.switchToHttp();
      const req = httpContext.getRequest();
      this.logger.log('url---',req.url);
      this.logger.log('DEPLOY_BASE_URL', process.env.DEPLOY_BASE_URL);
      this.logger.log('query---',req.query);
      this.logger.log('body---',req.body);
  
      const correlationId = req.headers && req.headers['x-fapi-uuid'] ? req.headers['x-fapi-uuid'] : 'externalApiCall';
      this.logger.log('correlationId----',correlationId);
     
      let rawparams = (Object.keys(req.body).length > 0 || req.method === 'POST') ? req.body : req.query;
      this.logger.log('rawparams---',rawparams);
      
      if(Object.keys(req.body).length > 0 || req.method === 'POST'){
        req.body.correlationId = correlationId;
      }else if(Object.keys(req.query).length > 0){
        req.query.correlationId = correlationId;
      }

      if(req.url.indexOf('auth/getsso') >= 0         
           ) { // Exepmtion for auth validation
          return next.handle();
        }else {
            const authToken = req.headers && req.headers['authToken'] ? req.headers['authToken'] : "";
            if(this.validateAuthToken(authToken)){
                return next.handle();
            }else{
                throw new UnauthorizedException('Accesstoken invalid');
            }
            
        }
      
    
      
    //   if(req.headers.host.includes('customHostame') || req.headers.host.includes('localhost')) {
        
    //      if(req.headers.authtoken && req.headers.authtoken !='null'){ // For Dev enviroinment FE app . For DEV swagger it will work without accesstoken
    //       let decode_param:any = this.parseJwt(req.headers.authtoken);
    //       if(Object.keys(req.body).length > 0 || req.method === 'POST'){
    //         this.logger.log("decode_param", decode_param);
    //         req.body.userId = decode_param.userId;
    //         req.body.corporateId = decode_param.corporateId;
    //         req.body.dehAT = decode_param.dehAT ? decode_param.dehAT : null;
    //       }else if(Object.keys(req.query).length > 0){
    //         req.query.userId = decode_param.userId;
    //         req.query.corporateId = decode_param.corporateId;
    //       }
    //     }
        
    //     return next.handle(); // For local and DEV enviroinment
    //   }else{
        
          
    //     if (!req.headers.authtoken) { //If no AUTH BEARER token provided in request headers
    //       this.logger.log("No Accesstoken provided");
    //       throw new UnauthorizedException('No Accesstoken provided');      
    //     } else if(req.headers.authtoken) {
    //       this.logger.log('-------token available-------');
  
    //       let decode_param:any = this.parseJwt(req.headers.authtoken);
    //       // if access token is of another environment
    //       if(decode_param['host'] && decode_param['host'] !== req.headers['host']) 
    //         throw new UnauthorizedException('Accesstoken invalid - environment mismatch');
  
    //       if(Object.keys(req.body).length > 0 || req.method === 'POST'){
    //         req.body.userId = decode_param.userId;
    //         req.body.corporateId = decode_param.corporateId;
    //         req.body.dehAT = decode_param.dehAT ? decode_param.dehAT : null;
    //       }else if(Object.keys(req.query).length > 0){
    //         req.query.userId = decode_param.userId;
    //         req.query.corporateId = decode_param.corporateId;
    //       }
          
    //       // Api params value (userId, corporateId) and JWT Value comparison
    //       //Will be removed when in next patch release, Where FE stops sending those vlaues 
 
    //     } else {
    //       throw new UnauthorizedException('Accesstoken invalid');
    //     }
    //   }
    }
  
    validateAuthToken(token) {
      return false;
    }
  }
  