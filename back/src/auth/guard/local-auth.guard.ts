import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export default class LocalStrategy extends AuthGuard("local") {
    
}